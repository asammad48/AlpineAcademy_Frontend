const fs = require('fs');
const path = require('path');

// Statistics
const stats = {
  totalFiles: 0,
  brokenLinks: [],
  missingImages: [],
  brokenLanguageSwitchers: []
};

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && !file.startsWith('.') && !file.startsWith('_') && file !== 'node_modules' && file !== 'attached_assets') {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html') && !file.includes('deepseek') && !file.includes('~') && !file.includes('404')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

function extractLinks(content) {
  const linkRegex = /href=["']([^"']+)["']/g;
  const links = [];
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    links.push(match[1]);
  }
  return links;
}

function extractImages(content) {
  const images = [];
  
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    images.push(match[1]);
  }
  
  const srcsetRegex = /srcset=["']([^"']+)["']/gi;
  while ((match = srcsetRegex.exec(content)) !== null) {
    const srcsetUrls = match[1].split(',').map(s => s.trim().split(' ')[0]);
    images.push(...srcsetUrls);
  }
  
  return images;
}

function isInternalLink(link) {
  return !link.startsWith('http') && 
         !link.startsWith('//') && 
         !link.startsWith('mailto:') && 
         !link.startsWith('tel:') && 
         !link.startsWith('#') &&
         !link.includes('wa.me');
}

function checkFileExists(linkPath) {
  const cleanPath = linkPath.startsWith('/') ? linkPath.substring(1) : linkPath;
  const pathWithoutParams = cleanPath.split('?')[0].split('#')[0];
  
  if (fs.existsSync(pathWithoutParams)) return true;
  if (fs.existsSync(pathWithoutParams + '.html')) return true;
  if (fs.existsSync(path.join(pathWithoutParams, 'index.html'))) return true;
  
  return false;
}

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║        INTERNAL RESOURCES AUDIT (Excluding CDNs)          ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

const allFiles = getAllHtmlFiles('.');
stats.totalFiles = allFiles.length;

console.log(`📁 Auditing ${allFiles.length} HTML files...\n`);

allFiles.forEach((file, index) => {
  const relPath = file.startsWith('./') ? file.substring(2) : file;
  const content = fs.readFileSync(file, 'utf8');
  
  if ((index + 1) % 50 === 0) {
    console.log(`⏳ Processing... ${index + 1}/${allFiles.length} files`);
  }
  
  // Check internal HTML links only
  const links = extractLinks(content);
  const internalLinks = links.filter(link => {
    return isInternalLink(link) && 
           !link.match(/\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|pdf|mp4)$/i);
  });
  
  internalLinks.forEach(link => {
    if (!checkFileExists(link)) {
      stats.brokenLinks.push({
        file: relPath,
        link: link
      });
    }
  });
  
  // Check internal images only (exclude CDN and data URIs)
  const images = extractImages(content);
  images.forEach(img => {
    if (!img.startsWith('http') && !img.startsWith('//') && !img.startsWith('data:')) {
      if (!checkFileExists(img)) {
        stats.missingImages.push({
          file: relPath,
          image: img
        });
      }
    }
  });
});

console.log('\n✅ Audit complete!\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('📊 RESULTS (Internal Resources Only)\n');
console.log(`Total HTML files: ${stats.totalFiles}`);
console.log(`Broken internal links: ${stats.brokenLinks.length}`);
console.log(`Missing internal images: ${stats.missingImages.length}`);
console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

if (stats.brokenLinks.length > 0) {
  console.log('❌ BROKEN INTERNAL LINKS:\n');
  const linksByFile = {};
  stats.brokenLinks.forEach(item => {
    if (!linksByFile[item.file]) linksByFile[item.file] = [];
    linksByFile[item.file].push(item.link);
  });
  
  // Show first 30 files
  const files = Object.keys(linksByFile).sort().slice(0, 30);
  files.forEach(file => {
    console.log(`\n  ${file}:`);
    linksByFile[file].forEach(link => console.log(`    → ${link}`));
  });
  
  if (Object.keys(linksByFile).length > 30) {
    console.log(`\n  ... and ${Object.keys(linksByFile).length - 30} more files`);
  }
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

if (stats.missingImages.length > 0) {
  console.log('🖼️  MISSING INTERNAL IMAGES:\n');
  const imagesByFile = {};
  stats.missingImages.forEach(item => {
    if (!imagesByFile[item.file]) imagesByFile[item.file] = [];
    imagesByFile[item.file].push(item.image);
  });
  
  // Show first 20 files
  const files = Object.keys(imagesByFile).sort().slice(0, 20);
  files.forEach(file => {
    console.log(`\n  ${file}:`);
    imagesByFile[file].forEach(img => console.log(`    → ${img}`));
  });
  
  if (Object.keys(imagesByFile).length > 20) {
    console.log(`\n  ... and ${Object.keys(imagesByFile).length - 20} more files`);
  }
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

const totalIssues = stats.brokenLinks.length + stats.missingImages.length;

if (totalIssues === 0) {
  console.log('✅ SUCCESS! No internal issues found!\n');
} else {
  console.log(`⚠️  TOTAL INTERNAL ISSUES: ${totalIssues}\n`);
}

// Save report
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    totalFiles: stats.totalFiles,
    totalIssues: totalIssues,
    brokenLinks: stats.brokenLinks.length,
    missingImages: stats.missingImages.length
  },
  details: {
    brokenLinks: stats.brokenLinks,
    missingImages: stats.missingImages
  }
};

fs.writeFileSync('internal-audit-report.json', JSON.stringify(report, null, 2));
console.log('📋 Report saved to: internal-audit-report.json\n');
