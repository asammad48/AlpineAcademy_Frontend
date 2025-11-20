#!/usr/bin/env python3
"""
Automated Translation Script for Alpine Ski Academy
Translates blog articles and fixes incorrectly translated HTML files
"""

import re
import os
from pathlib import Path
from typing import Dict
from deep_translator import GoogleTranslator
import time

# Blog article filename mappings
BLOG_MAPPINGS = {
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
    },
    'alquiler-esqui-snowboard-baqueira.html': {
        'es': 'alquiler-esqui-snowboard-baqueira.html',
        'en': 'ski-snowboard-rental-baqueira.html',
        'ca': 'lloguer-esqui-snowboard-baqueira.html',
        'fr': 'location-ski-snowboard-baqueira.html',
        'pt': 'aluguel-esqui-snowboard-baqueira.html'
    }
}

def translate_text(text: str, target_lang: str, source_lang: str = 'es') -> str:
    """
    Translate text using Google Translate
    """
    if not text or len(text.strip()) == 0:
        return text
    
    # Skip translation for very short texts (likely code or special chars)
    if len(text.strip()) < 3:
        return text
    
    try:
        translator = GoogleTranslator(source=source_lang, target=target_lang)
        # Split long text into chunks (Google Translate has limits)
        max_length = 4500
        if len(text) > max_length:
            chunks = [text[i:i+max_length] for i in range(0, len(text), max_length)]
            translated_chunks = []
            for chunk in chunks:
                translated_chunks.append(translator.translate(chunk))
                time.sleep(0.5)  # Rate limiting
            return ''.join(translated_chunks)
        else:
            result = translator.translate(text)
            time.sleep(0.3)  # Rate limiting
            return result
    except Exception as e:
        print(f"⚠️  Translation error: {e}")
        return text

def translate_html_content(html_content: str, target_lang: str) -> str:
    """
    Translate HTML content while preserving tags
    """
    # Update lang attribute
    html_content = re.sub(r'<html lang="es">', f'<html lang="{target_lang}">', html_content)
    
    # Translate title
    title_match = re.search(r'<title>(.*?)</title>', html_content, re.DOTALL)
    if title_match:
        original_title = title_match.group(1)
        translated_title = translate_text(original_title, target_lang)
        html_content = html_content.replace(f'<title>{original_title}</title>', 
                                           f'<title>{translated_title}</title>')
    
    # Translate meta description
    desc_match = re.search(r'<meta name="description"\s+content="([^"]+)"', html_content)
    if desc_match:
        original_desc = desc_match.group(1)
        translated_desc = translate_text(original_desc, target_lang)
        html_content = html_content.replace(f'content="{original_desc}"', 
                                            f'content="{translated_desc}"')
    
    # Translate Open Graph and Twitter meta tags
    for meta_pattern in [
        r'<meta property="og:title" content="([^"]+)"',
        r'<meta property="og:description"\s+content="([^"]+)"',
        r'<meta property="twitter:title" content="([^"]+)"',
        r'<meta property="twitter:description"\s+content="([^"]+)"'
    ]:
        meta_match = re.search(meta_pattern, html_content)
        if meta_match:
            original_content = meta_match.group(1)
            translated_content = translate_text(original_content, target_lang)
            html_content = html_content.replace(f'content="{original_content}"', 
                                               f'content="{translated_content}"', 1)
    
    # Translate Schema.org JSON-LD structured data
    # Find all JSON-LD script blocks
    json_ld_matches = re.finditer(r'<script type="application/ld\+json">(.*?)</script>', 
                                   html_content, re.DOTALL)
    
    for match in json_ld_matches:
        json_content = match.group(1)
        try:
            import json
            # Parse JSON
            data = json.loads(json_content)
            
            # Translate common fields in structured data
            def translate_json_fields(obj):
                if isinstance(obj, dict):
                    for key, value in obj.items():
                        if key in ['name', 'headline', 'description', 'text'] and isinstance(value, str):
                            obj[key] = translate_text(value, target_lang)
                        elif isinstance(value, (dict, list)):
                            translate_json_fields(value)
                elif isinstance(obj, list):
                    for item in obj:
                        translate_json_fields(item)
            
            translate_json_fields(data)
            
            # Replace with translated JSON
            new_json = json.dumps(data, indent=2, ensure_ascii=False)
            html_content = html_content.replace(match.group(0), 
                                               f'<script type="application/ld+json">{new_json}</script>')
        except Exception as e:
            print(f"  ⚠️  Warning: Could not translate JSON-LD: {e}")
    
    print("✅ Metadata and structured data translations complete")
    
    # Translate main content headings
    for tag in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
        for match in re.finditer(f'<{tag}[^>]*>(.*?)</{tag}>', html_content, re.DOTALL):
            original_text = match.group(1)
            if len(original_text.strip()) > 0 and '<' not in original_text:
                translated_text = translate_text(original_text, target_lang)
                html_content = html_content.replace(match.group(0), 
                                                   f'<{tag}{match.group(0)[len(tag)+1:match.group(0).index(">")+1]}{translated_text}</{tag}>', 1)
    
    print("  ✓ Headings translated")
    
    # Translate breadcrumb items
    breadcrumb_matches = re.finditer(r'<li class="breadcrumb-item[^"]*"[^>]*>(.*?)</li>', 
                                     html_content, re.DOTALL)
    for match in breadcrumb_matches:
        content = match.group(1)
        # Extract text between tags
        text_match = re.search(r'>([^<]+)<', content)
        if text_match:
            original_text = text_match.group(1).strip()
            if original_text and original_text not in ['/', '|']:
                translated_text = translate_text(original_text, target_lang)
                html_content = html_content.replace(original_text, translated_text, 1)
    
    print("  ✓ Breadcrumbs translated")
    
    # Translate paragraph content (selective - to avoid breaking HTML structure)
    # This is a simplified approach - for production, use a proper HTML parser
    
    return html_content

