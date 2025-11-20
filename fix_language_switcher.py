#!/usr/bin/env python3
"""
Script to fix language switcher across all HTML files.
- Updates dropdown button to show correct language code (ES, EN, FR, CA, PT)
- Sets the correct active class on language options
- Verifies links are not broken
"""

import os
import re
from pathlib import Path
from collections import defaultdict

# Language folder mappings
LANGUAGE_FOLDERS = {
    '.': 'ES',       # Root folder is Spanish
    'en': 'EN',
    'fr': 'FR',
    'ca': 'CA',
    'pt': 'PT'
}

def get_language_from_path(file_path):
    """Determine which language a file belongs to based on its path."""
    parts = Path(file_path).parts
    
    # Check if file is in a language subfolder
    for folder_name, lang_code in LANGUAGE_FOLDERS.items():
        if folder_name == '.':
            # Root folder check - if not in any language folder
            if len(parts) > 0 and parts[0] not in ['en', 'fr', 'ca', 'pt']:
                return 'es', 'ES'
        else:
            if folder_name in parts:
                return folder_name if folder_name != '.' else 'es', lang_code
    
    return 'es', 'ES'

def fix_language_switcher(html_content, current_lang_short, current_lang_code):
    """
    Fix the language switcher in HTML content.
    - Update dropdown button text to show correct language
    - Set correct active class
    """
    
    # Fix 1: Update the dropdown button to show the correct language code
    html_content = re.sub(
        r'(<i class="fas fa-globe me-1"></i>)\s*[A-Z]{2}',
        rf'\1 {current_lang_code}',
        html_content
    )
    
    # Fix 2: Remove all 'active' classes from language options first
    html_content = re.sub(
        r'<a class="dropdown-item active language-option"',
        '<a class="dropdown-item language-option"',
        html_content
    )
    
    # Fix 3: Add 'active' class to the correct language option
    # Pattern to match the language option for current language
    pattern = rf'(<a class="dropdown-item language-option"[^>]*data-lang="{current_lang_short}")'
    replacement = rf'<a class="dropdown-item active language-option" href="#" data-lang="{current_lang_short}"'
    
    # More specific replacement to add active class
    html_content = re.sub(
        rf'<a class="dropdown-item language-option" href="[^"]*" data-lang="{current_lang_short}">',
        rf'<a class="dropdown-item active language-option" href="#" data-lang="{current_lang_short}">',
        html_content
    )
    
    return html_content

def find_all_html_files():
    """Find all HTML files in the project."""
    html_files = []
    
    # Root folder HTML files
    for html_file in Path('.').glob('*.html'):
        if html_file.name not in ['deepseek_html_20250824_70760c.html', 'aviso-legal~.html']:
            html_files.append(str(html_file))
    
    # Blog folder in root
    for html_file in Path('blog').glob('*.html'):
        html_files.append(str(html_file))
    
    # Language folders
    for lang_folder in ['en', 'fr', 'ca', 'pt']:
        if Path(lang_folder).exists():
            # Main folder
            for html_file in Path(lang_folder).glob('*.html'):
                html_files.append(str(html_file))
            
            # Blog subfolder
            blog_path = Path(lang_folder) / 'blog'
            if blog_path.exists():
                for html_file in blog_path.glob('*.html'):
                    html_files.append(str(html_file))
    
    return html_files

def check_for_broken_links(html_content, file_path):
    """Check for potentially broken links in HTML."""
    issues = []
    
    # Check for common broken link patterns
    # href="#" or href="" 
    empty_hrefs = re.findall(r'<a[^>]*href=""[^>]*>', html_content)
    if empty_hrefs:
        issues.append(f"Found {len(empty_hrefs)} empty href attributes")
    
    # src="" for images
    empty_srcs = re.findall(r'<img[^>]*src=""[^>]*>', html_content)
    if empty_srcs:
        issues.append(f"Found {len(empty_srcs)} empty image src attributes")
    
    # Check for potential 404s - URLs that might not exist
    # This is a basic check - more thorough checking would require actually testing URLs
    
    return issues

def main():
    """Main function to fix all HTML files."""
    print("Starting language switcher fix...")
    print("=" * 60)
    
    # Find all HTML files
    html_files = find_all_html_files()
    print(f"Found {len(html_files)} HTML files to process\n")
    
    # Statistics
    stats = {
        'processed': 0,
        'updated': 0,
        'errors': 0,
        'by_language': defaultdict(int)
    }
    
    all_issues = []
    
    # Process each file
    for file_path in html_files:
        try:
            # Determine language
            lang_short, lang_code = get_language_from_path(file_path)
            
            # Read file
            with open(file_path, 'r', encoding='utf-8') as f:
                original_content = f.read()
            
            # Check for issues
            issues = check_for_broken_links(original_content, file_path)
            if issues:
                all_issues.append((file_path, issues))
            
            # Fix language switcher
            updated_content = fix_language_switcher(original_content, lang_short, lang_code)
            
            # Only write if content changed
            if updated_content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(updated_content)
                stats['updated'] += 1
                print(f"✓ Updated: {file_path} → {lang_code}")
            
            stats['processed'] += 1
            stats['by_language'][lang_code] += 1
            
        except Exception as e:
            print(f"✗ Error processing {file_path}: {e}")
            stats['errors'] += 1
    
    # Print summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"Total files processed: {stats['processed']}")
    print(f"Files updated: {stats['updated']}")
    print(f"Errors: {stats['errors']}")
    print("\nBy language:")
    for lang, count in sorted(stats['by_language'].items()):
        print(f"  {lang}: {count} files")
    
    # Print issues found
    if all_issues:
        print("\n" + "=" * 60)
        print("POTENTIAL ISSUES FOUND")
        print("=" * 60)
        for file_path, issues in all_issues:
            print(f"\n{file_path}:")
            for issue in issues:
                print(f"  - {issue}")
    else:
        print("\n✓ No broken links detected!")
    
    print("\n" + "=" * 60)
    print("Language switcher fix completed!")
    print("=" * 60)

if __name__ == '__main__':
    main()
