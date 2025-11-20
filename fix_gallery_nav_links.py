#!/usr/bin/env python3
"""Fix all Galería/Gallery navigation links to point to galeria.html instead of blog.html"""

import os
import re
from pathlib import Path

def fix_nav_links_in_file(file_path):
    """Fix gallery navigation links in a single file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Fix Spanish pages (root and blog)
    content = content.replace('href="/blog.html">Galería</a>', 'href="/galeria.html">Galería</a>')
    content = content.replace('href="../blog.html">Galería</a>', 'href="../galeria.html">Galería</a>')
    
    # Fix English pages
    content = content.replace('href="/en/blog.html">Gallery</a>', 'href="/en/gallery.html">Gallery</a>')
    content = content.replace('href="../blog.html">Gallery</a>', 'href="../gallery.html">Gallery</a>')
    
    # Fix Catalan pages
    content = content.replace('href="/ca/blog.html">Galeria</a>', 'href="/ca/galeria.html">Galeria</a>')
    content = content.replace('href="../blog.html">Galeria</a>', 'href="../galeria.html">Galeria</a>')
    
    # Fix French pages
    content = content.replace('href="/fr/blog.html">Galerie</a>', 'href="/fr/galerie.html">Galerie</a>')
    content = content.replace('href="../blog.html">Galerie</a>', 'href="../galerie.html">Galerie</a>')
    
    # Fix Portuguese pages
    content = content.replace('href="/pt/blog.html">Galeria</a>', 'href="/pt/galeria.html">Galeria</a>')
    
    # Only write if changed
    if content != original:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("=" * 60)
    print("FIXING GALLERY NAVIGATION LINKS")
    print("=" * 60)
    
    fixed_count = 0
    
    # Fix all HTML files in root
    for html_file in Path('.').glob('*.html'):
        if fix_nav_links_in_file(str(html_file)):
            print(f"✓ Fixed {html_file}")
            fixed_count += 1
    
    # Fix all HTML files in subdirectories (en, ca, fr, pt)
    for lang in ['en', 'ca', 'fr', 'pt']:
        if os.path.exists(lang):
            for html_file in Path(lang).rglob('*.html'):
                if fix_nav_links_in_file(str(html_file)):
                    print(f"✓ Fixed {html_file}")
                    fixed_count += 1
    
    # Fix all HTML files in blog directories
    for blog_dir in ['blog', 'en/blog', 'ca/blog', 'fr/blog', 'pt/blog']:
        if os.path.exists(blog_dir):
            for html_file in Path(blog_dir).glob('*.html'):
                if fix_nav_links_in_file(str(html_file)):
                    print(f"✓ Fixed {html_file}")
                    fixed_count += 1
    
    print("\n" + "=" * 60)
    print(f"✅ COMPLETED! Fixed {fixed_count} files")
    print("=" * 60)

if __name__ == "__main__":
    main()
