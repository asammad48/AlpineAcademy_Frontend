const fs = require('fs');
const path = require('path');

const stats = {
  totalFiles: 0,
  brokenLinks: [],
  missingImages: []
};

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && !file.startsWith('.') && !file.startsWith('_') && 
        file !== 'node_modules' && file !== 'attached_assets') {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html') && !file.includes('deepseek') && 
               !file.includes('~') && !file.includes('404')) {
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
  return images;
}

function checkFileExists(linkPath, sourceFile) {
  // Skip external resources
  if (linkPath.startsWith('http') || linkPath.startsWith('//') || 
      linkPath.startsWith('mailto:') || linkPath.startsWith('tel:') || 
      linkPath.startsWith('#') || linkPath.includes('wa.me') ||
      linkPath.startsWith('data:')) {
    return true; // External resources are OK
  }
  
  // Resolve relative paths against source file's directory
  let resolvedPath;
  if (linkPath.startsWith('/')) {
    // Absolute path from root
    resolvedPath = linkPath.substring(1);
  } else {
    // Relative path - resolve against source file
    const sourceDir = path.dirname(sourceFile);
    resolvedPath = path.join(sourceDir, linkPath);
    // Normalize to remove .. and .
    resolvedPath = path.normalize(resolvedPath);
    // Remove leading ./ if present
    if (resolvedPath.startsWith('./')) {
      resolvedPath = resolvedPath.substring(2);
    }
  }
  
  // Remove query strings and anchors
  resolvedPath = resolvedPath.split('?')[0].split('#')[0];
  
  // Check if file exists
  if (fs.existsSync(resolvedPath)) return true;
  if (fs.existsSync(resolvedPath + '.html')) return true;
  if (fs.existsSync(path.join(resolvedPath, 'index.html'))) return true;
  
  return false;
}

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║     ACCURATE AUDIT (With Proper Path Resolution)          ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

const allFiles = getAllHtmlFiles('.');
stats.totalFiles = allFiles.length;

console.log(`📁 Auditing ${allFiles.length} HTML files with correct path resolution...\n`);

allFiles.forEach((file, index) => {
  const content = fs.readFileSync(file, 'utf8');
  
  if ((index + 1) % 50 === 0) {
    console.log(`⏳ Processing... ${index + 1}/${allFiles.length} files`);
  }
  
  // Check HTML links (exclude CSS, JS, images)
  const links = extractLinks(content);
  const htmlLinks = links.filter(link => 
    !link.match(/\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|pdf|mp4)$/i)
  );
  
  htmlLinks.forEach(link => {
    if (!checkFileExists(link, file)) {
      stats.brokenLinks.push({
        file: file,
        link: link
      });
    }
  });
  
  // Check images
  const images = extractImages(content);
  images.forEach(img => {
    if (!checkFileExists(img, file)) {
      stats.missingImages.push({
        file: file,
        image: img
      });
    }
  });
});

console.log('\n✅ Audit complete!\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('📊 ACCURATE RESULTS\n');
console.log(`Total HTML files: ${stats.totalFiles}`);
console.log(`Broken links: ${stats.brokenLinks.length}`);
console.log(`Missing images: ${stats.missingImages.length}`);
console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

if (stats.brokenLinks.length > 0) {
  console.log('❌ BROKEN LINKS (first 50):\n');
  const linksByFile = {};
  stats.brokenLinks.forEach(item => {
    if (!linksByFile[item.file]) linksByFile[item.file] = [];
    linksByFile[item.file].push(item.link);
  });
  
  const files = Object.keys(linksByFile).sort().slice(0, 50);
  files.forEach(file => {
    console.log(`\n  ${file}:`);
    linksByFile[file].slice(0, 5).forEach(link => console.log(`    → ${link}`));
    if (linksByFile[file].length > 5) {
      console.log(`    ... and ${linksByFile[file].length - 5} more`);
    }
  });
  
  if (Object.keys(linksByFile).length > 50) {
    console.log(`\n  ... ${Object.keys(linksByFile).length - 50} more files`);
  }
}

if (stats.missingImages.length > 0) {
  console.log('\n\n🖼️  MISSING IMAGES (first 30):\n');
  const imagesByFile = {};
  stats.missingImages.forEach(item => {
    if (!imagesByFile[item.file]) imagesByFile[item.file] = [];
    imagesByFile[item.file].push(item.image);
  });
  
  const files = Object.keys(imagesByFile).sort().slice(0, 30);
  files.forEach(file => {
    console.log(`\n  ${file}:`);
    imagesByFile[file].slice(0, 3).forEach(img => console.log(`    → ${img}`));
    if (imagesByFile[file].length > 3) {
      console.log(`    ... and ${imagesByFile[file].length - 3} more`);
    }
  });
}

const totalIssues = stats.brokenLinks.length + stats.missingImages.length;

console.log('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
if (totalIssues === 0) {
  console.log('\n✅ SUCCESS! No issues found!\n');
} else {
  console.log(`\n⚠️  TOTAL REAL ISSUES: ${totalIssues}\n`);
  console.log(`Broken links: ${stats.brokenLinks.length}`);
  console.log(`Missing images: ${stats.missingImages.length}\n`);
}

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

fs.writeFileSync('accurate-audit-report.json', JSON.stringify(report, null, 2));
console.log('📋 Detailed report saved to: accurate-audit-report.json\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
