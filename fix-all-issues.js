const fs = require('fs');
const path = require('path');

const report = require('./audit-report.json');
let fixCount = 0;

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║          COMPREHENSIVE LINK FIX SCRIPT                     ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Group issues by file for efficient fixing
const issuesByFile = {};

// Process broken links
report.details.brokenLinks.forEach(item => {
  if (!issuesByFile[item.file]) {
    issuesByFile[item.file] = {
      brokenLinks: [],
      missingImages: [],
      langSwitchers: []
    };
  }
  issuesByFile[item.file].brokenLinks.push(item.link);
});

// Process missing images
report.details.missingImages.forEach(item => {
  if (!issuesByFile[item.file]) {
    issuesByFile[item.file] = {
      brokenLinks: [],
      missingImages: [],
      langSwitchers: []
    };
  }
  issuesByFile[item.file].missingImages.push(item.image);
});

// Process language switchers
report.details.brokenLanguageSwitchers.forEach(item => {
  if (!issuesByFile[item.file]) {
    issuesByFile[item.file] = {
      brokenLinks: [],
      missingImages: [],
      langSwitchers: []
    };
  }
  issuesByFile[item.file].langSwitchers.push(item.href);
});

console.log(`📁 Processing ${Object.keys(issuesByFile).length} files with issues...\n`);

// Fix each file
Object.keys(issuesByFile).forEach(file => {
  const issues = issuesByFile[file];
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;
  let fileFixCount = 0;
  
  // Determine file location for path context
  const fileParts = file.split('/');
  const inBlog = fileParts.includes('blog');
  const inLangBlog = fileParts.length >= 3 && fileParts[1] === 'blog'; // e.g., en/blog/file.html
  const langPrefix = fileParts.length >= 2 && ['en', 'fr', 'ca', 'pt'].includes(fileParts[0]) ? fileParts[0] : '';
  const inLangFolder = langPrefix && !inLangBlog; // e.g., en/file.html (not blog)
  const inRootBlog = file.startsWith('blog/'); // e.g., blog/file.html
  
  // Fix broken links
  issues.brokenLinks.forEach(link => {
    // Skip external links
    if (link.startsWith('http') || link.startsWith('//')) return;
    
    let fixedLink = link;
    
    // Pattern 1: Blog internal links missing path prefix
    // e.g., href="como-llegar-baqueira-beret" -> href="/blog/como-llegar-baqueira-beret"
    if (inRootBlog && !link.includes('/') && !link.startsWith('#')) {
      fixedLink = '/blog/' + link;
      const oldPattern = `href="${link}"`;
      const newPattern = `href="${fixedLink}"`;
      if (content.includes(oldPattern)) {
        content = content.replace(new RegExp(escapeRegex(oldPattern), 'g'), newPattern);
        fileFixCount++;
        modified = true;
      }
    }
    
    // Pattern 2: Language-specific blog links
    // e.g., in en/blog/file.html: href="other-post" -> href="/en/blog/other-post"
    if (inLangBlog && !link.includes('/') && !link.startsWith('#')) {
      fixedLink = `/${langPrefix}/blog/${link}`;
      const oldPattern = `href="${link}"`;
      const newPattern = `href="${fixedLink}"`;
      if (content.includes(oldPattern)) {
        content = content.replace(new RegExp(escapeRegex(oldPattern), 'g'), newPattern);
        fileFixCount++;
        modified = true;
      }
    }
    
    // Pattern 3: Relative links missing from language switchers
    // e.g., dropdown links like "../blog/post" that should be "/lang/blog/post"
    if (link.startsWith('../') || link.startsWith('./')) {
      // Try to resolve the relative path
      const resolved = path.resolve(path.dirname(file), link);
      const normalizedPath = '/' + resolved.replace(/^\.\//, '');
      const oldPattern = `href="${link}"`;
      const newPattern = `href="${normalizedPath}"`;
      if (content.includes(oldPattern)) {
        content = content.replace(new RegExp(escapeRegex(oldPattern), 'g'), newPattern);
        fileFixCount++;
        modified = true;
      }
    }
  });
  
  // Fix missing images
  issues.missingImages.forEach(img => {
    if (img.startsWith('http') || img.startsWith('//') || img.startsWith('data:')) return;
    
    // For blog images, ensure proper path
    // Check common patterns and fix
    
    // Pattern 1: ../blog/folder/image.webp where the path doesn't resolve
    if (img.includes('blog/') && img.startsWith('../')) {
      // Try different path resolutions
      const imgName = path.basename(img);
      const folderMatch = img.match(/([^\/]+\/[^\/]+)\/[^\/]+$/);
      
      if (folderMatch) {
        const folder = folderMatch[1];
        // Check if it exists with different casing
        const possiblePaths = [
          `/blog/${folder}/${imgName}`,
          `../../blog/${folder}/${imgName}`
        ];
        
        for (const testPath of possiblePaths) {
          const cleanPath = testPath.startsWith('/') ? testPath.substring(1) : testPath;
          if (fs.existsSync(cleanPath)) {
            const oldPattern = escapeRegex(`src="${img}"`);
            const newPattern = `src="${testPath}"`;
            content = content.replace(new RegExp(oldPattern, 'g'), newPattern);
            fileFixCount++;
            modified = true;
            break;
          }
        }
      }
    }
    
    // Pattern 2: Missing ../logo1.jpg -> /logo1.jpg
    if (img === '../logo1.jpg' || img === '../../logo1.jpg') {
      const oldPattern = escapeRegex(`src="${img}"`);
      const newPattern = `src="/logo1.jpg"`;
      if (content.includes(`src="${img}"`)) {
        content = content.replace(new RegExp(oldPattern, 'g'), newPattern);
        fileFixCount++;
        modified = true;
      }
    }
  });
  
  // Fix language switchers
  issues.langSwitchers.forEach(href => {
    if (href.startsWith('http') || href.startsWith('//') || href.startsWith('#')) return;
    
    // Convert relative paths to absolute
    if (href.includes('../') || href.includes('./')) {
      const resolved = path.resolve(path.dirname(file), href);
      const normalizedPath = '/' + resolved.replace(/^\.\//, '');
      const oldPattern = `href="${href}"`;
      const newPattern = `href="${normalizedPath}"`;
      if (content.includes(oldPattern)) {
        content = content.replace(new RegExp(escapeRegex(oldPattern), 'g'), newPattern);
        fileFixCount++;
        modified = true;
      }
    }
  });
  
  // Save file if modified
  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    fixCount += fileFixCount;
    console.log(`✅ ${file}: Fixed ${fileFixCount} issues`);
  }
});

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log(`🎉 COMPLETE! Fixed ${fixCount} issues across ${Object.keys(issuesByFile).length} files\n`);
console.log('Next step: Run comprehensive-audit.js again to verify fixes\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
