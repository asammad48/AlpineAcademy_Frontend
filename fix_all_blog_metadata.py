#!/usr/bin/env python3
"""Comprehensive blog metadata fix: breadcrumbs, titles, and JSON syntax"""

import re
from pathlib import Path

BLOG_MAPPINGS = {
    'es': {
        'como-llegar-baqueira-beret.html': 'como-llegar-baqueira-beret',
        'mejores-restaurantes-baqueira-beret.html': 'mejores-restaurantes-baqueira-beret',
        'mejores-hoteles-familias-baqueira-beret.html': 'mejores-hoteles-familias-baqueira-beret',
        'las-mejores-apps-para-esquiar-en-baqueira-beret.html': 'las-mejores-apps-para-esquiar-en-baqueira-beret',
        'alquiler-esqui-snowboard-baqueira.html': 'alquiler-esqui-snowboard-baqueira',
        'como-aprender-esquiar-baqueira.html': 'como-aprender-esquiar-baqueira',
        'zonas-principiantes-baqueira-beret.html': 'zonas-principiantes-baqueira-beret'
    },
    'en': {
        'how-to-get-to-baqueira-beret.html': 'how-to-get-to-baqueira-beret',
        'best-restaurants-baqueira-beret.html': 'best-restaurants-baqueira-beret',
        'best-family-hotels-baqueira-beret.html': 'best-family-hotels-baqueira-beret',
        'best-apps-for-skiing-baqueira-beret.html': 'best-apps-for-skiing-baqueira-beret',
        'ski-snowboard-rental-baqueira.html': 'ski-snowboard-rental-baqueira',
        'how-to-learn-skiing-baqueira.html': 'how-to-learn-skiing-baqueira',
        'beginner-areas-baqueira-beret.html': 'beginner-areas-baqueira-beret'
    },
    'ca': {
        'com-arribar-a-baqueira-beret.html': 'com-arribar-a-baqueira-beret',
        'millors-restaurants-baqueira-beret.html': 'millors-restaurants-baqueira-beret',
        'millors-hotels-families-baqueira-beret.html': 'millors-hotels-families-baqueira-beret',
        'millors-apps-per-esquiar-baqueira-beret.html': 'millors-apps-per-esquiar-baqueira-beret',
        'lloguer-esqui-snowboard-baqueira.html': 'lloguer-esqui-snowboard-baqueira',
        'com-aprendre-esquiar-baqueira.html': 'com-aprendre-esquiar-baqueira',
        'zones-principiants-baqueira-beret.html': 'zones-principiants-baqueira-beret'
    },
    'fr': {
        'comment-arriver-a-baqueira-beret.html': 'comment-arriver-a-baqueira-beret',
        'meilleurs-restaurants-baqueira-beret.html': 'meilleurs-restaurants-baqueira-beret',
        'meilleurs-hotels-familles-baqueira-beret.html': 'meilleurs-hotels-familles-baqueira-beret',
        'meilleures-apps-pour-skier-baqueira-beret.html': 'meilleures-apps-pour-skier-baqueira-beret',
        'location-ski-snowboard-baqueira.html': 'location-ski-snowboard-baqueira',
        'comment-apprendre-skier-baqueira.html': 'comment-apprendre-skier-baqueira',
        'zones-debutants-baqueira-beret.html': 'zones-debutants-baqueira-beret'
    },
    'pt': {
        'como-chegar-a-baqueira-beret.html': 'como-chegar-a-baqueira-beret',
        'melhores-restaurantes-baqueira-beret.html': 'melhores-restaurantes-baqueira-beret',
        'melhores-hoteis-familias-baqueira-beret.html': 'melhores-hoteis-familias-baqueira-beret',
        'melhores-apps-para-esquiar-baqueira-beret.html': 'melhores-apps-para-esquiar-baqueira-beret',
        'aluguel-esqui-snowboard-baqueira.html': 'aluguel-esqui-snowboard-baqueira',
        'como-aprender-esquiar-baqueira.html': 'como-aprender-esquiar-baqueira',
        'zonas-iniciantes-baqueira-beret.html': 'zonas-iniciantes-baqueira-beret'
    }
}

def fix_blog_metadata(filepath, lang_code, slug):
    """Fix all metadata issues in a blog file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # URLs for this language
    if lang_code == 'es':
        canonical_url = f'https://alpineskiacademy.com/blog/{slug}/'
        blog_index_url = 'https://alpineskiacademy.com/blog/'
        home_url = 'https://alpineskiacademy.com/'
    else:
        canonical_url = f'https://alpineskiacademy.com/{lang_code}/blog/{slug}/'
        blog_index_url = f'https://alpineskiacademy.com/{lang_code}/blog/'
        home_url = f'https://alpineskiacademy.com/{lang_code}/'
    
    # Fix breadcrumb JSON-LD: position 2 should be blog index, position 3 should be article
    # First, fix the "Blog" entry (position 2) to point to blog index
    content = re.sub(
        r'("position": 2,\s*"name": "[^"]*",\s*"item": )"https://alpineskiacademy\.com/[^"]*"',
        rf'\1"{blog_index_url}"',
        content
    )
    
    # Fix Twitter title to match OG title (extract OG title and use it for Twitter)
    og_title_match = re.search(r'<meta property="og:title" content="([^"]*)"', content)
    if og_title_match:
        og_title = og_title_match.group(1)
        content = re.sub(
            r'<meta property="twitter:title" content="[^"]*"',
            f'<meta property="twitter:title" content="{og_title}"',
            content
        )
    
    # Fix JSON-LD breadcrumb closing syntax: remove {}script> and add proper closing
    # The pattern is: "item": "URL"{}</script>
    # Should be: "item": "URL"\n    }\n  ]\n}</script>
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if '"{}</script>' in line:
            lines[i] = line.replace('"{}</script>', '"\n    }\n  ]\n}</script>')
            break
    content = '\n'.join(lines)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("=" * 60)
    print("COMPREHENSIVE BLOG METADATA FIX")
    print("=" * 60)
    
    fixed_count = 0
    
    for lang_code, files in BLOG_MAPPINGS.items():
        if lang_code == 'es':
            blog_dir = 'blog'
        else:
            blog_dir = f'{lang_code}/blog'
        
        for filename, slug in files.items():
            filepath = f'{blog_dir}/{filename}'
            if Path(filepath).exists():
                if fix_blog_metadata(filepath, lang_code, slug):
                    print(f"✓ Fixed {filepath}")
                    fixed_count += 1
            else:
                print(f"⚠ Not found: {filepath}")
    
    print("\n" + "=" * 60)
    print(f"✅ COMPLETED! Fixed {fixed_count} blog files")
    print("=" * 60)

if __name__ == "__main__":
    main()
