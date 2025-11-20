const fs = require('fs');
const path = require('path');

// Define the link text and URLs for each language
const linksByLanguage = {
  'es': {
    text: 'Clases de Esquí',
    url: '/clases-de-esqui-baqueira.html',
    comment: '<!-- Opción principal -->'
  },
  'en': {
    text: 'Ski Lessons',
    url: '/en/ski-lessons-baqueira.html',
    comment: '<!-- Main option -->'
  },
  'pt': {
    text: 'Aulas de Esqui',
    url: '/pt/aulas-de-esqui-baqueira.html',
    comment: '<!-- Opção principal -->'
  },
  'ca': {
    text: 'Classes d\'Esquí',
    url: '/ca/classes-desqui-baqueira.html',
    comment: '<!-- Opció principal -->'
  },
  'fr': {
    text: 'Cours de Ski',
    url: '/fr/cours-de-ski-baqueira.html',
    comment: '<!-- Option principale -->'
  }
};

// Function to determine language from file path
function getLanguageFromPath(filePath) {
  // First check directory-based language paths
  if (filePath.startsWith('en/') || filePath.startsWith('./en/')) {
    return 'en';
  } else if (filePath.startsWith('pt/') || filePath.startsWith('./pt/')) {
    return 'pt';
  } else if (filePath.startsWith('ca/') || filePath.startsWith('./ca/')) {
    return 'ca';
  } else if (filePath.startsWith('fr/') || filePath.startsWith('./fr/')) {
    return 'fr';
  }
  
  // Check for language suffix in filename (e.g., file-en.html, file-pt.html)
  const fileName = path.basename(filePath);
  if (fileName.includes('-en.html') || fileName.includes('_en.html')) {
    return 'en';
  } else if (fileName.includes('-pt.html') || fileName.includes('_pt.html')) {
    return 'pt';
  } else if (fileName.includes('-ca.html') || fileName.includes('_ca.html')) {
    return 'ca';
  } else if (fileName.includes('-fr.html') || fileName.includes('_fr.html')) {
    return 'fr';
  }
  
  return 'es'; // Default to Spanish for root files
}

// Function to add ski lessons link to a file
function addSkiLessonsLink(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if the file has the ski lessons dropdown
    if (!content.includes('aria-labelledby="skiLessonsDropdown"')) {
      return { success: false, reason: 'No ski lessons dropdown found' };
    }
    
    // Check if the link is already added
    const lang = getLanguageFromPath(filePath);
    const linkConfig = linksByLanguage[lang];
    
    if (content.includes(`href="${linkConfig.url}">${linkConfig.text}</a>`)) {
      return { success: false, reason: 'Link already exists' };
    }
    
    // Find the dropdown menu opening tag and add the link after it
    const dropdownPattern = /(<ul class="dropdown-menu" aria-labelledby="skiLessonsDropdown">)/;
    
    if (!dropdownPattern.test(content)) {
      return { success: false, reason: 'Dropdown pattern not found' };
    }
    
    // Create the new link HTML with proper indentation
    const newLinkHTML = `
                            ${linkConfig.comment}
                            <li><a class="dropdown-item" href="${linkConfig.url}">${linkConfig.text}</a></li>
                            <li><hr class="dropdown-divider"></li>`;
    
    // Replace the dropdown opening tag with the tag + new link
    const updatedContent = content.replace(
      dropdownPattern,
      `$1${newLinkHTML}`
    );
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    
    return { success: true, reason: 'Link added successfully' };
  } catch (error) {
    return { success: false, reason: error.message };
  }
}

// Function to recursively find all HTML files
function findHTMLFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip certain directories
      if (!file.startsWith('.') && !file.startsWith('_') && file !== 'node_modules') {
        findHTMLFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Main execution
console.log('Starting to add ski lessons links to all HTML files...\n');

const allHTMLFiles = findHTMLFiles('.');
console.log(`Found ${allHTMLFiles.length} HTML files\n`);

let successCount = 0;
let skippedCount = 0;
let errorCount = 0;

const results = {
  success: [],
  alreadyExists: [],
  noDropdown: [],
  errors: []
};

allHTMLFiles.forEach(file => {
  const result = addSkiLessonsLink(file);
  
  if (result.success) {
    successCount++;
    results.success.push(file);
  } else {
    if (result.reason === 'Link already exists') {
      skippedCount++;
      results.alreadyExists.push(file);
    } else if (result.reason === 'No ski lessons dropdown found') {
      skippedCount++;
      results.noDropdown.push(file);
    } else {
      errorCount++;
      results.errors.push({ file, reason: result.reason });
    }
  }
});

console.log('=== RESULTS ===');
console.log(`✅ Successfully added: ${successCount} files`);
console.log(`⏭️  Skipped (already exists): ${results.alreadyExists.length} files`);
console.log(`⏭️  Skipped (no dropdown): ${results.noDropdown.length} files`);
console.log(`❌ Errors: ${errorCount} files\n`);

if (results.success.length > 0) {
  console.log('Successfully updated files:');
  results.success.forEach(f => console.log(`  - ${f}`));
  console.log('');
}

if (results.errors.length > 0) {
  console.log('Errors:');
  results.errors.forEach(e => console.log(`  - ${e.file}: ${e.reason}`));
  console.log('');
}

console.log('Done!');
