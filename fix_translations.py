#!/usr/bin/env python3
"""
Fix HTML files in language subdirectories that contain Spanish content
Replaces Spanish navigation and UI elements with proper translations
"""

import re
from pathlib import Path
from typing import Dict, List

# Translation mappings for common UI elements
TRANSLATIONS = {
    'en': {
        # Navigation
        'Clases Esquí': 'Ski Lessons',
        'Clases Particulares': 'Private Lessons',
        'Niños': 'Kids',
        'Familias': 'Families',
        'Adultos': 'Adults',
        'Con Carv': 'With Carv',
        'Freeride': 'Freeride',
        'Freestyle': 'Freestyle',
        'Clases en Grupo': 'Group Lessons',
        'Grupo Niños': 'Kids Group',
        'Grupo Adultos': 'Adults Group',
        'Empresas/Colegios': 'Companies/Schools',
        'Snowboard': 'Snowboard',
        'Nosotros': 'About Us',
        'Galería': 'Gallery',
        'Viajes': 'Trips',
        'Cámaras': 'Webcams',
        'Alquiler': 'Equipment Rental',
        'Precios': 'Prices',
        'Blog': 'Blog',
        'Reserva': 'Book Now',
        'Inicio': 'Home',
        
        # Breadcrumbs
        'Contacto': 'Contact',
        'Servicios': 'Services',
        
        # Footers and legal
        'Contacto / Reserva': 'Contact / Booking',
        'Aviso Legal': 'Legal Notice',
        'Política de Privacidad': 'Privacy Policy',
        'Política de Cookies': 'Cookie Policy',
        'Política de Cancelación': 'Cancellation Policy',
        'Enlaces legales': 'Legal Links',
        'Síguenos': 'Follow Us',
        'Todos los derechos reservados': 'All rights reserved',
        
        # Common phrases
        'Leer Más': 'Read More',
        'Ver más': 'See more',
        'Descubre': 'Discover',
        'Aprende': 'Learn',
        'Reservar ahora': 'Book now',
        'Más información': 'More information',
        
        # Months
        'enero': 'January',
        'febrero': 'February',
        'marzo': 'March',
        'abril': 'April',
        'mayo': 'May',
        'junio': 'June',
        'julio': 'July',
        'agosto': 'August',
        'septiembre': 'September',
        'octubre': 'October',
        'noviembre': 'November',
        'diciembre': 'December',
    },
    'pt': {
        # Navigation
        'Clases Esquí': 'Aulas de Esqui',
        'Clases Particulares': 'Aulas Particulares',
        'Niños': 'Crianças',
        'Familias': 'Famílias',
        'Adultos': 'Adultos',
        'Con Carv': 'Com Carv',
        'Freeride': 'Freeride',
        'Freestyle': 'Freestyle',
        'Clases en Grupo': 'Aulas em Grupo',
        'Grupo Niños': 'Grupo Crianças',
        'Grupo Adultos': 'Grupo Adultos',
        'Empresas/Colegios': 'Empresas/Escolas',
        'Snowboard': 'Snowboard',
        'Nosotros': 'Sobre Nós',
        'Galería': 'Galeria',
        'Viajes': 'Viagens',
        'Cámaras': 'Webcams',
        'Alquiler': 'Aluguel de Equipamento',
        'Precios': 'Preços',
        'Blog': 'Blog',
        'Reserva': 'Reservar',
        'Inicio': 'Início',
        'Contacto': 'Contato',
        
        # Legal
        'Aviso Legal': 'Aviso Legal',
        'Política de Privacidad': 'Política de Privacidade',
        'Política de Cookies': 'Política de Cookies',
        'Política de Cancelación': 'Política de Cancelamento',
    },
    'ca': {
        # Navigation
        'Clases Esquí': 'Classes d\'Esquí',
        'Clases Particulares': 'Classes Particulars',
        'Niños': 'Nens',
        'Familias': 'Famílies',
        'Adultos': 'Adults',
        'Con Carv': 'Amb Carv',
        'Freeride': 'Freeride',
        'Freestyle': 'Freestyle',
        'Clases en Grupo': 'Classes en Grup',
        'Grupo Niños': 'Grup Nens',
        'Grupo Adultos': 'Grup Adults',
        'Empresas/Colegios': 'Empreses/Escoles',
        'Snowboard': 'Snowboard',
        'Nosotros': 'Nosaltres',
        'Galería': 'Galeria',
        'Viajes': 'Viatges',
        'Cámaras': 'Càmeres web',
        'Alquiler': 'Lloguer de Material',
        'Precios': 'Preus',
        'Blog': 'Blog',
        'Reserva': 'Reserva',
        'Inicio': 'Inici',
        'Contacto': 'Contacte',
        
        # Legal
        'Aviso Legal': 'Avís Legal',
        'Política de Privacidad': 'Política de Privadesa',
        'Política de Cookies': 'Política de Cookies',
        'Política de Cancelación': 'Política de Cancel·lació',
    },
    'fr': {
        # Navigation
        'Clases Esquí': 'Cours de Ski',
        'Clases Particulares': 'Cours Particuliers',
        'Niños': 'Enfants',
        'Familias': 'Familles',
        'Adultos': 'Adultes',
        'Con Carv': 'Avec Carv',
        'Freeride': 'Freeride',
        'Freestyle': 'Freestyle',
        'Clases en Grupo': 'Cours en Groupe',
        'Grupo Niños': 'Groupe Enfants',
        'Grupo Adultos': 'Groupe Adultes',
        'Empresas/Colegios': 'Entreprises/Écoles',
        'Snowboard': 'Snowboard',
        'Nosotros': 'À Propos',
        'Galería': 'Galerie',
        'Viajes': 'Voyages',
        'Cámaras': 'Webcams',
        'Alquiler': 'Location d\'Équipement',
        'Precios': 'Tarifs',
        'Blog': 'Blog',
        'Reserva': 'Réserver',
        'Inicio': 'Accueil',
        'Contacto': 'Contact',
        
        # Legal
        'Aviso Legal': 'Mentions Légales',
        'Política de Privacidad': 'Politique de Confidentialité',
        'Política de Cookies': 'Politique des Cookies',
        'Política de Cancelación': 'Politique d\'Annulation',
    }
}

