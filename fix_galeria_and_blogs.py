#!/usr/bin/env python3
"""
Script to:
1. Create galeria pages for all languages (ES, EN, CA, FR, PT)
2. Fix all blog pages with proper hash links and CSS paths
"""

import os
import re
from pathlib import Path

# Navigation links mapping (old to new format)
NAV_FIXES = {
    'clases-esqui-baqueira/index.html': 'clases-de-esqui-baqueira.html',
    'clases-esqui-baqueira/particulares-ninos.html': 'clases-particulares-ninos-baqueira.html',
    'clases-esqui-baqueira/clases-esqui-particulares-familias-baqueira.html': 'clases-particulares-familias-baqueira.html',
    'clases-esqui-baqueira/particulares-adultos.html': 'clases-particulares-adultos-baqueira.html',
    'clases-esqui-baqueira/particulares-carv.html': 'clases-tecnologia-carv-baqueira.html',
    'clases-esqui-baqueira/particulares-freeride.html': 'clases-de-freeride-baqueira.html',
    'clases-esqui-baqueira/particulares-freestyle.html': 'clases-de-freestyle-baqueira.html',
    'clases-esqui-baqueira/clases-esqui-particulares-ninos-baqueira.html': 'clases-grupo-ninos-baqueira.html',
    'clases-esqui-baqueira/grupo-ninos.html': 'clases-grupo-ninos-baqueira.html',
    'clases-esqui-baqueira/grupo-adultos.html': 'clases-grupo-adultos-baqueira.html',
    'clases-esqui-baqueira/empresas-colegios.html': 'clases-empresas-colegios-baqueira.html',
    'clases-de-snowboard.html': 'clases-de-snowboard-baqueira.html',
    'Nosotros.html': 'sobre-nosotros.html',
    'Viajes.html': 'viajes-de-esqui.html',
    'camaras.html': 'camaras-baqueira.html',
    'alquiler.html': 'alquiler-de-material-baqueira.html',
    'precios.html': 'precios-y-tarifas-baqueira.html',
    'contacto.html': 'contacto-reservas.html',
    'About Us.html': 'about-us.html',
    'Trips.html': 'ski-trips.html',
}

def fix_navigation_links(html_content):
    """Fix old navigation links to new format"""
    for old, new in NAV_FIXES.items():
        html_content = html_content.replace(f'href="{old}"', f'href="{new}"')
        html_content = html_content.replace(f'href="../{old}"', f'href="../{new}"')
    return html_content

