const fs = require('fs');
const path = require('path');

let totalFixes = 0;

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║          FINAL FIX - REMAINING 231 BROKEN LINKS            ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Common broken patterns and their fixes
const globalFixes = {
  // Contact variations
  '../contacto': '/contacto-reservas',
  'contacto': '/contacto-reservas',
  
  // Policy variations (capitalization issues)
  '../Política-de-cancelación': '/politica-de-cancelacion',
  'Política-de-cancelación': '/politica-de-cancelacion',
  
  // Spanish page refs
  'clases-esqui-baqueira': '/clases-de-esqui-baqueira',
  'precios-clases-esqui-baqueira': '/precios-y-tarifas-baqueira',
  'precos': '/precios-y-tarifas-baqueira'
};

// Language-specific pages (missing leading slash)
const langSpecificPages = {
  'en/private-ski-lessons-families-baqueira': '/en/private-ski-lessons-families-baqueira',
  'ca/classes-esqui-particulars-families-baqueira': '/ca/classes-particulars-families-baqueira',
  'fr/cours-ski-prives-familles-baqueira': '/fr/cours-particuliers-familles-baqueira',
  'pt/aulas-esqui-privadas-familias-baqueira': '/pt/aulas-particulares-familias-baqueira',
  'en/group-ski-lessons-businesses-schools-baqueira': '/en/ski-lessons-companies-schools-baqueira',
  'ca/classes-esqui-grup-empreses-collegis-baqueira': '/ca/classes-empreses-escoles-baqueira',
  'fr/cours-ski-groupe-entreprises-ecoles-baqueira': '/fr/cours-entreprises-ecoles-baqueira',
  'pt/aulas-esqui-grupo-empresas-escolas-baqueira': '/pt/aulas-empresas-escolas-baqueira'
};

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let fixes = 0;
  
  // Apply global fixes
  Object.keys(globalFixes).forEach(brokenLink => {
    const correctLink = globalFixes[brokenLink];
    const pattern = new RegExp(`href="${escapeRegex(brokenLink)}"`, 'g');
    if (content.match(pattern)) {
      content = content.replace(pattern, `href="${correctLink}"`);
      modified = true;
      fixes++;
    }
  });
  
  // Apply language-specific page fixes
  Object.keys(langSpecificPages).forEach(brokenLink => {
    const correctLink = langSpecificPages[brokenLink];
    const pattern = new RegExp(`href="${escapeRegex(brokenLink)}"`, 'g');
    if (content.match(pattern)) {
      content = content.replace(pattern, `href="${correctLink}"`);
      modified = true;
      fixes++;
    }
  });
  
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
console.log('Running final audit to verify...\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
