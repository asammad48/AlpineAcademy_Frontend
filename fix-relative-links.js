const fs = require('fs');
const path = require('path');

let totalFixes = 0;

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║     CONVERTING RELATIVE LINKS TO ABSOLUTE PATHS            ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// URL mapping for each language
const urlMappings = {
  ca: {
    'index': '/ca/',
    'classes-desqui-baqueira': '/ca/classes-desqui-baqueira',
    'classes-de-snowboard-baqueira': '/ca/classes-de-snowboard-baqueira',
    'classes-particulars-nens-baqueira': '/ca/classes-particulars-nens-baqueira',
    'classes-particulars-families-baqueira': '/ca/classes-particulars-families-baqueira',
    'classes-particulars-adults-baqueira': '/ca/classes-particulars-adults-baqueira',
    'classes-grup-nens-baqueira': '/ca/classes-grup-nens-baqueira',
    'classes-grup-adults-baqueira': '/ca/classes-grup-adults-baqueira',
    'classes-freeride-baqueira': '/ca/classes-freeride-baqueira',
    'classes-freestyle-baqueira': '/ca/classes-freestyle-baqueira',
    'classes-tecnologia-carv-baqueira': '/ca/classes-tecnologia-carv-baqueira',
    'classes-empreses-escoles-baqueira': '/ca/classes-empreses-escoles-baqueira',
    'lloguer-de-material-baqueira': '/ca/lloguer-de-material-baqueira',
    'viatges-desqui': '/ca/viatges-desqui',
    'cameres-baqueira': '/ca/cameres-baqueira',
    'preus-i-tarifes-baqueira': '/ca/preus-i-tarifes-baqueira',
    'nosaltres': '/ca/nosaltres',
    'contacte-reserves': '/ca/contacte-reserves',
    'blog': '/ca/blog',
    'avis-legal': '/ca/avis-legal',
    'politica-de-privacitat': '/ca/politica-de-privacitat',
    'politica-de-cookies': '/ca/politica-de-cookies',
    'politica-de-cancel-lacio': '/ca/politica-de-cancel-lacio',
    
    // Handle Spanish links with proper names
    'clases-esqui-baqueira/index': '/ca/classes-desqui-baqueira',
    'clases-esqui-baqueira/grupo-ninos': '/ca/classes-grup-nens-baqueira',
    'clases-esqui-baqueira/grupo-adultos': '/ca/classes-grup-adults-baqueira',
    'clases-esqui-baqueira/empresas-colegios': '/ca/classes-empreses-escoles-baqueira',
    'clases-de-snowboard-baqueira': '/ca/classes-de-snowboard-baqueira',
    'camaras-baqueira': '/ca/cameres-baqueira',
    'alquiler-de-material-baqueira': '/ca/lloguer-de-material-baqueira',
    'precios-y-tarifas-baqueira': '/ca/preus-i-tarifes-baqueira',
    'contacto-reservas': '/ca/contacte-reserves',
    'Nosaltres': '/ca/nosaltres',
    'Viatges': '/ca/viatges-desqui',
    'aviso-legal': '/ca/avis-legal',
    'politica-de-privacidad': '/ca/politica-de-privacitat',
    'politica-de-cancelacion': '/ca/politica-de-cancel-lacio'
  },
  en: {
    'index': '/en/',
    'ski-lessons-baqueira': '/en/ski-lessons-baqueira',
    'snowboard-lessons-baqueira': '/en/snowboard-lessons-baqueira',
    'private-ski-lessons-kids-baqueira': '/en/private-ski-lessons-kids-baqueira',
    'private-ski-lessons-families-baqueira': '/en/private-ski-lessons-families-baqueira',
    'private-ski-lessons-adults-baqueira': '/en/private-ski-lessons-adults-baqueira',
    'group-ski-lessons-kids-baqueira': '/en/group-ski-lessons-kids-baqueira',
    'group-ski-lessons-adults-baqueira': '/en/group-ski-lessons-adults-baqueira',
    'freeride-ski-lessons-baqueira': '/en/freeride-ski-lessons-baqueira',
    'freestyle-ski-lessons-baqueira': '/en/freestyle-ski-lessons-baqueira',
    'private-ski-lessons-carv-baqueira': '/en/private-ski-lessons-carv-baqueira',
    'ski-lessons-companies-schools-baqueira': '/en/ski-lessons-companies-schools-baqueira',
    'ski-snowboard-rental-baqueira': '/en/ski-snowboard-rental-baqueira',
    'ski-trips': '/en/ski-trips',
    'webcams-baqueira': '/en/webcams-baqueira',
    'ski-snowboard-lessons-prices-baqueira': '/en/ski-snowboard-lessons-prices-baqueira',
    'about-us': '/en/about-us',
    'contact-booking': '/en/contact-booking',
    'blog': '/en/blog',
    'legal-notice': '/en/legal-notice',
    'privacy-policy': '/en/privacy-policy',
    'cookie-policy': '/en/cookie-policy',
    'cancellation-policy': '/en/cancellation-policy'
  },
  fr: {
    'index': '/fr/',
    'cours-de-ski-baqueira': '/fr/cours-de-ski-baqueira',
    'cours-de-snowboard-baqueira': '/fr/cours-de-snowboard-baqueira',
    'cours-particuliers-enfants-baqueira': '/fr/cours-particuliers-enfants-baqueira',
    'cours-particuliers-familles-baqueira': '/fr/cours-particuliers-familles-baqueira',
    'cours-particuliers-adultes-baqueira': '/fr/cours-particuliers-adultes-baqueira',
    'cours-groupe-enfants-baqueira': '/fr/cours-groupe-enfants-baqueira',
    'cours-groupe-adultes-baqueira': '/fr/cours-groupe-adultes-baqueira',
    'cours-freeride-baqueira': '/fr/cours-freeride-baqueira',
    'cours-freestyle-baqueira': '/fr/cours-freestyle-baqueira',
    'cours-technologie-carv-baqueira': '/fr/cours-technologie-carv-baqueira',
    'cours-entreprises-ecoles-baqueira': '/fr/cours-entreprises-ecoles-baqueira',
    'location-de-materiel-baqueira': '/fr/location-de-materiel-baqueira',
    'voyages-de-ski': '/fr/voyages-de-ski',
    'webcams-baqueira': '/fr/cameras-baqueira',
    'prix-et-tarifs-baqueira': '/fr/prix-et-tarifs-baqueira',
    'a-propos-de-nous': '/fr/a-propos-de-nous',
    'contact-reservations': '/fr/contact-reservations',
    'blog': '/fr/blog',
    'avis-legal': '/fr/mentions-legales',
    'politique-de-confidentialite': '/fr/politique-de-confidentialite',
    'politique-de-cookies': '/fr/politique-de-cookies',
    "politique-d-annulation": "/fr/politique-dannulation"
  },
  pt: {
    'index': '/pt/',
    'aulas-de-esqui-baqueira': '/pt/aulas-de-esqui-baqueira',
    'aulas-de-snowboard-baqueira': '/pt/aulas-de-snowboard-baqueira',
    'aulas-particulares-criancas-baqueira': '/pt/aulas-particulares-criancas-baqueira',
    'aulas-particulares-familias-baqueira': '/pt/aulas-particulares-familias-baqueira',
    'aulas-particulares-adultos-baqueira': '/pt/aulas-particulares-adultos-baqueira',
    'aulas-grupo-criancas-baqueira': '/pt/aulas-grupo-criancas-baqueira',
    'aulas-grupo-adultos-baqueira': '/pt/aulas-grupo-adultos-baqueira',
    'aulas-freeride-baqueira': '/pt/aulas-freeride-baqueira',
    'aulas-freestyle-baqueira': '/pt/aulas-freestyle-baqueira',
    'aulas-tecnologia-carv-baqueira': '/pt/aulas-tecnologia-carv-baqueira',
    'aulas-empresas-escolas-baqueira': '/pt/aulas-empresas-escolas-baqueira',
    'aluguel-de-equipamento-baqueira': '/pt/aluguel-de-equipamento-baqueira',
    'viagens-de-esqui': '/pt/viagens-de-esqui',
    'cameras-baqueira': '/pt/cameras-baqueira',
    'precos-e-tarifas-baqueira': '/pt/precos-e-tarifas-baqueira',
    'sobre-nos': '/pt/sobre-nos',
    'contato-reservas': '/pt/contato-reservas',
    'blog': '/pt/blog',
    'aviso-legal': '/pt/aviso-legal',
    'politica-de-privacidade': '/pt/politica-de-privacidade',
    'politica-de-cookies': '/pt/politica-de-cookies',
    'politica-de-cancelamento': '/pt/politica-de-cancelamento'
  }
};