def fix_html_file(file_path: Path, target_lang: str) -> int:
    """
    Fix an HTML file by replacing Spanish content with target language
    Returns number of replacements made
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        replacements = 0
        
        # Get translation dictionary for target language
        trans_dict = TRANSLATIONS.get(target_lang, {})
        
        # Replace each Spanish term with its translation
        for spanish, translation in trans_dict.items():
            # Use word boundaries to avoid partial replacements
            pattern = re.compile(r'\b' + re.escape(spanish) + r'\b')
            matches = len(pattern.findall(content))
            if matches > 0:
                content = pattern.sub(translation, content)
                replacements += matches
        
        # Update lang attribute if it's set to Spanish
        if '<html lang="es">' in content and target_lang != 'es':
            content = content.replace('<html lang="es">', f'<html lang="{target_lang}">')
            replacements += 1
        
        # Write back if changes were made
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return replacements
        
        return 0
        
    except Exception as e:
        print(f"⚠️  Error processing {file_path}: {e}")
        return 0

def fix_language_directory(lang_code: str) -> Dict[str, int]:
    """
    Fix all HTML files in a language directory
    Returns dictionary of file: replacement_count
    """
    lang_dir = Path(lang_code)
    if not lang_dir.exists():
        print(f"❌ Directory {lang_code}/ does not exist")
        return {}
    
    results = {}
    html_files = list(lang_dir.rglob('*.html'))
    
    print(f"\n🔧 Fixing HTML files in {lang_code}/ directory...")
    print(f"   Found {len(html_files)} HTML files")
    
    for html_file in html_files:
        replacements = fix_html_file(html_file, lang_code)
        if replacements > 0:
            relative_path = str(html_file)
            results[relative_path] = replacements
            print(f"   ✓ {relative_path}: {replacements} replacements")
    
    return results

def main():
    print("=" * 70)
    print("Alpine Ski Academy - Translation Fixer")
    print("=" * 70)
    print("\nFixing HTML files with incorrect Spanish content...")
    
    all_results = {}
    
    # Fix each language directory
    for lang in ['en', 'pt', 'ca', 'fr']:
        results = fix_language_directory(lang)
        all_results[lang] = results
    
    # Print summary
    print("\n" + "=" * 70)
    print("📊 Summary:")
    print("=" * 70)
    
    for lang, results in all_results.items():
        if results:
            total_replacements = sum(results.values())
            print(f"\n{lang.upper()}: {len(results)} files fixed, {total_replacements} total replacements")
            for file, count in sorted(results.items())[:5]:  # Show first 5
                print(f"  • {file}: {count} replacements")
            if len(results) > 5:
                print(f"  ... and {len(results) - 5} more files")
        else:
            print(f"\n{lang.upper()}: No files needed fixing")
    
    print("\n" + "=" * 70)
    print("✅ Translation fixing complete!")
    print("=" * 70)

if __name__ == '__main__':
    main()
