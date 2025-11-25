const fs = require('fs');
const path = require('path');

let totalFixes = 0;

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║           COMPREHENSIVE LINK FIX - ALL 552 ISSUES          ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Mapping old clases-esqui-baqueira URLs to new structure
const oldToNew = {
  // Spanish mappings
  es: {
    'clases-esqui-baqueira/index': '/clases-de-esqui-baqueira',
    'clases-esqui-baqueira/grupo-ninos': '/clases-grupo-ninos-baqueira',
    'clases-esqui-baqueira/grupo-adultos': '/clases-grupo-adultos-baqueira',
    'clases-esqui-baqueira/empresas-colegios': '/clases-empresas-colegios-baqueira',
    'clases-esqui-baqueira/particulares-ninos': '/clases-particulares-ninos-baqueira',
    'clases-esqui-baqueira/particulares-adultos': '/clases-particulares-adultos-baqueira',
    'clases-esqui-baqueira/particulares-familias': '/clases-particulares-familias-baqueira',
    'clases-esqui-baqueira/particulares-carv': '/clases-tecnologia-carv-baqueira',
    'clases-de-snowboard': '/clases-de-snowboard-baqueira',
    'camaras': '/camaras-baqueira',
    'alquiler': '/alquiler-de-material-baqueira',
    'Nosotros': '/sobre-nosotros',
    'Viajes': '/viajes-de-esqui',
    'precios': '/precios-y-tarifas-baqueira',
    'contacto-reservas': '/contacto-reservas',
    'aviso-legal': '/aviso-legal',
    'politica-de-privacidad': '/politica-de-privacidad',
    'politica-de-cookies': '/politica-de-cookies',
    'politica-de-cancelacion': '/politica-de-cancelacion'
  },
  // Catalan mappings
  ca: {
    'clases-esqui-baqueira/index': '/ca/classes-desqui-baqueira',
    'clases-esqui-baqueira/grupo-ninos': '/ca/classes-grup-nens-baqueira',
    'clases-esqui-baqueira/grupo-adultos': '/ca/classes-grup-adults-baqueira',
    'clases-esqui-baqueira/empresas-colegios': '/ca/classes-empreses-escoles-baqueira',
    'clases-de-snowboard': '/ca/classes-de-snowboard-baqueira',
    'alquiler-de-material-baqueira': '/ca/lloguer-de-material-baqueira',
    'camaras-baqueira': '/ca/cameres-baqueira',
    'alquiler-esqui-snowboard-baqueira': '/ca/blog/lloguer-esqui-snowboard-baqueira',
    'zonas-principiantes-baqueira-beret': '/ca/blog/zones-principiants-baqueira-beret',
    'mejores-hoteles-familias-baqueira-beret': '/ca/blog/millors-hotels-families-baqueira-beret',
    'mejores-restaurantes-baqueira-beret': '/ca/blog/millors-restaurants-baqueira-beret',
    'Nosaltres': '/ca/nosaltres',
    'Viatges': '/ca/viatges-desqui',
    'precios-y-tarifas-baqueira': '/ca/preus-i-tarifes-baqueira',
    'contacto-reservas': '/ca/contacte-reserves',
    'aviso-legal': '/ca/avis-legal',
    'politica-de-privacidad': '/ca/politica-de-privacitat',
    'politica-de-cancelacion': '/ca/politica-de-cancel-lacio'
  },
  // English mappings
  en: {
    'clases-esqui-baqueira/index': '/en/ski-lessons-baqueira',
    'webcams-baqueira': '/en/webcams-baqueira',
    'location-materiel-baqueira': '/en/ski-snowboard-rental-baqueira'
  },
  // French mappings
  fr: {
    'webcams-baqueira': '/fr/cameras-baqueira',
    'location-materiel-baqueira': '/fr/location-de-materiel-baqueira'
  },
  // Portuguese mappings
  pt: {
    'clases-esqui-baqueira/index': '/pt/aulas-de-esqui-baqueira',
    'clases-esqui-baqueira/grupo-ninos': '/pt/aulas-grupo-criancas-baqueira',
    'alquiler-de-material-baqueira': '/pt/aluguel-de-equipamento-baqueira',
    'contacto-reservas': '/pt/contato-reservas',
    'alquiler-esqui-snowboard-baqueira': '/pt/blog/aluguel-esqui-snowboard-baqueira',
    'zonas-principiantes-baqueira-beret': '/pt/blog/zonas-iniciantes-baqueira-beret',
    'como-llegar-baqueira-beret': '/pt/blog/como-chegar-a-baqueira-beret',
    'las-mejores-apps-para-esquiar-en-baqueira-beret': '/pt/blog/melhores-apps-para-esquiar-baqueira-beret',
    'webcams-baqueira': '/pt/cameras-baqueira',
    'Sobre Nós': '/pt/sobre-nos',
    'aluguel-de-material-baqueira': '/pt/aluguel-de-equipamento-baqueira'
  }
};

