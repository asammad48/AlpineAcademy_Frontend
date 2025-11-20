const fs = require('fs');
const path = require('path');

// Common link fixes
const linkFixes = {
  // Fix cross-language references in Portuguese files
  '/es/sobre-nosotros.html': '/pt/sobre-nos.html',
  '/es/precios-y-tarifas-baqueira.html': '/pt/precos-e-tarifas-baqueira.html',
  '/es/viajes-de-esqui.html': '/pt/viagens-de-esqui.html',
  '/es/politica-de-cookies.html': '/pt/politica-de-cookies.html',
  '/es/politica-de-privacidad.html': '/pt/politica-de-privacidade.html',
  '/en/prices-and-rates-baqueira.html': '/pt/precos-e-tarifas-baqueira.html',
  
  // Fix malformed links
  '/fr/cours de ski': '/fr/cours-de-ski-baqueira.html',
  '/fr/ou snow': '/fr/cours-de-snowboard-baqueira.html',
  '/pt/aulas-de-esqui': '/pt/aulas-de-esqui-baqueira.html',
  '/pt/aulas-de-snowboard': '/pt/aulas-de-snowboard-baqueira.html',
  
  // Fix incorrect file references
  "/fr/Politique-d'annulation.html": '/fr/politique-dannulation.html',
  '/fr/Politique-d': '/fr/politique-dannulation.html',
  '/fr/aulas-esqui-grupo-empresas-escolas-baqueira.html': '/fr/cours-entreprises-ecoles-baqueira.html',
  '/fr/classes-esqui-grup-empreses-collegis-baqueira.html': '/fr/cours-entreprises-ecoles-baqueira.html',
  '/fr/group-ski-lessons-businesses-schools-baqueira.html': '/fr/cours-entreprises-ecoles-baqueira.html',
  '/fr/clases-esqui-baqueira.html': '/fr/cours-de-ski-baqueira.html',
  
  '/pt/group-ski-lessons-businesses-schools-baqueira.html': '/pt/aulas-empresas-escolas-baqueira.html',
  '/pt/classes-esqui-grup-empreses-collegis-baqueira.html': '/pt/aulas-empresas-escolas-baqueira.html',
  '/pt/cours-ski-groupe-entreprises-ecoles-baqueira.html': '/pt/aulas-empresas-escolas-baqueira.html',
  '/pt/aulas-esqui-baqueira.html': '/pt/aulas-de-esqui-baqueira.html',
  
  '/ca/classes-particulars-carv-baqueira.html': '/ca/classes-tecnologia-carv-baqueira.html',
  
  '/en/classes-esqui-grup-empreses-collegis-baqueira.html': '/en/ski-lessons-companies-schools-baqueira.html',
  '/en/cours-ski-groupe-entreprises-ecoles-baqueira.html': '/en/ski-lessons-companies-schools-baqueira.html',
  '/en/aulas-esqui-grupo-empresas-escolas-baqueira.html': '/en/ski-lessons-companies-schools-baqueira.html',
  '/en/clases-esqui-baqueira.html': '/en/ski-lessons-baqueira.html',
  
  '/ca/group-ski-lessons-businesses-schools-baqueira.html': '/ca/classes-empreses-escoles-baqueira.html',
  '/ca/cours-ski-groupe-entreprises-ecoles-baqueira.html': '/ca/classes-empreses-escoles-baqueira.html',
  '/ca/aulas-esqui-grupo-empresas-escolas-baqueira.html': '/ca/classes-empreses-escoles-baqueira.html',
  '/ca/clases-esqui-baqueira.html': '/ca/classes-desqui-baqueira.html'
};

function fixFileLinks(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  const originalContent = content;

  // Apply all link fixes
  for (const [wrongLink, correctLink] of Object.entries(linkFixes)) {
    // Escape special regex characters
    const escapedWrong = wrongLink.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`(href|src)=["']${escapedWrong}(["'])`, 'g');
    
    if (content.includes(wrongLink)) {
      content = content.replace(pattern, `$1="${correctLink}$2`);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${filePath}`);
    return 1;
  }
  
  return 0;
}

// Find all HTML files
function getHTMLFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

const htmlFiles = [
  ...getHTMLFiles('.'),
  ...getHTMLFiles('en'),
  ...getHTMLFiles('ca'),
  ...getHTMLFiles('fr'),
  ...getHTMLFiles('pt')
];

console.log(`Found ${htmlFiles.length} HTML files to process`);

let totalFixed = 0;
htmlFiles.forEach(file => {
  totalFixed += fixFileLinks(file);
});

console.log(`\n✓ Fixed ${totalFixed} files with broken links`);
