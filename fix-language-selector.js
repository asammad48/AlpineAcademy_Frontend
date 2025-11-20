const fs = require('fs');
const path = require('path');

// Language mappings from language.js
const pageMappings = {
  'index.html': { es: 'index.html', en: 'index.html', ca: 'index.html', fr: 'index.html', pt: 'index.html' },
  'sobre-nosotros.html': { es: 'sobre-nosotros.html', en: 'about-us.html', ca: 'nosaltres.html', fr: 'a-propos-de-nous.html', pt: 'sobre-nos.html' },
  'about-us.html': { es: 'sobre-nosotros.html', en: 'about-us.html', ca: 'nosaltres.html', fr: 'a-propos-de-nous.html', pt: 'sobre-nos.html' },
  'nosaltres.html': { es: 'sobre-nosotros.html', en: 'about-us.html', ca: 'nosaltres.html', fr: 'a-propos-de-nous.html', pt: 'sobre-nos.html' },
  'a-propos-de-nous.html': { es: 'sobre-nosotros.html', en: 'about-us.html', ca: 'nosaltres.html', fr: 'a-propos-de-nous.html', pt: 'sobre-nos.html' },
  'sobre-nos.html': { es: 'sobre-nosotros.html', en: 'about-us.html', ca: 'nosaltres.html', fr: 'a-propos-de-nous.html', pt: 'sobre-nos.html' },
  'politica-de-cookies.html': { es: 'politica-de-cookies.html', en: 'cookie-policy.html', ca: 'politica-de-cookies.html', fr: 'politique-de-cookies.html', pt: 'politica-de-cookies.html' },
  'cookie-policy.html': { es: 'politica-de-cookies.html', en: 'cookie-policy.html', ca: 'politica-de-cookies.html', fr: 'politique-de-cookies.html', pt: 'politica-de-cookies.html' },
  'politique-de-cookies.html': { es: 'politica-de-cookies.html', en: 'cookie-policy.html', ca: 'politica-de-cookies.html', fr: 'politique-de-cookies.html', pt: 'politica-de-cookies.html' },
  'politica-de-privacidad.html': { es: 'politica-de-privacidad.html', en: 'privacy-policy.html', ca: 'politica-de-privacitat.html', fr: 'politique-de-confidentialite.html', pt: 'politica-de-privacidade.html' },
  'privacy-policy.html': { es: 'politica-de-privacidad.html', en: 'privacy-policy.html', ca: 'politica-de-privacitat.html', fr: 'politique-de-confidentialite.html', pt: 'politica-de-privacidade.html' },
  'politique-de-confidentialite.html': { es: 'politica-de-privacidad.html', en: 'privacy-policy.html', ca: 'politica-de-privacitat.html', fr: 'politique-de-confidentialite.html', pt: 'politica-de-privacidade.html' },
  'politica-de-privacitat.html': { es: 'politica-de-privacidad.html', en: 'privacy-policy.html', ca: 'politica-de-privacitat.html', fr: 'politique-de-confidentialite.html', pt: 'politica-de-privacidade.html' },
  'politica-de-privacidade.html': { es: 'politica-de-privacidad.html', en: 'privacy-policy.html', ca: 'politica-de-privacitat.html', fr: 'politique-de-confidentialite.html', pt: 'politica-de-privacidade.html' },
  'aviso-legal.html': { es: 'aviso-legal.html', en: 'legal-notice.html', ca: 'avis-legal.html', fr: 'mentions-legales.html', pt: 'aviso-legal.html' },
  'legal-notice.html': { es: 'aviso-legal.html', en: 'legal-notice.html', ca: 'avis-legal.html', fr: 'mentions-legales.html', pt: 'aviso-legal.html' },
  'mentions-legales.html': { es: 'aviso-legal.html', en: 'legal-notice.html', ca: 'avis-legal.html', fr: 'mentions-legales.html', pt: 'aviso-legal.html' },
  'avis-legal.html': { es: 'aviso-legal.html', en: 'legal-notice.html', ca: 'avis-legal.html', fr: 'mentions-legales.html', pt: 'aviso-legal.html' }
};