// Blog page links mapping
const blogLinks = {
  ca: '/ca/blog/areas-iniciants-baqueira-beret',
  en: '/en/blog/beginner-areas-baqueira-beret',
  fr: '/fr/blog/zones-debutants-baqueira-beret',
  pt: '/pt/blog/zonas-iniciantes-baqueira-beret'
};

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let fixes = 0;
  
  // Determine language context
  let lang = 'es';
  if (filePath.startsWith('ca/')) lang = 'ca';
  else if (filePath.startsWith('en/')) lang = 'en';
  else if (filePath.startsWith('fr/')) lang = 'fr';
  else if (filePath.startsWith('pt/')) lang = 'pt';
  
  const mapping = oldToNew[lang];
  if (!mapping) return 0;
  
  // Fix all mapped links
  Object.keys(mapping).forEach(oldPath => {
    const newPath = mapping[oldPath];
    
    // Pattern 1: Exact match href="../oldPath"
    const pattern1 = new RegExp(`href="\\.\\.\/${escapeRegex(oldPath)}"`, 'g');
    if (content.match(pattern1)) {
      content = content.replace(pattern1, `href="${newPath}"`);
      modified = true;
      fixes++;
    }
    
    // Pattern 2: Exact match href="oldPath"
    const pattern2 = new RegExp(`href="${escapeRegex(oldPath)}"`, 'g');
    if (content.match(pattern2)) {
      content = content.replace(pattern2, `href="${newPath}"`);
      modified = true;
      fixes++;
    }
    
    // Pattern 3: With trailing slash
    const pattern3 = new RegExp(`href="\\.\\.\/${escapeRegex(oldPath)}/"`, 'g');
    if (content.match(pattern3)) {
      content = content.replace(pattern3, `href="${newPath}"`);
      modified = true;
      fixes++;
    }
  });
  
  // Fix language code links (pt, en, fr, ca standalone)
  if (lang !== 'es') {
    const langPattern = new RegExp(`href="${lang}"`, 'g');
    if (content.match(langPattern)) {
      content = content.replace(langPattern, `href="/${lang}/"`);
      modified = true;
      fixes++;
    }
  }
  
  // Fix specific blog area links
  if (filePath.includes('/blog.html')) {
    const blogAreaPattern = /href="\/\w{2}\/blog\/areas-iniciantes-baqueira-beret"/g;
    if (lang === 'pt' && content.match(blogAreaPattern)) {
      content = content.replace(blogAreaPattern, `href="${blogLinks.pt}"`);
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

// Get all HTML files
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
    console.log(`\n⏳ Progress: ${index + 1}/${allFiles.length} files processed\n`);
  }
});

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`\n🎉 COMPLETE! Total links fixed: ${totalFixes}\n`);
console.log('Next: Run audit-fixed.js to verify remaining issues\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
