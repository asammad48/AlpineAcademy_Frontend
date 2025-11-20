#!/usr/bin/env python3
"""Fix blog page script paths and metadata URLs"""

import re
from pathlib import Path

# Blog file mappings for each language
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

def fix_blog_file(filepath, lang_code, slug):
    """Fix script paths and metadata in a blog file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Fix script/CSS paths to use absolute paths
    content = content.replace('src="../script.js"', 'src="/script.js"')
    content = content.replace('src="../animation.js"', 'src="/animation.js"')
    content = content.replace('src="../js/components/language.js"', 'src="/js/components/language.js"')
    content = content.replace('href="../styles.css"', 'href="/styles.css"')
    content = content.replace('src="../logo1.jpg"', 'src="/logo1.jpg"')
    
    # Fix blog image paths - all blog images are in /blog/ directory
    # Replace relative paths like "../blog/Articulo7-fotos-blog/" with absolute "/blog/Articulo7-fotos-blog/"
    content = content.replace('src="../blog/', 'src="/blog/')
    content = content.replace('data-src="../blog/', 'data-src="/blog/')
    
    # Fix canonical URL
    if lang_code == 'es':
        canonical_url = f'https://alpineskiacademy.com/blog/{slug}/'
    else:
        canonical_url = f'https://alpineskiacademy.com/{lang_code}/blog/{slug}/'
    
    content = re.sub(
        r'<link rel="canonical" href="https://alpineskiacademy\.com/blog/[^"]*"',
        f'<link rel="canonical" href="{canonical_url}"',
        content
    )
    
    # Fix OG URL
    content = re.sub(
        r'<meta property="og:url" content="https://alpineskiacademy\.com/blog/[^"]*"',
        f'<meta property="og:url" content="{canonical_url}"',
        content
    )
    
    # Fix Twitter URL
    content = re.sub(
        r'<meta property="twitter:url" content="https://alpineskiacademy\.com/blog/[^"]*"',
        f'<meta property="twitter:url" content="{canonical_url}"',
        content
    )
    
    # Fix JSON-LD mainEntityOfPage URL
    content = re.sub(
        r'"mainEntityOfPage": "https://alpineskiacademy\.com/blog/[^"]*"',
        f'"mainEntityOfPage": "{canonical_url}"',
        content
    )
    
    # Fix JSON-LD breadcrumb URLs
    if lang_code == 'es':
        blog_url = 'https://alpineskiacademy.com/blog/'
        home_url = 'https://alpineskiacademy.com/'
    else:
        blog_url = f'https://alpineskiacademy.com/{lang_code}/blog/'
        home_url = f'https://alpineskiacademy.com/{lang_code}/'
    
    content = re.sub(
        r'"item": "https://alpineskiacademy\.com/"',
        f'"item": "{home_url}"',
        content
    )
    content = re.sub(
        r'"item": "https://alpineskiacademy\.com/blog/"',
        f'"item": "{blog_url}"',
        content
    )
    
    # Fix breadcrumb third item (blog post URL) to point to correct language-specific URL
    content = re.sub(
        r'"item": "https://alpineskiacademy\.com/blog/[^"]*"',
        f'"item": "{canonical_url}"',
        content
    )
    
    # Fix OG and Twitter image URLs to use language-specific images
    # Replace -es.webp with language-specific suffix (-en, -ca, -fr, -pt)
    if lang_code != 'es':
        content = content.replace('-es.webp', f'-{lang_code}.webp')
        content = content.replace('-es.jpg', f'-{lang_code}.jpg')
        content = content.replace('-es.png', f'-{lang_code}.png')
    
    # Fix JSON-LD syntax error: remove {} artifact before closing script tag
    content = re.sub(r'"{}(\s*}?\s*)\s*</script>', r'"\1\n    </script>', content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("=" * 60)
    print("FIXING BLOG SCRIPT PATHS AND METADATA")
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
                if fix_blog_file(filepath, lang_code, slug):
                    print(f"✓ Fixed {filepath}")
                    fixed_count += 1
            else:
                print(f"⚠ Not found: {filepath}")
    
    print("\n" + "=" * 60)
    print(f"✅ COMPLETED! Fixed {fixed_count} blog files")
    print("=" * 60)

if __name__ == "__main__":
    main()
