#!/usr/bin/env python3
"""
Comprehensive link checker for HTML files.
Checks for broken links (404s) in href and src attributes.
"""

import os
import re
from pathlib import Path
from urllib.parse import urlparse, unquote
from collections import defaultdict

def is_external_link(url):
    """Check if a link is external (has a protocol)."""
    return bool(urlparse(url).scheme)

def normalize_path(current_file, link):
    """
    Normalize a relative path to an absolute path.
    current_file: path to the HTML file containing the link
    link: the href or src value
    """
    # Remove query strings and anchors
    link = link.split('?')[0].split('#')[0]
    
    if not link or link == '/':
        return None
    
    # If it's an absolute path (starts with /)
    if link.startswith('/'):
        # Remove leading slash and treat as relative to project root
        return Path(link[1:])
    
    # Relative path
    current_dir = Path(current_file).parent
    return (current_dir / link).resolve()

def extract_links(html_content):
    """Extract all href and src links from HTML content."""
    links = []
    
    # Extract href attributes
    href_pattern = r'href=["\']([^"\']+)["\']'
    links.extend(re.findall(href_pattern, html_content))
    
    # Extract src attributes
    src_pattern = r'src=["\']([^"\']+)["\']'
    links.extend(re.findall(src_pattern, html_content))
    
    return links

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

def main():
    """Main function to check links."""
    print("Starting link verification...")
    print("=" * 70)
    
    html_files = find_all_html_files()
    print(f"Found {len(html_files)} HTML files to check\n")
    
    broken_links = []
    external_links = set()
    stats = {
        'files_checked': 0,
        'total_links': 0,
        'broken_links': 0,
        'external_links': 0,
        'valid_links': 0
    }
    
    # Check each file
    for file_path in html_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            links = extract_links(content)
            stats['total_links'] += len(links)
            
            for link in links:
                # Skip empty, mailto, tel, and JavaScript links
                if not link or link.startswith(('mailto:', 'tel:', 'javascript:', '#', 'data:')):
                    continue
                
                # Check if external
                if is_external_link(link):
                    external_links.add(link)
                    stats['external_links'] += 1
                    continue
                
                # Check if file exists
                target_path = normalize_path(file_path, link)
                
                if target_path and not target_path.exists():
                    broken_links.append({
                        'file': file_path,
                        'link': link,
                        'resolved_path': str(target_path)
                    })
                    stats['broken_links'] += 1
                else:
                    stats['valid_links'] += 1
            
            stats['files_checked'] += 1
            
        except Exception as e:
            print(f"✗ Error checking {file_path}: {e}")
    
    # Print results
    print("\n" + "=" * 70)
    print("SUMMARY")
    print("=" * 70)
    print(f"Files checked: {stats['files_checked']}")
    print(f"Total links found: {stats['total_links']}")
    print(f"Valid internal links: {stats['valid_links']}")
    print(f"External links: {stats['external_links']}")
    print(f"Broken links (404s): {stats['broken_links']}")
    
    # Print broken links
    if broken_links:
        print("\n" + "=" * 70)
        print("BROKEN LINKS (404 ERRORS)")
        print("=" * 70)
        
        # Group by file for better readability
        by_file = defaultdict(list)
        for item in broken_links:
            by_file[item['file']].append(item)
        
        for file_path in sorted(by_file.keys()):
            print(f"\n{file_path}:")
            for item in by_file[file_path]:
                print(f"  ✗ {item['link']}")
                print(f"    → Resolved to: {item['resolved_path']}")
    else:
        print("\n✓ No broken links found!")
    
    # Print some common external links for reference
    if external_links:
        print("\n" + "=" * 70)
        print("EXTERNAL LINKS (Sample - first 10)")
        print("=" * 70)
        for link in sorted(list(external_links))[:10]:
            print(f"  • {link}")
        if len(external_links) > 10:
            print(f"  ... and {len(external_links) - 10} more")
    
    print("\n" + "=" * 70)
    print("Link verification completed!")
    print("=" * 70)
    
    return stats['broken_links'] == 0

if __name__ == '__main__':
    success = main()
    exit(0 if success else 1)
