const fs = require('fs');
const path = require('path');

// Language directories
const languages = ['', 'en', 'fr', 'ca', 'pt']; // empty string for Spanish root

// Statistics
const stats = {
  totalFiles: 0,
  brokenLinks: [],
  missingImages: [],
  brokenLanguageSwitchers: [],
  staticFileIssues: []
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
  
  // Extract from img src
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    images.push(match[1]);
  }
  
  // Extract from srcset
  const srcsetRegex = /srcset=["']([^"']+)["']/gi;
  while ((match = srcsetRegex.exec(content)) !== null) {
    const srcsetUrls = match[1].split(',').map(s => s.trim().split(' ')[0]);
    images.push(...srcsetUrls);
  }
  
  // Extract from CSS background-image
  const bgRegex = /background-image:\s*url\(['"]?([^'")\s]+)['"]?\)/gi;
  while ((match = bgRegex.exec(content)) !== null) {
    images.push(match[1]);
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

function isImageLink(link) {
  return link.match(/\.(png|jpg|jpeg|gif|webp|svg|ico)$/i);
}

function isCssJsLink(link) {
  return link.match(/\.(css|js)$/i);
}

function checkFileExists(linkPath) {
  // Remove leading slash
  const cleanPath = linkPath.startsWith('/') ? linkPath.substring(1) : linkPath;
  
  // Remove query strings and anchors
  const pathWithoutParams = cleanPath.split('?')[0].split('#')[0];
  
  // Check direct file existence
  if (fs.existsSync(pathWithoutParams)) {
    return true;
  }
  
  // Check with .html extension added
  if (fs.existsSync(pathWithoutParams + '.html')) {
    return true;
  }
  
  // Check as directory with index.html
  if (fs.existsSync(path.join(pathWithoutParams, 'index.html'))) {
    return true;
  }
  
  return false;
}

function extractLanguageSwitchers(content) {
  const switchers = [];
  
  // Match language switcher links - looking for data-lang or common patterns
  const langLinkRegex = /<a[^>]*(?:data-lang=["']([^"']+)["']|class=["'][^"']*lang-[^"']*["'])[^>]*href=["']([^"']+)["']/gi;
  let match;
  while ((match = langLinkRegex.exec(content)) !== null) {
    switchers.push({
      lang: match[1] || 'unknown',
      href: match[2]
    });
  }
  
  // Also check for links in language selector dropdown/menu
  const dropdownRegex = /<div[^>]*(?:class|id)=["'][^"']*(?:lang|language)[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi;
  while ((match = dropdownRegex.exec(content)) !== null) {
    const dropdownContent = match[1];
    const hrefRegex = /href=["']([^"']+)["']/g;
    let hrefMatch;
    while ((hrefMatch = hrefRegex.exec(dropdownContent)) !== null) {
      const href = hrefMatch[1];
      if (isInternalLink(href) && !href.startsWith('#')) {
        switchers.push({
          lang: 'dropdown',
          href: href
        });
      }
    }
  }
  
  return switchers;
}

function getRelativePath(filePath) {
  return filePath.startsWith('./') ? filePath.substring(2) : filePath;
}

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║     COMPREHENSIVE WEBSITE AUDIT - Alpine Ski Academy      ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Get all HTML files
const allFiles = getAllHtmlFiles('.');
stats.totalFiles = allFiles.length;

console.log(`📁 Found ${allFiles.length} HTML files to audit\n`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Process each file
allFiles.forEach((file, index) => {
  const relPath = getRelativePath(file);
  const content = fs.readFileSync(file, 'utf8');
  const fileDir = path.dirname(file);
  
  // Progress indicator
  if ((index + 1) % 20 === 0) {
    console.log(`⏳ Processing... ${index + 1}/${allFiles.length} files`);
  }
  
  // 1. Check all internal links (HTML pages)
  const links = extractLinks(content);
  const internalLinks = links.filter(link => isInternalLink(link) && !isImageLink(link) && !isCssJsLink(link));
  
  internalLinks.forEach(link => {
    if (!checkFileExists(link)) {
      stats.brokenLinks.push({
        file: relPath,
        link: link,
        type: 'html-link'
      });
    }
  });
  
  // 2. Check all images
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
  
  // 3. Check static files (CSS, JS)
  const staticLinks = links.filter(link => isCssJsLink(link));
  staticLinks.forEach(link => {
    if (!checkFileExists(link)) {
      stats.staticFileIssues.push({
        file: relPath,
        resource: link
      });
    }
  });
  
  // 4. Check language switchers
  const langSwitchers = extractLanguageSwitchers(content);
  langSwitchers.forEach(switcher => {
    if (!checkFileExists(switcher.href)) {
      stats.brokenLanguageSwitchers.push({
        file: relPath,
        lang: switcher.lang,
        href: switcher.href
      });
    }
  });
});

console.log('\n✅ File processing complete!\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Report results
console.log('📊 AUDIT RESULTS\n');
console.log(`Total HTML files audited: ${stats.totalFiles}`);
console.log(`Broken HTML links: ${stats.brokenLinks.length}`);
console.log(`Missing images: ${stats.missingImages.length}`);
console.log(`Broken static files: ${stats.staticFileIssues.length}`);
console.log(`Broken language switchers: ${stats.brokenLanguageSwitchers.length}`);
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Detailed broken links
if (stats.brokenLinks.length > 0) {
  console.log('❌ BROKEN HTML LINKS:\n');
  const linksByFile = {};
  stats.brokenLinks.forEach(item => {
    if (!linksByFile[item.file]) linksByFile[item.file] = [];
    linksByFile[item.file].push(item.link);
  });
  
  Object.keys(linksByFile).sort().forEach(file => {
    console.log(`\n  ${file}:`);
    linksByFile[file].forEach(link => console.log(`    → ${link}`));
  });
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Detailed missing images
if (stats.missingImages.length > 0) {
  console.log('🖼️  MISSING IMAGES:\n');
  const imagesByFile = {};
  stats.missingImages.forEach(item => {
    if (!imagesByFile[item.file]) imagesByFile[item.file] = [];
    imagesByFile[item.file].push(item.image);
  });
  
  Object.keys(imagesByFile).sort().forEach(file => {
    console.log(`\n  ${file}:`);
    imagesByFile[file].forEach(img => console.log(`    → ${img}`));
  });
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Detailed static file issues
if (stats.staticFileIssues.length > 0) {
  console.log('📄 BROKEN STATIC FILES (CSS/JS):\n');
  const staticByFile = {};
  stats.staticFileIssues.forEach(item => {
    if (!staticByFile[item.file]) staticByFile[item.file] = [];
    staticByFile[item.file].push(item.resource);
  });
  
  Object.keys(staticByFile).sort().forEach(file => {
    console.log(`\n  ${file}:`);
    staticByFile[file].forEach(resource => console.log(`    → ${resource}`));
  });
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Detailed language switcher issues
if (stats.brokenLanguageSwitchers.length > 0) {
  console.log('🌐 BROKEN LANGUAGE SWITCHERS:\n');
  const switchersByFile = {};
  stats.brokenLanguageSwitchers.forEach(item => {
    if (!switchersByFile[item.file]) switchersByFile[item.file] = [];
    switchersByFile[item.file].push(`${item.lang}: ${item.href}`);
  });
  
  Object.keys(switchersByFile).sort().forEach(file => {
    console.log(`\n  ${file}:`);
    switchersByFile[file].forEach(switcher => console.log(`    → ${switcher}`));
  });
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Final summary
const totalIssues = stats.brokenLinks.length + stats.missingImages.length + 
                    stats.staticFileIssues.length + stats.brokenLanguageSwitchers.length;

if (totalIssues === 0) {
  console.log('✅ SUCCESS! No issues found. All links, images, and resources are working correctly!\n');
} else {
  console.log(`⚠️  TOTAL ISSUES FOUND: ${totalIssues}\n`);
  console.log('Please review and fix the issues listed above.\n');
}

// Save detailed report
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    totalFiles: stats.totalFiles,
    totalIssues: totalIssues,
    brokenLinks: stats.brokenLinks.length,
    missingImages: stats.missingImages.length,
    staticFileIssues: stats.staticFileIssues.length,
    brokenLanguageSwitchers: stats.brokenLanguageSwitchers.length
  },
  details: {
    brokenLinks: stats.brokenLinks,
    missingImages: stats.missingImages,
    staticFileIssues: stats.staticFileIssues,
    brokenLanguageSwitchers: stats.brokenLanguageSwitchers
  }
};

fs.writeFileSync('audit-report.json', JSON.stringify(report, null, 2));
console.log('📋 Detailed report saved to: audit-report.json\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
