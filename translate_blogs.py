#!/usr/bin/env python3
"""
Blog Translation Script for Alpine Ski Academy
Translates Spanish blog articles to English, Portuguese, Catalan, and French
"""

import re
import os
from pathlib import Path
from typing import Dict, List, Tuple
import json

# Blog article filename mappings (from language.js)
BLOG_MAPPINGS = {
    'como-llegar-baqueira-beret.html': {
        'es': 'como-llegar-baqueira-beret.html',
        'en': 'how-to-get-to-baqueira-beret.html',
        'ca': 'com-arribar-a-baqueira-beret.html',
        'fr': 'comment-arriver-a-baqueira-beret.html',
        'pt': 'como-chegar-a-baqueira-beret.html'
    },
    'mejores-restaurantes-baqueira-beret.html': {
        'es': 'mejores-restaurantes-baqueira-beret.html',
        'en': 'best-restaurants-baqueira-beret.html',
        'ca': 'millors-restaurants-baqueira-beret.html',
        'fr': 'meilleurs-restaurants-baqueira-beret.html',
        'pt': 'melhores-restaurantes-baqueira-beret.html'
    },
    'mejores-hoteles-familias-baqueira-beret.html': {
        'es': 'mejores-hoteles-familias-baqueira-beret.html',
        'en': 'best-family-hotels-baqueira-beret.html',
        'ca': 'millors-hotels-families-baqueira-beret.html',
        'fr': 'meilleurs-hotels-familles-baqueira-beret.html',
        'pt': 'melhores-hoteis-familias-baqueira-beret.html'
    },
    'las-mejores-apps-para-esquiar-en-baqueira-beret.html': {
        'es': 'las-mejores-apps-para-esquiar-en-baqueira-beret.html',
        'en': 'best-apps-for-skiing-baqueira-beret.html',
        'ca': 'millors-apps-per-esquiar-baqueira-beret.html',
        'fr': 'meilleures-apps-pour-skier-baqueira-beret.html',
        'pt': 'melhores-apps-para-esquiar-baqueira-beret.html'
    },
    'alquiler-esqui-snowboard-baqueira.html': {
        'es': 'alquiler-esqui-snowboard-baqueira.html',
        'en': 'ski-snowboard-rental-baqueira.html',
        'ca': 'lloguer-esqui-snowboard-baqueira.html',
        'fr': 'location-ski-snowboard-baqueira.html',
        'pt': 'aluguel-esqui-snowboard-baqueira.html'
    },
    'como-aprender-esquiar-baqueira.html': {
        'es': 'como-aprender-esquiar-baqueira.html',
        'en': 'how-to-learn-skiing-baqueira.html',
        'ca': 'com-aprendre-esquiar-baqueira.html',
        'fr': 'comment-apprendre-skier-baqueira.html',
        'pt': 'como-aprender-esquiar-baqueira.html'
    },
    'zonas-principiantes-baqueira-beret.html': {
        'es': 'zonas-principiantes-baqueira-beret.html',
        'en': 'beginner-areas-baqueira-beret.html',
        'ca': 'zones-principiants-baqueira-beret.html',
        'fr': 'zones-debutants-baqueira-beret.html',
        'pt': 'zonas-iniciantes-baqueira-beret.html'
    }
}