// Function to get all HTML files in a directory
function getHtmlFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && item !== 'blog') {
      files.push(...getHtmlFiles(fullPath));
    } else if (stat.isFile() && item.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Function to fix language selector in a file
function fixLanguageSelector(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const filename = path.basename(filePath);
  const dir = path.dirname(filePath);
  const langDir = dir.split(path.sep)[0]; // fr, en, ca, or pt
  
  // Determine the current language
  let currentLang;
  if (langDir === 'fr') currentLang = 'fr';
  else if (langDir === 'en') currentLang = 'en';
  else if (langDir === 'ca') currentLang = 'ca';
  else if (langDir === 'pt') currentLang = 'pt';
  else return; // Skip if not in a language subdirectory
  
  // Get the mapping for this file
  const mapping = pageMappings[filename];
  if (!mapping) {
    console.log(`No mapping found for ${filename}`);
    return;
  }
  
  // Build the correct URLs for each language
  const esUrl = `/${mapping.es}`;
  const enUrl = `/en/${mapping.en}`;
  const caUrl = `/ca/${mapping.ca}`;
  const frUrl = `/fr/${mapping.fr}`;
  const ptUrl = `/pt/${mapping.pt}`;
  
  let updatedContent = content;
  
  // Fix Spanish option - should NOT be active and should have proper href
  updatedContent = updatedContent.replace(
    /<a class="dropdown-item active language-option" href="#" data-lang="fr">\s*<img src="https:\/\/flagcdn\.com\/w40\/es\.png"[^>]*>Español\s*<\/a>/gi,
    `<a class="dropdown-item language-option" href="${esUrl}" data-lang="es">
                                <img src="https://flagcdn.com/w40/es.png" width="20" height="15" alt="Spanish Flag" class="me-2">Español
                            </a>`
  );
  
  updatedContent = updatedContent.replace(
    /<a class="dropdown-item language-option" href="#" data-lang="[^"]*">\s*<img src="https:\/\/flagcdn\.com\/w40\/es\.png"[^>]*>Español\s*<\/a>/gi,
    `<a class="dropdown-item language-option" href="${esUrl}" data-lang="es">
                                <img src="https://flagcdn.com/w40/es.png" width="20" height="15" alt="Spanish Flag" class="me-2">Español
                            </a>`
  );
  
  // Ensure all language options have correct hrefs
  // English
  updatedContent = updatedContent.replace(
    /(<a class="dropdown-item(?:\s+active)?\s+language-option" href=")([^"]*)(" data-lang="en">)/g,
    (match, p1, p2, p3) => {
      // If current language is English, use #, otherwise use the English URL
      const href = currentLang === 'en' ? '#' : enUrl;
      return `${p1}${href}${p3}`;
    }
  );
  
  // Catalan
  updatedContent = updatedContent.replace(
    /(<a class="dropdown-item(?:\s+active)?\s+language-option" href=")([^"]*)(" data-lang="ca">)/g,
    (match, p1, p2, p3) => {
      const href = currentLang === 'ca' ? '#' : caUrl;
      return `${p1}${href}${p3}`;
    }
  );
  
  // French
  updatedContent = updatedContent.replace(
    /(<a class="dropdown-item(?:\s+active)?\s+language-option" href=")([^"]*)(" data-lang="fr">)/g,
    (match, p1, p2, p3) => {
      const href = currentLang === 'fr' ? '#' : frUrl;
      return `${p1}${href}${p3}`;
    }
  );
  
  // Portuguese
  updatedContent = updatedContent.replace(
    /(<a class="dropdown-item(?:\s+active)?\s+language-option" href=")([^"]*)(" data-lang="pt">)/g,
    (match, p1, p2, p3) => {
      const href = currentLang === 'pt' ? '#' : ptUrl;
      return `${p1}${href}${p3}`;
    }
  );
  
  // Spanish
  updatedContent = updatedContent.replace(
    /(<a class="dropdown-item(?:\s+active)?\s+language-option" href=")([^"]*)(" data-lang="es">)/g,
    (match, p1, p2, p3) => {
      // Spanish should always link to the root Spanish page (never #)
      return `${p1}${esUrl}${p3}`;
    }
  );
  
  // Write the updated content back
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Fixed: ${filePath}`);
  }
}

// Main execution
const directories = ['fr', 'en', 'ca', 'pt'];
let totalFixed = 0;

for (const dir of directories) {
  if (fs.existsSync(dir)) {
    console.log(`\nProcessing ${dir} directory...`);
    const files = getHtmlFiles(dir);
    
    for (const file of files) {
      fixLanguageSelector(file);
      totalFixed++;
    }
  }
}

console.log(`\n✓ Processing complete! Checked ${totalFixed} files.`);
