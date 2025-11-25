const fs = require('fs');
const path = require('path');

let totalFixes = 0;

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║          FIXING REMAINING 277 BROKEN LINKS                 ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Spanish blog post names to language-specific mappings
const blogPostMappings = {
  ca: {
    'como-llegar-baqueira-beret': '/ca/blog/com-arribar-a-baqueira-beret',
    'como-aprender-esquiar-baqueira': '/ca/blog/com-aprendre-esquiar-baqueira',
    'las-mejores-apps-para-esquiar-en-baqueira-beret': '/ca/blog/millors-apps-per-esquiar-baqueira-beret',
    'mejores-hoteles-familias-baqueira-beret': '/ca/blog/millors-hotels-families-baqueira-beret',
    'mejores-restaurantes-baqueira-beret': '/ca/blog/millors-restaurants-baqueira-beret',
    'zonas-principiantes-baqueira-beret': '/ca/blog/zones-principiants-baqueira-beret',
    'clases-de-snowboard-baqueira': '/ca/classes-de-snowboard-baqueira'
  },
  pt: {
    'como-llegar-baqueira-beret': '/pt/blog/como-chegar-a-baqueira-beret',
    'como-aprender-esquiar-baqueira': '/pt/blog/como-aprender-esquiar-baqueira',
    'las-mejores-apps-para-esquiar-en-baqueira-beret': '/pt/blog/melhores-apps-para-esquiar-baqueira-beret',
    'alquiler-esqui-snowboard-baqueira': '/pt/blog/aluguel-esqui-snowboard-baqueira',
    'zonas-principiantes-baqueira-beret': '/pt/blog/zonas-iniciantes-baqueira-beret',
    'mejores-hoteles-familias-baqueira-beret': '/pt/blog/melhores-hoteis-familias-baqueira-beret',
    'mejores-restaurantes-baqueira-beret': '/pt/blog/melhores-restaurantes-baqueira-beret',
    'clases-de-snowboard-baqueira': '/pt/aulas-de-snowboard-baqueira'
  },
  en: {
    'clases-de-snowboard-baqueira': '/en/snowboard-lessons-baqueira',
    'como-llegar-baqueira-beret': '/en/blog/how-to-get-to-baqueira-beret',
    'como-aprender-esquiar-baqueira': '/en/blog/how-to-learn-skiing-baqueira'
  },
  fr: {
    'clases-de-snowboard-baqueira': '/fr/cours-de-snowboard-baqueira',
    'como-llegar-baqueira-beret': '/fr/blog/comment-arriver-a-baqueira-beret',
    'como-aprender-esquiar-baqueira': '/fr/blog/comment-apprendre-skier-baqueira'
  }
};

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let fixes = 0;
  
  // Determine language
  let lang = 'es';
  if (filePath.startsWith('ca/')) lang = 'ca';
  else if (filePath.startsWith('en/')) lang = 'en';
  else if (filePath.startsWith('fr/')) lang = 'fr';
  else if (filePath.startsWith('pt/')) lang = 'pt';
  
  // Fix blog post mappings
  if (lang !== 'es' && blogPostMappings[lang]) {
    const mapping = blogPostMappings[lang];
    Object.keys(mapping).forEach(spanishSlug => {
      const correctUrl = mapping[spanishSlug];
      
      // Pattern 1: href="spanish-slug"
      const pattern1 = new RegExp(`href="${escapeRegex(spanishSlug)}"`, 'g');
      if (content.match(pattern1)) {
        content = content.replace(pattern1, `href="${correctUrl}"`);
        modified = true;
        fixes++;
      }
      
      // Pattern 2: href="../spanish-slug"
      const pattern2 = new RegExp(`href="\\.\\.\/${escapeRegex(spanishSlug)}"`, 'g');
      if (content.match(pattern2)) {
        content = content.replace(pattern2, `href="${correctUrl}"`);
        modified = true;
        fixes++;
      }
    });
  }
  
  // Fix standalone language codes in old folder
  if (filePath.includes('clases-esqui-baqueira/')) {
    ['pt', 'en', 'fr', 'ca', 'es'].forEach(langCode => {
      const pattern = new RegExp(`href="${langCode}"`, 'g');
      if (content.match(pattern)) {
        const targetUrl = langCode === 'es' ? '/' : `/${langCode}/`;
        content = content.replace(pattern, `href="${targetUrl}"`);
        modified = true;
        fixes++;
      }
    });
    
    // Fix contacto-reservas in old folder
    const pattern = /href="contacto-reservas"/g;
    if (content.match(pattern)) {
      content = content.replace(pattern, 'href="/contacto-reservas"');
      modified = true;
      fixes++;
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    return fixes;
  }
  
  return 0;
}

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

const allFiles = getAllHtmlFiles('.');

console.log(`📁 Processing ${allFiles.length} HTML files...\n`);

allFiles.forEach((file, index) => {
  const fixes = fixFile(file);
  if (fixes > 0) {
    console.log(`  ✅ ${file} - Fixed ${fixes} links`);
    totalFixes += fixes;
  }
  
  if ((index + 1) % 50 === 0) {
    console.log(`\n⏳ Progress: ${index + 1}/${allFiles.length} files\n`);
  }
});

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`\n🎉 COMPLETE! Total links fixed: ${totalFixes}\n`);
console.log('Next: Run audit-fixed.js final verification\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