# Translation dictionaries for common terms
TRANSLATIONS = {
    'en': {
        'lang': 'en',
        'Blog': 'Blog',
        'Leer Más': 'Read More',
        'de marzo': 'March',
        'de febrero': 'February',
        'de enero': 'January',
        'de diciembre': 'December',
        'de noviembre': 'November',
        'Home': 'Home',
        'Blog de esquí': 'Ski Blog',
        'Alpine Ski Academy': 'Alpine Ski Academy',
        'Tu escuela de esquí': 'Your ski school',
        'Clases personalizadas': 'Personalized lessons',
        'Servicios': 'Services',
        'Company': 'Company',
        'Contacto': 'Contact',
        'Nosotros': 'About Us',
        'Viajes': 'Trips',
        'Precios': 'Prices',
        'Clases Esquí': 'Ski Lessons',
        'Clases Snowboard': 'Snowboard Lessons',
        'Cámaras': 'Webcams',
        'Alquiler Material': 'Equipment Rental',
        'Contacto / Reserva': 'Contact / Booking',
        'Aviso Legal': 'Legal Notice',
        'Política de Privacidad': 'Privacy Policy',
        'Política de Cookies': 'Cookie Policy',
        'Política de Cancelación': 'Cancellation Policy',
        'Enlaces legales': 'Legal Links'
    },
    'pt': {
        'lang': 'pt',
        'Blog': 'Blog',
        'Leer Más': 'Ler Mais',
        'de marzo': 'março',
        'de febrero': 'fevereiro',
        'de enero': 'janeiro',
        'de diciembre': 'dezembro',
        'de noviembre': 'novembro',
        'Home': 'Início',
        'Blog de esquí': 'Blog de esqui',
        'Alpine Ski Academy': 'Alpine Ski Academy',
        'Tu escuela de esquí': 'Sua escola de esqui',
        'Clases personalizadas': 'Aulas personalizadas',
        'Servicios': 'Serviços',
        'Company': 'Empresa',
        'Contacto': 'Contato',
        'Nosotros': 'Sobre Nós',
        'Viajes': 'Viagens',
        'Precios': 'Preços',
        'Clases Esquí': 'Aulas de Esqui',
        'Clases Snowboard': 'Aulas de Snowboard',
        'Cámaras': 'Webcams',
        'Alquiler Material': 'Aluguel de Equipamento',
        'Contacto / Reserva': 'Contato / Reserva',
        'Aviso Legal': 'Aviso Legal',
        'Política de Privacidad': 'Política de Privacidade',
        'Política de Cookies': 'Política de Cookies',
        'Política de Cancelación': 'Política de Cancelamento',
        'Enlaces legales': 'Links Legais'
    },
    'ca': {
        'lang': 'ca',
        'Blog': 'Blog',
        'Leer Más': 'Llegir Més',
        'de marzo': 'març',
        'de febrero': 'febrer',
        'de enero': 'gener',
        'de diciembre': 'desembre',
        'de noviembre': 'novembre',
        'Home': 'Inici',
        'Blog de esquí': 'Blog d\'esquí',
        'Alpine Ski Academy': 'Alpine Ski Academy',
        'Tu escuela de esquí': 'La teva escola d\'esquí',
        'Clases personalizadas': 'Classes personalitzades',
        'Servicios': 'Serveis',
        'Company': 'Empresa',
        'Contacto': 'Contacte',
        'Nosotros': 'Nosaltres',
        'Viajes': 'Viatges',
        'Precios': 'Preus',
        'Clases Esquí': 'Classes d\'Esquí',
        'Clases Snowboard': 'Classes de Snowboard',
        'Cámaras': 'Càmeres web',
        'Alquiler Material': 'Lloguer de Material',
        'Contacto / Reserva': 'Contacte / Reserva',
        'Aviso Legal': 'Avís Legal',
        'Política de Privacidad': 'Política de Privadesa',
        'Política de Cookies': 'Política de Cookies',
        'Política de Cancelación': 'Política de Cancel·lació',
        'Enlaces legales': 'Enllaços legals'
    },
    'fr': {
        'lang': 'fr',
        'Blog': 'Blog',
        'Leer Más': 'Lire Plus',
        'de marzo': 'mars',
        'de febrero': 'février',
        'de enero': 'janvier',
        'de diciembre': 'décembre',
        'de noviembre': 'novembre',
        'Home': 'Accueil',
        'Blog de esquí': 'Blog de ski',
        'Alpine Ski Academy': 'Alpine Ski Academy',
        'Tu escuela de esquí': 'Votre école de ski',
        'Clases personalizadas': 'Cours personnalisés',
        'Servicios': 'Services',
        'Company': 'Entreprise',
        'Contacto': 'Contact',
        'Nosotros': 'À Propos',
        'Viajes': 'Voyages',
        'Precios': 'Tarifs',
        'Clases Esquí': 'Cours de Ski',
        'Clases Snowboard': 'Cours de Snowboard',
        'Cámaras': 'Webcams',
        'Alquiler Material': 'Location d\'Équipement',
        'Contacto / Reserva': 'Contact / Réservation',
        'Aviso Legal': 'Mentions Légales',
        'Política de Privacidad': 'Politique de Confidentialité',
        'Política de Cookies': 'Politique des Cookies',
        'Política de Cancelación': 'Politique d\'Annulation',
        'Enlaces legales': 'Liens légaux'
    }
}