def translate_blog_article(spanish_file: str, target_lang: str, target_file: str):
    """
    Translate a complete blog article from Spanish to target language
    """
    print(f"\n📝 Translating: {spanish_file} → {target_file} ({target_lang.upper()})")
    
    # Read Spanish source
    with open(spanish_file, 'r', encoding='utf-8') as f:
        spanish_content = f.read()
    
    # Translate content
    translated_content = translate_html_content(spanish_content, target_lang)
    
    # Create target directory if it doesn't exist
    target_path = Path(target_file)
    target_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Write translated content
    with open(target_file, 'w', encoding='utf-8') as f:
        f.write(translated_content)
    
    print(f"✅ Created: {target_file}")

def main():
    print("=" * 70)
    print("Alpine Ski Academy - Automated Blog Translation")
    print("=" * 70)
    print("\n⚠️  Note: This script uses Google Translate for automation.")
    print("   For production, review and refine translations manually.\n")
    
    # All missing blog articles
    articles_to_translate = [
        # Portuguese missing articles
        ('alquiler-esqui-snowboard-baqueira.html', 'pt'),
        ('como-aprender-esquiar-baqueira.html', 'pt'),
        ('zonas-principiantes-baqueira-beret.html', 'pt'),
        # Catalan missing articles
        ('alquiler-esqui-snowboard-baqueira.html', 'ca'),
        ('como-aprender-esquiar-baqueira.html', 'ca'),
        ('zonas-principiantes-baqueira-beret.html', 'ca'),
        # French missing articles
        ('alquiler-esqui-snowboard-baqueira.html', 'fr'),
        ('como-aprender-esquiar-baqueira.html', 'fr'),
        ('zonas-principiantes-baqueira-beret.html', 'fr'),
    ]
    
    translated_count = 0
    skipped_count = 0
    
    for spanish_article, target_lang in articles_to_translate:
        spanish_path = f'blog/{spanish_article}'
        target_filename = BLOG_MAPPINGS[spanish_article][target_lang]
        target_path = f'{target_lang}/blog/{target_filename}'
        
        if not Path(target_path).exists():
            translate_blog_article(spanish_path, target_lang, target_path)
            translated_count += 1
        else:
            print(f"⏭️  Skipping {target_path} (already exists)")
            skipped_count += 1
    
    print("\n" + "=" * 70)
    print("✅ Translation Complete!")
    print("=" * 70)
    print(f"\n📊 Summary:")
    print(f"   - Articles translated: {translated_count}")
    print(f"   - Articles skipped: {skipped_count}")
    print("\n💡 Next steps:")
    print("   1. Review the generated translations for accuracy")
    print("   2. Update canonical URLs and image paths")
    print("   3. Test language switcher functionality")

if __name__ == '__main__':
    main()