function fixLinksInFile(filePath, lang) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let fileFixCount = 0;
  
  const mapping = urlMappings[lang];
  if (!mapping) return 0;
  
  // Fix all relative links like ../page-name or ../folder/page
  Object.keys(mapping).forEach(key => {
    const targetUrl = mapping[key];
    
    // Pattern 1: href="../page-name"
    const pattern1 = new RegExp(`href="\\.\\.\/${escapeRegex(key)}"`, 'g');
    if (content.match(pattern1)) {
      content = content.replace(pattern1, `href="${targetUrl}"`);
      modified = true;
      fileFixCount++;
    }
    
    // Pattern 2: href="../folder/page"
    const pattern2 = new RegExp(`href="\\.\\.\/${escapeRegex(key)}"`, 'g');
    if (content.match(pattern2)) {
      content = content.replace(pattern2, `href="${targetUrl}"`);
      modified = true;
      fileFixCount++;
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✅ ${filePath} - Fixed ${fileFixCount} links`);
    return fileFixCount;
  }
  
  return 0;
}

// Process all language blog files
const languages = ['ca', 'en', 'fr', 'pt'];

languages.forEach(lang => {
  console.log(`\n📝 Processing ${lang.toUpperCase()} blog files...`);
  const blogDir = `${lang}/blog`;
  
  if (!fs.existsSync(blogDir)) {
    console.log(`  ⏭️  No blog directory found for ${lang}`);
    return;
  }
  
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));
  
  files.forEach(file => {
    const filePath = `${blogDir}/${file}`;
    const fixes = fixLinksInFile(filePath, lang);
    totalFixes += fixes;
  });
});

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`\n🎉 COMPLETE! Total relative links converted: ${totalFixes}\n`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
