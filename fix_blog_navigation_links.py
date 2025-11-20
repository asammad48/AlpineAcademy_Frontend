#!/usr/bin/env python3
"""Fix all navigation links in blog pages to use absolute paths"""

import re
from pathlib import Path

def fix_navigation_links(filepath, lang_code):
    """Fix navigation links in a blog file to use absolute paths"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Determine the base path for this language
    if lang_code == 'es':
        base = ''
    else:
        base = f'/{lang_code}'
    
    # Fix all navigation links from ../page.html to /lang/page.html (or /page.html for Spanish)
    # Common pattern: href="../something.html"
    def replace_nav_link(match):
        filename = match.group(1)
        
        # Map Spanish filenames to language-specific versions
        filename_map = {
            'index.html': 'index.html',
            'clases-de-esqui-baqueira.html': {'en': 'ski-lessons-baqueira.html', 'ca': 'classes-desqui-baqueira.html', 'fr': 'cours-de-ski-baqueira.html', 'pt': 'aulas-de-esqui-baqueira.html'},
            'clases-particulares-ninos-baqueira.html': {'en': 'private-ski-lessons-kids-baqueira.html', 'ca': 'classes-particulars-nens-baqueira.html', 'fr': 'cours-particuliers-enfants-baqueira.html', 'pt': 'aulas-particulares-criancas-baqueira.html'},
            'clases-particulares-familias-baqueira.html': {'en': 'private-ski-lessons-families-baqueira.html', 'ca': 'classes-particulars-families-baqueira.html', 'fr': 'cours-particuliers-familles-baqueira.html', 'pt': 'aulas-particulares-familias-baqueira.html'},
            'clases-particulares-adultos-baqueira.html': {'en': 'private-ski-lessons-adults-baqueira.html', 'ca': 'classes-particulars-adults-baqueira.html', 'fr': 'cours-particuliers-adultes-baqueira.html', 'pt': 'aulas-particulares-adultos-baqueira.html'},
            'clases-tecnologia-carv-baqueira.html': {'en': 'private-ski-lessons-carv-baqueira.html', 'ca': 'classes-tecnologia-carv-baqueira.html', 'fr': 'cours-technologie-carv-baqueira.html', 'pt': 'aulas-tecnologia-carv-baqueira.html'},
            'clases-de-freeride-baqueira.html': {'en': 'freeride-ski-lessons-baqueira.html', 'ca': 'classes-freeride-baqueira.html', 'fr': 'cours-freeride-baqueira.html', 'pt': 'aulas-freeride-baqueira.html'},
            'clases-de-freestyle-baqueira.html': {'en': 'freestyle-ski-lessons-baqueira.html', 'ca': 'classes-freestyle-baqueira.html', 'fr': 'cours-freestyle-baqueira.html', 'pt': 'aulas-freestyle-baqueira.html'},
            'clases-grupo-ninos-baqueira.html': {'en': 'group-ski-lessons-kids-baqueira.html', 'ca': 'classes-grup-nens-baqueira.html', 'fr': 'cours-groupe-enfants-baqueira.html', 'pt': 'aulas-grupo-criancas-baqueira.html'},
            'clases-grupo-adultos-baqueira.html': {'en': 'group-ski-lessons-adults-baqueira.html', 'ca': 'classes-grup-adults-baqueira.html', 'fr': 'cours-groupe-adultes-baqueira.html', 'pt': 'aulas-grupo-adultos-baqueira.html'},
            'clases-empresas-colegios-baqueira.html': {'en': 'ski-lessons-companies-schools-baqueira.html', 'ca': 'classes-empreses-escoles-baqueira.html', 'fr': 'cours-entreprises-ecoles-baqueira.html', 'pt': 'aulas-empresas-escolas-baqueira.html'},
            'clases-de-snowboard-baqueira.html': {'en': 'snowboard-lessons-baqueira.html', 'ca': 'classes-de-snowboard-baqueira.html', 'fr': 'cours-de-snowboard-baqueira.html', 'pt': 'aulas-de-snowboard-baqueira.html'},
            'sobre-nosotros.html': {'en': 'about-us.html', 'ca': 'nosaltres.html', 'fr': 'a-propos-de-nous.html', 'pt': 'sobre-nos.html'},
            'galeria.html': {'en': 'gallery.html', 'ca': 'galeria.html', 'fr': 'galerie.html', 'pt': 'galeria.html'},
            'viajes-de-esqui.html': {'en': 'ski-trips.html', 'ca': 'viatges-desqui.html', 'fr': 'voyages-de-ski.html', 'pt': 'viagens-de-esqui.html'},
            'camaras-baqueira.html': {'en': 'webcams-baqueira.html', 'ca': 'cameres-baqueira.html', 'fr': 'cameras-baqueira.html', 'pt': 'cameras-baqueira.html'},
            'alquiler-de-material-baqueira.html': {'en': 'ski-snowboard-rental-baqueira.html', 'ca': 'lloguer-de-material-baqueira.html', 'fr': 'location-de-materiel-baqueira.html', 'pt': 'aluguel-de-equipamento-baqueira.html'},
            'precios-y-tarifas-baqueira.html': {'en': 'ski-snowboard-lessons-prices-baqueira.html', 'ca': 'preus-i-tarifes-baqueira.html', 'fr': 'prix-et-tarifs-baqueira.html', 'pt': 'precos-e-tarifas-baqueira.html'},
            'blog.html': 'blog.html',
            'contacto-reservas.html': {'en': 'contact-booking.html', 'ca': 'contacte-reserves.html', 'fr': 'contact-reservations.html', 'pt': 'contato-reservas.html'},
        }
        
        # Get the language-specific filename
        if filename in filename_map:
            if isinstance(filename_map[filename], dict):
                if lang_code == 'es':
                    localized_filename = filename
                else:
                    localized_filename = filename_map[filename].get(lang_code, filename)
            else:
                localized_filename = filename_map[filename]
        else:
            localized_filename = filename
        
        return f'href="{base}/{localized_filename}"'
    
    # Replace all ../something.html links
    content = re.sub(r'href="\.\./([^"]+\.html)"', replace_nav_link, content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("=" * 60)
    print("FIXING BLOG NAVIGATION LINKS")
    print("=" * 60)
    
    fixed_count = 0
    
    blog_dirs = [
        ('blog', 'es'),
        ('en/blog', 'en'),
        ('ca/blog', 'ca'),
        ('fr/blog', 'fr'),
        ('pt/blog', 'pt')
    ]
    
    for blog_dir, lang_code in blog_dirs:
        if not Path(blog_dir).exists():
            continue
        for html_file in Path(blog_dir).glob('*.html'):
            if fix_navigation_links(str(html_file), lang_code):
                print(f"✓ Fixed {html_file}")
                fixed_count += 1
    
    print("\n" + "=" * 60)
    print(f"✅ COMPLETED! Fixed {fixed_count} blog files")
    print("=" * 60)

if __name__ == "__main__":
    main()
