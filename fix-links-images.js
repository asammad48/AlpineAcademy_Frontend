const fs = require('fs');
const path = require('path');

let totalFixes = 0;

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║          FIXING ALL BROKEN LINKS AND IMAGES                ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Pattern 1: Fix blog internal links (Spanish root blog)
console.log('📝 Step 1: Fixing Spanish blog internal links...');
const spanishBlogFiles = fs.readdirSync('blog').filter(f => f.endsWith('.html'));
let blogLinkFixes = 0;

spanishBlogFiles.forEach(file => {
  const filePath = `blog/${file}`;
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Find all blog post links (related articles section)
  const blogPostPattern = /href="([\w-]+)"(?!.*http)/g;
  const matches = [...content.matchAll(blogPostPattern)];
  
  matches.forEach(match => {
    const link = match[1];
    // Check if it's a blog post link (no slashes, no #, not a page element)
    if (!link.includes('/') && !link.includes('#') && !link.includes('.') && 
        link.length > 10 && link.includes('-')) {
      // Check if this blog post exists
      const targetFile = `blog/${link}.html`;
      if (fs.existsSync(targetFile)) {
        const oldPattern = `href="${link}"`;
        const newPattern = `href="/blog/${link}"`;
        content = content.replace(new RegExp(escapeRegex(oldPattern), 'g'), newPattern);
        modified = true;
        blogLinkFixes++;
      }
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✅ ${filePath}`);
  }
});

console.log(`  Fixed ${blogLinkFixes} blog internal links\n`);
totalFixes += blogLinkFixes;

// Pattern 2: Fix blog internal links in language-specific blogs
console.log('📝 Step 2: Fixing language-specific blog internal links...');
const languages = ['en', 'fr', 'ca', 'pt'];
let langBlogLinkFixes = 0;

languages.forEach(lang => {
  const blogDir = `${lang}/blog`;
  if (!fs.existsSync(blogDir)) return;
  
  const langBlogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.html') && f !== 'blog.html');
  
  langBlogFiles.forEach(file => {
    const filePath = `${blogDir}/${file}`;
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    const blogPostPattern = /href="([\w-]+)"(?!.*http)/g;
    const matches = [...content.matchAll(blogPostPattern)];
    
    matches.forEach(match => {
      const link = match[1];
      if (!link.includes('/') && !link.includes('#') && !link.includes('.') && 
          link.length > 10 && link.includes('-')) {
        const targetFile = `${blogDir}/${link}.html`;
        if (fs.existsSync(targetFile)) {
          const oldPattern = `href="${link}"`;
          const newPattern = `href="/${lang}/blog/${link}"`;
          content = content.replace(new RegExp(escapeRegex(oldPattern), 'g'), newPattern);
          modified = true;
          langBlogLinkFixes++;
        }
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  ✅ ${filePath}`);
    }
  });
});

console.log(`  Fixed ${langBlogLinkFixes} language blog internal links\n`);
totalFixes += langBlogLinkFixes;

// Pattern 3: Fix image paths in language blog files
console.log('📝 Step 3: Fixing image paths in language blog files...');
let imageFixes = 0;

languages.forEach(lang => {
  const blogDir = `${lang}/blog`;
  if (!fs.existsSync(blogDir)) return;
  
  const langBlogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));
  
  langBlogFiles.forEach(file => {
    const filePath = `${blogDir}/${file}`;
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Fix ../blog/ to ../../blog/ (wrong level)
    const wrongPattern = /src="\.\.\/blog\//g;
    const correctPattern = 'src="../../blog/';
    if (content.match(wrongPattern)) {
      content = content.replace(wrongPattern, correctPattern);
      modified = true;
      const count = (content.match(/src="\.\.\/\.\.\/blog\//g) || []).length;
      imageFixes += count;
    }
    
    // Fix ../logo1.jpg to ../../logo1.jpg
    const logoPattern = /src="\.\.\/logo1\.jpg"/g;
    if (content.match(logoPattern)) {
      content = content.replace(logoPattern, 'src="../../logo1.jpg"');
      modified = true;
      imageFixes++;
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  ✅ ${filePath}`);
    }
  });
});

console.log(`  Fixed ${imageFixes} image paths\n`);
totalFixes += imageFixes;

// Pattern 4: Fix language switcher links in language blog files
console.log('📝 Step 4: Fixing language switcher dropdown links...');
let switcherFixes = 0;

languages.forEach(lang => {
  const blogDir = `${lang}/blog`;
  if (!fs.existsSync(blogDir)) return;
  
  const langBlogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));
  
  langBlogFiles.forEach(file => {
    const filePath = `${blogDir}/${file}`;
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Fix dropdown links in language switcher
    // Pattern: href="relative-blog-post" within dropdown -> should be href="/blog/relative-blog-post" for Spanish
    const dropdownSection = content.match(/<div[^>]*(?:class|id)=["'][^"']*(?:dropdown|language)[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi);
    
    if (dropdownSection) {
      dropdownSection.forEach(section => {
        // Find Spanish blog links (should go to /blog/)
        const spanishLinkPattern = /href="([\w-]+)"(?=[^>]*>)/g;
        const matches = [...section.matchAll(spanishLinkPattern)];
        
        matches.forEach(match => {
          const link = match[1];
          if (!link.includes('/') && !link.includes('#') && !link.includes('.') &&
              link.length > 10 && link.includes('-')) {
            // Check if Spanish blog post exists
            if (fs.existsSync(`blog/${link}.html`)) {
              const oldPattern = `href="${link}"`;
              const newPattern = `href="/blog/${link}"`;
              const oldSection = section;
              const newSection = section.replace(new RegExp(escapeRegex(oldPattern), 'g'), newPattern);
              if (oldSection !== newSection) {
                content = content.replace(oldSection, newSection);
                modified = true;
                switcherFixes++;
              }
            }
          }
        });
      });
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  ✅ ${filePath}`);
    }
  });
});

console.log(`  Fixed ${switcherFixes} language switcher links\n`);
totalFixes += switcherFixes;

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`\n🎉 COMPLETE! Total fixes: ${totalFixes}\n`);
console.log('Next: Run comprehensive-audit.js again to verify\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
