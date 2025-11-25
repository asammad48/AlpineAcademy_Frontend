#!/usr/bin/env python3
"""
Script to update all language-option links to use href="#"
"""
import re
import os
from pathlib import Path

def fix_language_option_links(file_path):
    """Fix language-option href attributes in an HTML file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Pattern to match language-option links with href attributes that are not "#"
    # This handles variations like:
    # - class="dropdown-item language-option"
    # - class="dropdown-item active language-option"
    # - class="language-option dropdown-item"
    pattern = r'(<a\s+class="[^"]*language-option[^"]*"\s+)href="[^"#][^"]*"'
    replacement = r'\1href="#"'
    
    content = re.sub(pattern, replacement, content)
    
    # Also handle the reverse order (href before class)
    pattern2 = r'(<a\s+)href="[^"#][^"]*"(\s+class="[^"]*language-option[^"]*")'
    replacement2 = r'\1href="#"\2'
    
    content = re.sub(pattern2, replacement2, content)
    
    # Check if any changes were made
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    """Main function to process all HTML files"""
    # Directories to exclude
    exclude_dirs = {'_old_files_backup', 'clases-esqui-baqueira', 'attached_assets', '.git', 'node_modules'}
    
    files_updated = 0
    total_files = 0
    
    # Find all HTML files
    for html_file in Path('.').rglob('*.html'):
        # Skip excluded directories
        if any(excluded in html_file.parts for excluded in exclude_dirs):
            continue
        
        total_files += 1
        if fix_language_option_links(html_file):
            files_updated += 1
            print(f"Updated: {html_file}")
    
    print(f"\nSummary:")
    print(f"Total HTML files processed: {total_files}")
    print(f"Files updated: {files_updated}")
    print(f"Files unchanged: {total_files - files_updated}")

if __name__ == "__main__":
    main()