def translate_text(text: str, target_lang: str) -> str:
    """
    Simple translation using dictionaries.
    For production, this should use a real translation API.
    """
    if target_lang not in TRANSLATIONS:
        return text
    
    trans_dict = TRANSLATIONS[target_lang]
    
    # Replace common terms
    result = text
    for spanish, translation in trans_dict.items():
        if spanish != 'lang':
            result = result.replace(spanish, translation)
    
    return result

def get_blog_articles() -> List[str]:
    """Get list of Spanish blog articles"""
    blog_dir = Path('blog')
    if not blog_dir.exists():
        return []
    
    articles = []
    for file in blog_dir.glob('*.html'):
        if file.name in BLOG_MAPPINGS:
            articles.append(file.name)
    
    return articles

def audit_translations():
    """Audit existing translation files for incorrect content"""
    print("🔍 Auditing translation files...")
    
    issues = []
    for lang_dir in ['en', 'pt', 'ca', 'fr']:
        dir_path = Path(lang_dir)
        if not dir_path.exists():
            continue
        
        for html_file in dir_path.rglob('*.html'):
            try:
                content = html_file.read_text(encoding='utf-8')
                
                # Check if file has Spanish lang attribute when it shouldn't
                if f'<html lang="es">' in content and lang_dir != 'es':
                    issues.append(f"❌ {html_file}: Has Spanish lang attribute")
                
                # Check for Spanish-only content indicators
                spanish_indicators = ['Clases Esquí', 'Nosotros', 'Contacto', 'Precios']
                has_spanish = any(indicator in content for indicator in spanish_indicators)
                
                if has_spanish and lang_dir == 'en':
                    issues.append(f"⚠️  {html_file}: Contains Spanish content")
                    
            except Exception as e:
                issues.append(f"⚠️  {html_file}: Error reading - {e}")
    
    if issues:
        print("\n📋 Translation Issues Found:")
        for issue in issues[:20]:  # Limit output
            print(f"  {issue}")
        print(f"\nTotal issues: {len(issues)}")
    else:
        print("✅ No translation issues found!")
    
    return issues

def generate_manifest():
    """Generate a manifest of all blog articles to translate"""
    manifest = {
        'blog_articles': [],
        'target_languages': ['en', 'pt', 'ca', 'fr']
    }
    
    for spanish_file, mappings in BLOG_MAPPINGS.items():
        article_info = {
            'spanish_file': f'blog/{spanish_file}',
            'translations': {}
        }
        
        for lang in manifest['target_languages']:
            target_file = mappings[lang]
            article_info['translations'][lang] = f'{lang}/blog/{target_file}'
        
        manifest['blog_articles'].append(article_info)
    
    # Save manifest
    with open('translation_manifest.json', 'w') as f:
        json.dump(manifest, f, indent=2)
    
    print("📄 Translation manifest generated: translation_manifest.json")
    return manifest

def check_missing_files(manifest):
    """Check which blog articles are missing in each language"""
    print("\n📊 Checking for missing blog articles...\n")
    
    missing = {}
    for lang in manifest['target_languages']:
        missing[lang] = []
        
        for article in manifest['blog_articles']:
            target_path = Path(article['translations'][lang])
            if not target_path.exists():
                missing[lang].append(target_path.name)
    
    for lang, files in missing.items():
        if files:
            print(f"🔴 {lang.upper()}: Missing {len(files)} article(s)")
            for file in files:
                print(f"   - {file}")
        else:
            print(f"✅ {lang.upper()}: All articles present")
    
    return missing

def main():
    print("=" * 60)
    print("Alpine Ski Academy - Blog Translation Utility")
    print("=" * 60)
    print()
    
    # Generate manifest
    manifest = generate_manifest()
    
    # Check missing files
    missing = check_missing_files(manifest)
    
    # Audit existing translations
    print("\n" + "=" * 60)
    audit_issues = audit_translations()
    
    print("\n" + "=" * 60)
    print("📈 Summary:")
    print(f"  - Total blog articles: {len(manifest['blog_articles'])}")
    print(f"  - Target languages: {len(manifest['target_languages'])}")
    
    total_missing = sum(len(files) for files in missing.values())
    print(f"  - Missing translations: {total_missing}")
    print(f"  - Files with issues: {len(audit_issues)}")
    
    print("\n💡 Note: This is an audit script. Use a translation API")
    print("   (like DeepL or LibreTranslate) for actual translations.")
    print("=" * 60)

if __name__ == '__main__':
    main()