def create_galeria_spanish():
    """Create Spanish galeria.html from backup"""
    print("Creating Spanish galeria.html...")
    with open('_old_files_backup/galeria.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix navigation links
    content = fix_navigation_links(content)
    
    # Update language switcher to proper paths
    content = content.replace('ca/galeria-ca.html', 'ca/galeria.html')
    
    with open('galeria.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("✓ Created galeria.html")

def create_galeria_for_lang(lang_code, filename, title, description, lang_name):
    """Create galeria page for a specific language"""
    print(f"Creating {lang_code}/{ filename}...")
    
    # Read Spanish version as template
    with open('_old_files_backup/galeria.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update lang attribute
    content = content.replace('<html lang="es">', f'<html lang="{lang_code}">')
    
    # Update meta tags
    content = re.sub(
        r'<title>.*?</title>',
        f'<title>{title}</title>',
        content
    )
    content = re.sub(
        r'<meta name="description"\s+content="[^"]*"',
        f'<meta name="description" content="{description}"',
        content
    )
    
    # Update canonical URL
    content = content.replace(
        'href="https://alpineskiacademy.com/galeria.html"',
        f'href="https://alpineskiacademy.com/{lang_code}/{filename}"'
    )
    
    # Update OG URLs
    content = content.replace(
        'content="https://alpineskiacademy.com/galeria.html"',
        f'content="https://alpineskiacademy.com/{lang_code}/{filename}"'
    )
    
    # Update script/style paths to root-relative
    content = content.replace('src="script.js"', 'src="/script.js"')
    content = content.replace('src="animation.js"', 'src="/animation.js"')
    content = content.replace('src="js/components/language.js"', 'src="/js/components/language.js"')
    content = content.replace('href="styles.css"', 'href="/styles.css"')
    content = content.replace('src="logo1.jpg"', 'src="/logo1.jpg"')
    
    # Update navigation links to root-relative with language prefix where needed
    content = content.replace('href="index.html"', f'href="/{lang_code}/index.html"')
    content = fix_navigation_links(content)
    
    # Fix all nav links to be root-relative with lang prefix
    nav_pages = [
        ('clases-de-esqui-baqueira.html', 'ski-lessons-baqueira.html' if lang_code == 'en' else None),
        ('clases-de-snowboard-baqueira.html', 'snowboard-lessons-baqueira.html' if lang_code == 'en' else None),
        ('sobre-nosotros.html', 'about-us.html' if lang_code == 'en' else None),
        ('galeria.html', 'gallery.html' if lang_code == 'en' else 'galerie.html' if lang_code == 'fr' else 'galeria.html'),
        ('viajes-de-esqui.html', 'ski-trips.html' if lang_code == 'en' else None),
        ('camaras-baqueira.html', 'webcams-baqueira.html' if lang_code == 'en' else None),
        ('alquiler-de-material-baqueira.html', 'ski-snowboard-rental-baqueira.html' if lang_code == 'en' else None),
        ('precios-y-tarifas-baqueira.html', 'ski-snowboard-lessons-prices-baqueira.html' if lang_code == 'en' else None),
        ('contacto-reservas.html', 'contact-booking.html' if lang_code == 'en' else None),
        ('blog.html', 'blog.html'),
    ]
    
    for es_name, en_name in nav_pages:
        target = en_name if lang_code == 'en' and en_name else es_name
        content = content.replace(f'href="{es_name}"', f'href="/{lang_code}/{target}"')
    
    # Update language switcher
    content = re.sub(
        r'<li><a class="dropdown-item.*?language-option.*?href="[^"]*".*?data-lang="es".*?</a></li>',
        '<li><a class="dropdown-item language-option" href="/galeria.html" data-lang="es"><img src="https://flagcdn.com/w40/es.png" width="20" height="15" class="me-2">Español</a></li>',
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r'<li><a class="dropdown-item.*?language-option.*?href="[^"]*".*?data-lang="en".*?</a></li>',
        '<li><a class="dropdown-item language-option" href="/en/gallery.html" data-lang="en"><img src="https://flagcdn.com/w40/gb.png" width="20" height="15" class="me-2">English</a></li>',
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r'<li><a class="dropdown-item.*?language-option.*?href="[^"]*".*?data-lang="ca".*?</a></li>',
        '<li><a class="dropdown-item language-option" href="/ca/galeria.html" data-lang="ca"><img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Catalonia.svg" width="20" height="15" class="me-2">Català</a></li>',
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r'<li><a class="dropdown-item.*?language-option.*?href="[^"]*".*?data-lang="fr".*?</a></li>',
        '<li><a class="dropdown-item language-option" href="/fr/galerie.html" data-lang="fr"><img src="https://flagcdn.com/w40/fr.png" width="20" height="15" class="me-2">Français</a></li>',
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r'<li><a class="dropdown-item.*?language-option.*?href="[^"]*".*?data-lang="pt".*?</a></li>',
        '<li><a class="dropdown-item language-option" href="/pt/galeria.html" data-lang="pt"><img src="https://flagcdn.com/w40/pt.png" width="20" height="15" class="me-2">Português</a></li>',
        content,
        flags=re.DOTALL
    )
    
    # Mark the current language as active
    content = content.replace(f'data-lang="{lang_code}">', f'data-lang="{lang_code}" class="active">')
    content = content.replace(f'<i class="fas fa-globe me-1"></i> ES', f'<i class="fas fa-globe me-1"></i> {lang_name}')
    
    # Update all image paths to be root-relative
    content = re.sub(r'src="(images/|clases-esqui-baqueira/)', r'src="/\1', content)
    
    # Create directory if it doesn't exist
    os.makedirs(lang_code, exist_ok=True)
    
    with open(f'{lang_code}/{filename}', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✓ Created {lang_code}/{filename}")

def fix_blog_file(blog_file_path, is_spanish=True):
    """Fix a single blog file with proper hash links and CSS paths"""
    print(f"Fixing {blog_file_path}...")
    
    with open(blog_file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix CSS background image path from ../blog/ to /blog/
    content = re.sub(
        r"url\(['\"]?\.\./blog/",
        r"url('/blog/",
        content
    )
    
    # Add IDs to H2 headings and create slugs
    h2_pattern = r'<h2>(.*?)</h2>'
    
    def create_slug(text):
        # Remove HTML tags
        text = re.sub(r'<[^>]+>', '', text)
        # Convert to lowercase and replace spaces with hyphens
        slug = text.lower().strip()
        slug = re.sub(r'[áàâä]', 'a', slug)
        slug = re.sub(r'[éèêë]', 'e', slug)
        slug = re.sub(r'[íìîï]', 'i', slug)
        slug = re.sub(r'[óòôö]', 'o', slug)
        slug = re.sub(r'[úùûü]', 'u', slug)
        slug = re.sub(r'[ñ]', 'n', slug)
        slug = re.sub(r'[ç]', 'c', slug)
        slug = re.sub(r'[^\w\s-]', '', slug)
        slug = re.sub(r'[-\s]+', '-', slug)
        return slug.strip('-')
    
    # Find all H2 headings and add IDs
    h2_matches = list(re.finditer(h2_pattern, content))
    toc_items = []
    
    for match in h2_matches:
        h2_text = match.group(1)
        slug = create_slug(h2_text)
        toc_items.append((h2_text, slug))
        
        # Replace H2 with ID
        old_h2 = match.group(0)
        new_h2 = f'<h2 id="{slug}">{h2_text}</h2>'
        content = content.replace(old_h2, new_h2, 1)
    
    # Update Table of Contents with proper hash links
    if toc_items:
        # Find the TOC section
        toc_pattern = r'(<div class="table-of-contents">.*?<ul>)(.*?)(</ul>)'
        toc_match = re.search(toc_pattern, content, re.DOTALL)
        
        if toc_match:
            toc_start = toc_match.group(1)
            toc_end = toc_match.group(3)
            
            # Create new TOC with links
            new_toc_items = []
            for text, slug in toc_items:
                new_toc_items.append(f'                            <li><a href="#{slug}">{text}</a></li>')
            
            new_toc = toc_start + '\n' + '\n'.join(new_toc_items) + '\n                        ' + toc_end
            content = re.sub(toc_pattern, new_toc, content, flags=re.DOTALL)
    
    # Fix navigation broken links
    content = fix_navigation_links(content)
    
    # Write back
    with open(blog_file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✓ Fixed {blog_file_path}")

def main():
    print("=" * 60)
    print("STARTING GALERIA AND BLOG FIXES")
    print("=" * 60)
    
    # Step 1: Create Galeria pages
    print("\n### Step 1: Creating Galeria pages...")
    create_galeria_spanish()
    
    create_galeria_for_lang(
        'en', 'gallery.html',
        'Gallery Alpine Ski Academy | Skiing and Snowboarding Images in Baqueira Beret',
        'Explore the official gallery of Alpine Ski Academy in Baqueira Beret. Photographs and videos of our ski and snowboard classes, moments on the slopes and unique Pyrenees landscapes.',
        'EN'
    )
    
    create_galeria_for_lang(
        'ca', 'galeria.html',
        'Galeria Alpine Ski Academy | Imatges d\'Esquí i Snowboard a Baqueira Beret',
        'Explora la galeria oficial d\'Alpine Ski Academy a Baqueira Beret. Fotografies i vídeos de les nostres classes d\'esquí i snowboard, moments a pista i paisatges únics del Pirineu.',
        'CA'
    )
    
    create_galeria_for_lang(
        'fr', 'galerie.html',
        'Galerie Alpine Ski Academy | Images de Ski et Snowboard à Baqueira Beret',
        'Explorez la galerie officielle d\'Alpine Ski Academy à Baqueira Beret. Photographies et vidéos de nos cours de ski et snowboard, moments sur piste et paysages uniques des Pyrénées.',
        'FR'
    )
    
    create_galeria_for_lang(
        'pt', 'galeria.html',
        'Galeria Alpine Ski Academy | Imagens de Esqui e Snowboard em Baqueira Beret',
        'Explore a galeria oficial da Alpine Ski Academy em Baqueira Beret. Fotografias e vídeos das nossas aulas de esqui e snowboard, momentos na pista e paisagens únicas dos Pirinéus.',
        'PT'
    )
    
    print("\n### Step 2: Fixing blog pages...")
    # Fix Spanish blog pages
    for blog_file in Path('blog').glob('*.html'):
        fix_blog_file(str(blog_file), is_spanish=True)
    
    # Fix English blog pages
    for blog_file in Path('en/blog').glob('*.html'):
        fix_blog_file(str(blog_file), is_spanish=False)
    
    # Fix Catalan blog pages
    for blog_file in Path('ca/blog').glob('*.html'):
        fix_blog_file(str(blog_file), is_spanish=False)
    
    # Fix French blog pages
    for blog_file in Path('fr/blog').glob('*.html'):
        fix_blog_file(str(blog_file), is_spanish=False)
    
    # Fix Portuguese blog pages
    for blog_file in Path('pt/blog').glob('*.html'):
        fix_blog_file(str(blog_file), is_spanish=False)
    
    print("\n" + "=" * 60)
    print("✅ ALL FIXES COMPLETED SUCCESSFULLY!")
    print("=" * 60)
    print("\nSummary:")
    print("- Created 5 galeria pages (ES, EN, CA, FR, PT)")
    print("- Fixed ~35 blog pages with hash links and CSS paths")
    print("- Updated navigation links across all files")

if __name__ == "__main__":
    main()
