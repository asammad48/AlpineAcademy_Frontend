const fs = require('fs');
const path = require('path');

// Map of expected pages for each language
const pageMapping = {
  es: {
    'index.html': 'index.html',
    'clases-de-esqui-baqueira.html': 'clases-de-esqui-baqueira.html',
    'clases-de-snowboard-baqueira.html': 'clases-de-snowboard-baqueira.html',
    'clases-particulares-ninos-baqueira.html': 'clases-particulares-ninos-baqueira.html',
    'clases-particulares-familias-baqueira.html': 'clases-particulares-familias-baqueira.html',
    'clases-particulares-adultos-baqueira.html': 'clases-particulares-adultos-baqueira.html',
    'clases-grupo-ninos-baqueira.html': 'clases-grupo-ninos-baqueira.html',
    'clases-grupo-adultos-baqueira.html': 'clases-grupo-adultos-baqueira.html',
    'clases-de-freeride-baqueira.html': 'clases-de-freeride-baqueira.html',
    'clases-de-freestyle-baqueira.html': 'clases-de-freestyle-baqueira.html',
    'clases-tecnologia-carv-baqueira.html': 'clases-tecnologia-carv-baqueira.html',
    'clases-empresas-colegios-baqueira.html': 'clases-empresas-colegios-baqueira.html',
    'alquiler-de-material-baqueira.html': 'alquiler-de-material-baqueira.html',
    'viajes-de-esqui.html': 'viajes-de-esqui.html',
    'camaras-baqueira.html': 'camaras-baqueira.html',
    'precios-y-tarifas-baqueira.html': 'precios-y-tarifas-baqueira.html',
    'sobre-nosotros.html': 'sobre-nosotros.html',
    'contacto-reservas.html': 'contacto-reservas.html',
    'blog.html': 'blog.html',
    'aviso-legal.html': 'aviso-legal.html',
    'politica-de-privacidad.html': 'politica-de-privacidad.html',
    'politica-de-cookies.html': 'politica-de-cookies.html',
    'politica-de-cancelacion.html': 'politica-de-cancelacion.html'
  },
  en: {
    'index.html': 'index.html',
    'ski-lessons-baqueira.html': 'ski-lessons-baqueira.html',
    'snowboard-lessons-baqueira.html': 'snowboard-lessons-baqueira.html',
    'private-ski-lessons-kids-baqueira.html': 'private-ski-lessons-kids-baqueira.html',
    'private-ski-lessons-families-baqueira.html': 'private-ski-lessons-families-baqueira.html',
    'private-ski-lessons-adults-baqueira.html': 'private-ski-lessons-adults-baqueira.html',
    'group-ski-lessons-kids-baqueira.html': 'group-ski-lessons-kids-baqueira.html',
    'group-ski-lessons-adults-baqueira.html': 'group-ski-lessons-adults-baqueira.html',
    'freeride-lessons-baqueira.html': 'freeride-lessons-baqueira.html',
    'freestyle-lessons-baqueira.html': 'freestyle-lessons-baqueira.html',
    'carv-technology-lessons-baqueira.html': 'carv-technology-lessons-baqueira.html',
    'corporate-school-lessons-baqueira.html': 'corporate-school-lessons-baqueira.html',
    'equipment-rental-baqueira.html': 'equipment-rental-baqueira.html',
    'ski-trips.html': 'ski-trips.html',
    'webcams-baqueira.html': 'webcams-baqueira.html',
    'prices-rates-baqueira.html': 'prices-rates-baqueira.html',
    'about-us.html': 'about-us.html',
    'contact-booking.html': 'contact-booking.html',
    'blog.html': 'blog.html',
    'legal-notice.html': 'legal-notice.html',
    'privacy-policy.html': 'privacy-policy.html',
    'cookie-policy.html': 'cookie-policy.html',
    'cancellation-policy.html': 'cancellation-policy.html'
  },
  pt: {
    'index.html': 'index.html',
    'aulas-de-esqui-baqueira.html': 'aulas-de-esqui-baqueira.html',
    'aulas-de-snowboard-baqueira.html': 'aulas-de-snowboard-baqueira.html',
    'aulas-particulares-criancas-baqueira.html': 'aulas-particulares-criancas-baqueira.html',
    'aulas-particulares-familias-baqueira.html': 'aulas-particulares-familias-baqueira.html',
    'aulas-particulares-adultos-baqueira.html': 'aulas-particulares-adultos-baqueira.html',
    'aulas-grupo-criancas-baqueira.html': 'aulas-grupo-criancas-baqueira.html',
    'aulas-grupo-adultos-baqueira.html': 'aulas-grupo-adultos-baqueira.html',
    'aulas-de-freeride-baqueira.html': 'aulas-de-freeride-baqueira.html',
    'aulas-de-freestyle-baqueira.html': 'aulas-de-freestyle-baqueira.html',
    'aulas-tecnologia-carv-baqueira.html': 'aulas-tecnologia-carv-baqueira.html',
    'aulas-empresas-escolas-baqueira.html': 'aulas-empresas-escolas-baqueira.html',
    'aluguel-de-equipamentos-baqueira.html': 'aluguel-de-equipamentos-baqueira.html',
    'viagens-de-esqui.html': 'viagens-de-esqui.html',
    'cameras-baqueira.html': 'cameras-baqueira.html',
    'precos-tarifas-baqueira.html': 'precos-tarifas-baqueira.html',
    'sobre-nos.html': 'sobre-nos.html',
    'contato-reservas.html': 'contato-reservas.html',
    'blog.html': 'blog.html',
    'aviso-legal.html': 'aviso-legal.html',
    'politica-de-privacidade.html': 'politica-de-privacidade.html',
    'politica-de-cookies.html': 'politica-de-cookies.html',
    'politica-de-cancelamento.html': 'politica-de-cancelamento.html'
  },
  ca: {
    'index.html': 'index.html',
    'classes-desqui-baqueira.html': 'classes-desqui-baqueira.html',
    'classes-de-snowboard-baqueira.html': 'classes-de-snowboard-baqueira.html',
    'classes-particulars-nens-baqueira.html': 'classes-particulars-nens-baqueira.html',
    'classes-particulars-families-baqueira.html': 'classes-particulars-families-baqueira.html',
    'classes-particulars-adults-baqueira.html': 'classes-particulars-adults-baqueira.html',
    'classes-grup-nens-baqueira.html': 'classes-grup-nens-baqueira.html',
    'classes-grup-adults-baqueira.html': 'classes-grup-adults-baqueira.html',
    'classes-freeride-baqueira.html': 'classes-freeride-baqueira.html',
    'classes-freestyle-baqueira.html': 'classes-freestyle-baqueira.html',
    'classes-tecnologia-carv-baqueira.html': 'classes-tecnologia-carv-baqueira.html',
    'classes-empreses-escoles-baqueira.html': 'classes-empreses-escoles-baqueira.html',
    'lloguer-de-material-baqueira.html': 'lloguer-de-material-baqueira.html',
    'viatges-desqui.html': 'viatges-desqui.html',
    'cameres-baqueira.html': 'cameres-baqueira.html',
    'preus-i-tarifes-baqueira.html': 'preus-i-tarifes-baqueira.html',
    'nosaltres.html': 'nosaltres.html',
    'contacte-reserves.html': 'contacte-reserves.html',
    'blog.html': 'blog.html',
    'avis-legal.html': 'avis-legal.html',
    'politica-de-privacitat.html': 'politica-de-privacitat.html',
    'politica-de-cookies.html': 'politica-de-cookies.html',
    'politica-de-cancel-lacio.html': 'politica-de-cancel-lacio.html'
  },
  fr: {
    'index.html': 'index.html',
    'cours-de-ski-baqueira.html': 'cours-de-ski-baqueira.html',
    'cours-de-snowboard-baqueira.html': 'cours-de-snowboard-baqueira.html',
    'cours-particuliers-enfants-baqueira.html': 'cours-particuliers-enfants-baqueira.html',
    'cours-particuliers-familles-baqueira.html': 'cours-particuliers-familles-baqueira.html',
    'cours-particuliers-adultes-baqueira.html': 'cours-particuliers-adultes-baqueira.html',
    'cours-groupe-enfants-baqueira.html': 'cours-groupe-enfants-baqueira.html',
    'cours-groupe-adultes-baqueira.html': 'cours-groupe-adultes-baqueira.html',
    'cours-de-freeride-baqueira.html': 'cours-de-freeride-baqueira.html',
    'cours-de-freestyle-baqueira.html': 'cours-de-freestyle-baqueira.html',
    'cours-technologie-carv-baqueira.html': 'cours-technologie-carv-baqueira.html',
    'cours-entreprises-ecoles-baqueira.html': 'cours-entreprises-ecoles-baqueira.html',
    'location-de-materiel-baqueira.html': 'location-de-materiel-baqueira.html',
    'voyages-de-ski.html': 'voyages-de-ski.html',
    'webcams-baqueira.html': 'webcams-baqueira.html',
    'prix-et-tarifs-baqueira.html': 'prix-et-tarifs-baqueira.html',
    'a-propos-de-nous.html': 'a-propos-de-nous.html',
    'contact-reservations.html': 'contact-reservations.html',
    'blog.html': 'blog.html',
    'avis-legal.html': 'avis-legal.html',
    'politique-de-confidentialite.html': 'politique-de-confidentialite.html',
    'politique-de-cookies.html': 'politique-de-cookies.html',
    'politique-d-annulation.html': 'politique-d-annulation.html'
  }
};

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && !file.startsWith('.') && !file.startsWith('_') && file !== 'node_modules' && file !== 'blog' && file !== 'clases-esqui-baqueira' && file !== 'attached_assets') {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html') && !file.includes('deepseek') && !file.includes('~')) {
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

function isInternalLink(link) {
  return !link.startsWith('http') && 
         !link.startsWith('//') && 
         !link.startsWith('mailto:') && 
         !link.startsWith('tel:') && 
         !link.startsWith('#') &&
         !link.includes('wa.me') &&
         !link.includes('.css') &&
         !link.includes('.js') &&
         !link.includes('.png') &&
         !link.includes('.jpg') &&
         !link.includes('.webp') &&
         !link.includes('.ico') &&
         !link.includes('.svg') &&
         !link.includes('.webmanifest');
}

function checkFileExists(linkPath) {
  const cleanPath = linkPath.startsWith('/') ? linkPath.substring(1) : linkPath;
  return fs.existsSync(cleanPath);
}

const brokenLinks = [];
const allFiles = getAllHtmlFiles('.');

console.log(`\n=== Link Checker Report ===`);
console.log(`Checking ${allFiles.length} HTML files...\n`);

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const links = extractLinks(content);
  const internalLinks = links.filter(isInternalLink);
  
  internalLinks.forEach(link => {
    if (!checkFileExists(link)) {
      brokenLinks.push({
        file,
        link,
        type: 'broken'
      });
    }
  });
});

// Group broken links by file
const linksByFile = {};
brokenLinks.forEach(item => {
  if (!linksByFile[item.file]) {
    linksByFile[item.file] = [];
  }
  linksByFile[item.file].push(item.link);
});

console.log(`\n📊 Summary:`);
console.log(`Total HTML files checked: ${allFiles.length}`);
console.log(`Total broken links found: ${brokenLinks.length}`);
console.log(`Files with broken links: ${Object.keys(linksByFile).length}\n`);

if (brokenLinks.length > 0) {
  console.log(`\n❌ Broken Links by File:\n`);
  Object.keys(linksByFile).sort().forEach(file => {
    console.log(`\n${file}:`);
    linksByFile[file].forEach(link => {
      console.log(`  - ${link}`);
    });
  });
}

// Save report to JSON
const report = {
  timestamp: new Date().toISOString(),
  totalFiles: allFiles.length,
  brokenLinksCount: brokenLinks.length,
  filesWithBrokenLinks: Object.keys(linksByFile).length,
  brokenLinks: linksByFile
};

fs.writeFileSync('link-check-report.json', JSON.stringify(report, null, 2));
console.log(`\n\n✅ Full report saved to link-check-report.json`);
