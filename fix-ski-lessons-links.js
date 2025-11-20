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

// Function to fix ski lessons link in a file
function fixSkiLessonsLink(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if the file has the ski lessons dropdown
    if (!content.includes('aria-labelledby="skiLessonsDropdown"')) {
      return { success: false, reason: 'No ski lessons dropdown found' };
    }
    
    const lang = getLanguageFromPath(filePath);
    const correctLinkConfig = linksByLanguage[lang];
    
    // Check if the correct link already exists
    if (content.includes(`href="${correctLinkConfig.url}">${correctLinkConfig.text}</a>`)) {
      return { success: false, reason: 'Correct link already exists' };
    }
    
    // Remove any existing ski lessons link that was added (look for the pattern with comment and divider)
    let updatedContent = content;
    
    // Remove all possible incorrect links
    Object.values(linksByLanguage).forEach(linkConfig => {
      const linkPattern = new RegExp(
        `\\s*${linkConfig.comment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\n` +
        `\\s*<li><a class="dropdown-item" href="${linkConfig.url.replace(/\//g, '\\/')}">${linkConfig.text.replace(/'/g, "\\'")}<\\/a><\\/li>\\s*\\n` +
        `\\s*<li><hr class="dropdown-divider"><\\/li>`,
        'g'
      );
      updatedContent = updatedContent.replace(linkPattern, '');
    });
    
    // Now add the correct link
    const dropdownPattern = /(<ul class="dropdown-menu" aria-labelledby="skiLessonsDropdown">)/;
    
    if (!dropdownPattern.test(updatedContent)) {
      return { success: false, reason: 'Dropdown pattern not found' };
    }
    
    // Create the new link HTML with proper indentation
    const newLinkHTML = `
                            ${correctLinkConfig.comment}
                            <li><a class="dropdown-item" href="${correctLinkConfig.url}">${correctLinkConfig.text}</a></li>
                            <li><hr class="dropdown-divider"></li>`;
    
    // Replace the dropdown opening tag with the tag + new link
    updatedContent = updatedContent.replace(
      dropdownPattern,
      `$1${newLinkHTML}`
    );
    
    // Only write if content changed
    if (updatedContent !== content) {
      fs.writeFileSync(filePath, updatedContent, 'utf-8');
      return { success: true, reason: 'Link fixed successfully' };
    }
    
    return { success: false, reason: 'No changes needed' };
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
console.log('Fixing ski lessons links in all HTML files...\n');

const allHTMLFiles = findHTMLFiles('.');
console.log(`Found ${allHTMLFiles.length} HTML files\n`);

let successCount = 0;
let skippedCount = 0;

const results = {
  success: [],
  skipped: []
};

allHTMLFiles.forEach(file => {
  const result = fixSkiLessonsLink(file);
  
  if (result.success) {
    successCount++;
    results.success.push(file);
  } else {
    skippedCount++;
    results.skipped.push({ file, reason: result.reason });
  }
});

console.log('=== RESULTS ===');
console.log(`✅ Successfully fixed: ${successCount} files`);
console.log(`⏭️  Skipped: ${skippedCount} files\n`);

if (results.success.length > 0 && results.success.length <= 20) {
  console.log('Fixed files:');
  results.success.forEach(f => console.log(`  - ${f}`));
  console.log('');
} else if (results.success.length > 20) {
  console.log(`Fixed ${results.success.length} files (list truncated for brevity)\n`);
}

console.log('Done!');
