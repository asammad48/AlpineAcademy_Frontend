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

// Function to remove .html from internal links
function removeHtmlExtensions(content) {
    // Replace href attributes ending with .html
    // Match: href="path/to/file.html" or href='path/to/file.html'
    // Don't modify external links (http://, https://, mailto:, tel:, #)
    
    let modified = content;
    
    // Pattern 1: href="something.html" (double quotes)
    modified = modified.replace(/href="([^"]*?)\.html"/g, (match, path) => {
        // Don't modify if it's an external link or anchor
        if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('mailto:') || path.startsWith('tel:') || path.startsWith('#')) {
            return match;
        }
        return `href="${path}"`;
    });
    
    // Pattern 2: href='something.html' (single quotes)
    modified = modified.replace(/href='([^']*?)\.html'/g, (match, path) => {
        // Don't modify if it's an external link or anchor
        if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('mailto:') || path.startsWith('tel:') || path.startsWith('#')) {
            return match;
        }
        return `href='${path}'`;
    });
    
    return modified;
}

// Main execution
console.log('Finding all HTML files...');
const htmlFiles = findHtmlFiles('.');

console.log(`Found ${htmlFiles.length} HTML files`);
console.log('Processing files...\n');

let processedCount = 0;
let modifiedCount = 0;

htmlFiles.forEach(filePath => {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const modified = removeHtmlExtensions(content);
        
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
console.log('\nDone! All .html extensions have been removed from internal links.');
