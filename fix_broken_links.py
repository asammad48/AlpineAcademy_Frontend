#!/usr/bin/env python3
"""
Fix broken links across all HTML files.
Maps old/incorrect filenames to correct ones.
"""

import os
import re
from pathlib import Path

# Mapping of broken links to correct links
LINK_FIXES = {
    # Spanish (ES)
    '../Nosotros.html': '../sobre-nosotros.html',
    './Nosotros.html': './sobre-nosotros.html',
    '/Nosotros.html': '/sobre-nosotros.html',
    'Nosotros.html': 'sobre-nosotros.html',
    
    '../Viajes.html': '../viajes-de-esqui.html',
    './Viajes.html': './viajes-de-esqui.html',
    '/Viajes.html': '/viajes-de-esqui.html',
    'Viajes.html': 'viajes-de-esqui.html',
    
    '../camaras.html': '../camaras-baqueira.html',
    './camaras.html': './camaras-baqueira.html',
    '/camaras.html': '/camaras-baqueira.html',
    
    '../alquiler.html': '../alquiler-de-material-baqueira.html',
    './alquiler.html': './alquiler-de-material-baqueira.html',
    '/alquiler.html': '/alquiler-de-material-baqueira.html',
    'alquiler.html': 'alquiler-de-material-baqueira.html',
    
    '../precios.html': '../precios-y-tarifas-baqueira.html',
    './precios.html': './precios-y-tarifas-baqueira.html',
    '/precios.html': '/precios-y-tarifas-baqueira.html',
    'precios.html': 'precios-y-tarifas-baqueira.html',
    
    '../contacto.html': '../contacto-reservas.html',
    './contacto.html': './contacto-reservas.html',
    '/contacto.html': '/contacto-reservas.html',
    'contacto.html': 'contacto-reservas.html',
    
    '../Política-de-cancelación.html': '../politica-de-cancelacion.html',
    './Política-de-cancelación.html': './politica-de-cancelacion.html',
    '/Política-de-cancelación.html': '/politica-de-cancelacion.html',
    'Política-de-cancelación.html': 'politica-de-cancelacion.html',
    
    '../clases-de-snowboard.html': '../clases-de-snowboard-baqueira.html',
    './clases-de-snowboard.html': './clases-de-snowboard-baqueira.html',
    '/clases-de-snowboard.html': '/clases-de-snowboard-baqueira.html',
    'clases-de-snowboard.html': 'clases-de-snowboard-baqueira.html',
    
    # Remove galeria.html links (doesn't exist - should be commented or create placeholder)
    '../galeria.html': '../blog.html',
    './galeria.html': './blog.html',
    '/galeria.html': '/blog.html',
    'galeria.html': 'blog.html',
    
    # Language.js file path
    '../language.js': '../js/components/language.js',
    './language.js': './js/components/language.js',
    
    # Fix paths for freeride classes
    '../clases-esqui-baqueira/clases-esqui-particulares-freeride-baqueira.html': '../clases-de-freeride-baqueira.html',
    './clases-esqui-baqueira/clases-esqui-particulares-freeride-baqueira.html': './clases-de-freeride-baqueira.html',
    
    # English (EN)
    'about.html': 'about-us.html',
    '../about.html': '../about-us.html',
    './about.html': './about-us.html',
    '/about.html': '/about-us.html',
    
    'contact.html': 'contact-booking.html',
    '../contact.html': '../contact-booking.html',
    './contact.html': './contact-booking.html',
    '/contact.html': '/contact-booking.html',
    
    'webcams.html': 'webcams-baqueira.html',
    '../webcams.html': '../webcams-baqueira.html',
    './webcams.html': './webcams-baqueira.html',
    
    'prices.html': 'ski-snowboard-lessons-prices-baqueira.html',
    '../prices.html': '../ski-snowboard-lessons-prices-baqueira.html',
    './prices.html': './ski-snowboard-lessons-prices-baqueira.html',
    
    'trips.html': 'ski-trips.html',
    '../trips.html': '../ski-trips.html',
    './trips.html': './ski-trips.html',
    
    # French (FR)
    'a-propos.html': 'a-propos-de-nous.html',
    '../a-propos.html': '../a-propos-de-nous.html',
    './a-propos.html': './a-propos-de-nous.html',
    
    # Portuguese (PT)
    'sobre.html': 'sobre-nos.html',
    '../sobre.html': '../sobre-nos.html',
    './sobre.html': './sobre-nos.html',
    
    'contato.html': 'contato-reservas.html',
    '../contato.html': '../contato-reservas.html',
    './contato.html': './contato-reservas.html',
    
    'cameras.html': 'cameras-baqueira.html',
    '../cameras.html': '../cameras-baqueira.html',
    './cameras.html': './cameras-baqueira.html',
    
    'precos.html': 'precos-e-tarifas-baqueira.html',
    '../precos.html': '../precos-e-tarifas-baqueira.html',
    './precos.html': './precos-e-tarifas-baqueira.html',
    
    'viagens.html': 'viagens-de-esqui.html',
    '../viagens.html': '../viagens-de-esqui.html',
    './viagens.html': './viagens-de-esqui.html',
    
    # Catalan (CA)
    'nosaltres-ca.html': 'nosaltres.html',
    '../nosaltres-ca.html': '../nosaltres.html',
    './nosaltres-ca.html': './nosaltres.html',
}

def find_all_html_files():
    """Find all HTML files in the project."""
    html_files = []
    
    # Root folder HTML files
    for html_file in Path('.').glob('*.html'):
        if html_file.name not in ['deepseek_html_20250824_70760c.html', 'aviso-legal~.html', '404.html']:
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

def fix_links_in_file(file_path):
    """Fix broken links in a single file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        changes_made = 0
        
        # Apply each fix
        for broken_link, correct_link in LINK_FIXES.items():
            # Fix in href attributes
            old_pattern = f'href="{broken_link}"'
            new_pattern = f'href="{correct_link}"'
            if old_pattern in content:
                content = content.replace(old_pattern, new_pattern)
                changes_made += 1
            
            old_pattern = f"href='{broken_link}'"
            new_pattern = f"href='{correct_link}'"
            if old_pattern in content:
                content = content.replace(old_pattern, new_pattern)
                changes_made += 1
            
            # Fix in src attributes
            old_pattern = f'src="{broken_link}"'
            new_pattern = f'src="{correct_link}"'
            if old_pattern in content:
                content = content.replace(old_pattern, new_pattern)
                changes_made += 1
            
            old_pattern = f"src='{broken_link}'"
            new_pattern = f"src='{correct_link}'"
            if old_pattern in content:
                content = content.replace(old_pattern, new_pattern)
                changes_made += 1
        
        # Write back if changes were made
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return changes_made
        
        return 0
        
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return 0

def main():
    """Main function to fix all broken links."""
    print("Starting broken link fix...")
    print("=" * 60)
    
    html_files = find_all_html_files()
    print(f"Found {len(html_files)} HTML files to process\n")
    
    stats = {
        'files_processed': 0,
        'files_updated': 0,
        'total_changes': 0
    }
    
    for file_path in html_files:
        changes = fix_links_in_file(file_path)
        stats['files_processed'] += 1
        
        if changes > 0:
            stats['files_updated'] += 1
            stats['total_changes'] += changes
            print(f"✓ Updated: {file_path} ({changes} changes)")
    
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"Files processed: {stats['files_processed']}")
    print(f"Files updated: {stats['files_updated']}")
    print(f"Total changes made: {stats['total_changes']}")
    print("\n" + "=" * 60)
    print("Broken link fix completed!")
    print("=" * 60)

if __name__ == '__main__':
    main()
