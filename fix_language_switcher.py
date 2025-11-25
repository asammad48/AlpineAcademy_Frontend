#!/usr/bin/env python3
import re
import os
from pathlib import Path

def fix_language_switcher(file_path):
    """Fix language switcher hrefs in an HTML file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Pattern to match language-option links with any href
        # This matches: <a class="dropdown-item ... language-option" href="anything" data-lang="...">
        pattern = r'(<a\s+class="[^"]*language-option[^"]*"\s+href=")[^"]*(")'
        
        # Replace with href="#"
        content = re.sub(pattern, r'\1#\2', content)
        
        # Also handle reversed attribute order: href comes before class
        pattern2 = r'(<a\s+[^>]*)(href=")[^"]*(")(.*?class="[^"]*language-option[^"]*")'
        content = re.sub(pattern2, r'\1\2#\3\4', content)
        
        # Handle cases where there are other attributes between href and class
        # More comprehensive regex to catch all variants
        def fix_link(match):
            full_match = match.group(0)
            # If this is a language-option link, ensure href="#"
            if 'language-option' in full_match:
                # Replace any href value with #
                fixed = re.sub(r'href="[^"]*"', 'href="#"', full_match)
                return fixed
            return full_match
        
        # Match any <a> tag that contains language-option class
        pattern3 = r'<a[^>]*language-option[^>]*>'
        content = re.sub(pattern3, fix_link, content)
        
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
        
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    # Find all HTML files excluding backup folders
    html_files = []
    
    for root, dirs, files in os.walk('.'):
        # Exclude backup directories
        dirs[:] = [d for d in dirs if d not in ['_old_files_backup', 'clases-esqui-baqueira']]
        
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    
    print(f"Found {len(html_files)} HTML files to process")
    
    fixed_count = 0
    for file_path in sorted(html_files):
        if fix_language_switcher(file_path):
            fixed_count += 1
            print(f"Fixed: {file_path}")
    
    print(f"\nTotal files processed: {len(html_files)}")
    print(f"Files modified: {fixed_count}")

if __name__ == '__main__':
    main()
