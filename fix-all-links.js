const fs = require('fs');
const path = require('path');

// Define correct page mappings for all languages
const pageMap = {
  es: {
    'sobre-nosotros.html': 'sobre-nosotros.html',
    'about-us.html': 'sobre-nosotros.html',
    'nosaltres.html': 'sobre-nosotros.html',
    'a-propos-de-nous.html': 'sobre-nosotros.html',
    'sobre-nos.html': 'sobre-nosotros.html',
    'ski-lessons-baqueira.html': 'clases-de-esqui-baqueira.html',
    'classes-desqui-baqueira.html': 'clases-de-esqui-baqueira.html',
    'cours-de-ski-baqueira.html': 'clases-de-esqui-baqueira.html',
    'aulas-de-esqui-baqueira.html': 'clases-de-esqui-baqueira.html',
    'contact-booking.html': 'contacto-reservas.html',
    'contacte-reserves.html': 'contacto-reservas.html',
    'contact-reservations.html': 'contacto-reservas.html',
    'contato-reservas.html': 'contacto-reservas.html',
    'webcams-baqueira.html': 'camaras-baqueira.html',
    'cameres-baqueira.html': 'camaras-baqueira.html',
    'cameras-baqueira.html': 'camaras-baqueira.html',
    'ski-trips.html': 'viajes-de-esqui.html',
    'viatges-desqui.html': 'viajes-de-esqui.html',
    'voyages-de-ski.html': 'viajes-de-esqui.html',
    'viagens-de-esqui.html': 'viajes-de-esqui.html'
  },
  en: {
    'sobre-nosotros.html': 'about-us.html',
    'nosaltres.html': 'about-us.html',
    'a-propos-de-nous.html': 'about-us.html',
    'sobre-nos.html': 'about-us.html',
    'clases-de-esqui-baqueira.html': 'ski-lessons-baqueira.html',
    'classes-desqui-baqueira.html': 'ski-lessons-baqueira.html',
    'cours-de-ski-baqueira.html': 'ski-lessons-baqueira.html',
    'aulas-de-esqui-baqueira.html': 'ski-lessons-baqueira.html',
    'contacto-reservas.html': 'contact-booking.html',
    'contacte-reserves.html': 'contact-booking.html',
    'contact-reservations.html': 'contact-booking.html',
    'contato-reservas.html': 'contact-booking.html',
    'camaras-baqueira.html': 'webcams-baqueira.html',
    'cameres-baqueira.html': 'webcams-baqueira.html',
    'cameras-baqueira.html': 'webcams-baqueira.html',
    'viajes-de-esqui.html': 'ski-trips.html',
    'viatges-desqui.html': 'ski-trips.html',
    'voyages-de-ski.html': 'ski-trips.html',
    'viagens-de-esqui.html': 'ski-trips.html'
  }
};

function fixLinks(filePath, lang) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  // Fix pattern 1: Remove /es/ prefix from Spanish root pages
  if (lang === 'es') {
    const before = content;
    content = content.replace(/href=["']\/es\//g, 'href="/');
    content = content.replace(/src=["']\/es\//g, 'src="/');
    if (content !== before) modified = true;
  }

  // Fix pattern 2: Fix double language prefixes (e.g., /pt/en/)
  const doubleLangPattern = /(\/(en|ca|fr|pt))\/(en|ca|fr|pt)\//g;
  if (doubleLangPattern.test(content)) {
    content = content.replace(doubleLangPattern, (match, first, lang1, lang2) => {
      return first + '/';
    });
    modified = true;
  }

  // Fix pattern 3: Translate page filenames for language subdirectories
  if (lang !== 'es' && pageMap[lang]) {
    for (const [wrongFile, correctFile] of Object.entries(pageMap[lang])) {
      const pattern = new RegExp(`(href=["'](?:\\/` + lang + `\\/)?)${wrongFile}(["'])`, 'g');
      if (pattern.test(content)) {
        content = content.replace(pattern, `$1${correctFile}$2`);
        modified = true;
      }
    }
  }

  // Fix pattern 4: Fix image paths with language-specific folders that don't exist
  content = content.replace(/\/images\/Sobre Nós\//g, '/images/');
  content = content.replace(/\/images\/About Us\//g, '/images/');
  content = content.replace(/\/images\/Nosaltres\//g, '/images/');

  // Fix pattern 5: Ensure language subdirectory links have proper prefix
  if (lang !== 'es') {
    // Fix links missing language prefix
    const missingPrefixPattern = /href=["']\/(?!(en|ca|fr|pt|images|js|css|blog|send-email))([^"']+\.html)/g;
    content = content.replace(missingPrefixPattern, `href="/${lang}/$2`);
  }

  // Fix pattern 6: Remove spaces from URLs (encode them)
  content = content.replace(/(href|src)=["']([^"']*)\s+([^"']*)[""]/g, (match, attr, before, after) => {
    return `${attr}="${before}%20${after}"`;
  });

  if (modified) {
    fs.writeFileSync(filePath, content);
    return true;
  }
  return false;
}

// Get all HTML files
function getAllHtmlFiles(dir, lang = 'es', fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (['en', 'ca', 'fr', 'pt'].includes(file)) {
        getAllHtmlFiles(filePath, file, fileList);
      } else if (!['images', 'js', 'css', 'blog', 'node_modules', '.git'].includes(file)) {
        getAllHtmlFiles(filePath, lang, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push({ path: filePath, lang });
    }
  });
  
  return fileList;
}

// Main execution
console.log('Starting comprehensive link fixing...');
const files = getAllHtmlFiles('.');
let fixedCount = 0;

files.forEach(({ path: filePath, lang }) => {
  if (fixLinks(filePath, lang)) {
    fixedCount++;
    console.log(`Fixed: ${filePath}`);
  }
});

console.log(`\n✓ Fixed ${fixedCount} files`);
console.log('Link fixing complete!');
