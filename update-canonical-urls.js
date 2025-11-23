const fs = require('fs');
const path = require('path');

// Function to recursively find all HTML files
function findHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            // Skip _old_files_backup directory
            if (file !== '_old_files_backup' && file !== 'node_modules' && file !== '.git') {
                findHtmlFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

// Function to remove .html from canonical URLs
function updateCanonicalUrls(content) {
    // Replace canonical URLs ending with .html
    // Match: <link rel="canonical" href="...anything.html">
    
    let modified = content;
    
    // Pattern: canonical links with .html
    modified = modified.replace(/(<link\s+rel="canonical"\s+href="https?:\/\/[^"]*?)\.html(")/g, '$1$2');
    
    return modified;
}

// Main execution
console.log('Finding all HTML files...');
const htmlFiles = findHtmlFiles('.');

console.log(`Found ${htmlFiles.length} HTML files`);
console.log('Updating canonical URLs...\n');

let processedCount = 0;
let modifiedCount = 0;

htmlFiles.forEach(filePath => {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const modified = updateCanonicalUrls(content);
        
        if (content !== modified) {
            fs.writeFileSync(filePath, modified, 'utf8');
            console.log(`✓ Modified: ${filePath}`);
            modifiedCount++;
        }
        processedCount++;
    } catch (error) {
        console.error(`✗ Error processing ${filePath}:`, error.message);
    }
});

console.log(`\n✓ Processed ${processedCount} files`);
console.log(`✓ Modified ${modifiedCount} files`);
console.log('\nDone! All canonical URLs have been updated to clean URLs.');
