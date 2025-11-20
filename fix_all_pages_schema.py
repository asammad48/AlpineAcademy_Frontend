#!/usr/bin/env python3
"""
Fix Schema.org JSON-LD, meta tags, and breadcrumbs in all translated pages
"""

import re
import json
from pathlib import Path
from deep_translator import GoogleTranslator
import time

def translate_text(text: str, target_lang: str) -> str:
    """Translate text using Google Translate"""
    if not text or len(text.strip()) < 3:
        return text
    try:
        translator = GoogleTranslator(source='es', target=target_lang)
        result = translator.translate(text)
        time.sleep(0.2)
        return result
    except:
        return text

def fix_page(file_path: Path, target_lang: str):
    """Fix all translatable content in a page"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    changes = []
    
    # Fix title tag if it contains Spanish
    title_match = re.search(r'<title>([^<]+)</title>', content)
    if title_match:
        title = title_match.group(1)
        if any(word in title for word in ['esquí', 'Clases', 'Baqueira', 'mejores', 'cómo']):
            new_title = translate_text(title, target_lang)
            content = content.replace(f'<title>{title}</title>', f'<title>{new_title}</title>')
            changes.append('title')
    
    # Fix meta description
    desc_match = re.search(r'<meta name="description" content="([^"]+)"', content)
    if desc_match:
        desc = desc_match.group(1)
        if any(word in desc for word in ['esquí', 'Clases', 'mejores', 'cómo', 'para']):
            new_desc = translate_text(desc, target_lang)
            content = content.replace(f'content="{desc}"', f'content="{new_desc}"', 1)
            changes.append('meta-desc')
    
    # Fix Open Graph and Twitter meta
    for meta_attr in ['og:title', 'og:description', 'twitter:title', 'twitter:description']:
        pattern = rf'<meta property="{meta_attr}" content="([^"]+)"'
        meta_match = re.search(pattern, content)
        if meta_match:
            meta_content = meta_match.group(1)
            if any(word in meta_content for word in ['esquí', 'Clases', 'mejores', 'cómo']):
                new_content = translate_text(meta_content, target_lang)
                content = content.replace(f'content="{meta_content}"', f'content="{new_content}"', 1)
                changes.append(meta_attr)
    
    # Fix Schema.org JSON-LD
    json_ld_matches = list(re.finditer(r'<script type="application/ld\+json">\s*(.*?)\s*</script>', 
                                        content, re.DOTALL))
    
    for match in json_ld_matches:
        json_content = match.group(1).strip()
        try:
            data = json.loads(json_content)
            
            def translate_json_fields(obj):
                if isinstance(obj, dict):
                    for key, value in obj.items():
                        if key in ['name', 'headline', 'description', 'text'] and isinstance(value, str):
                            if any(word in value for word in ['esquí', 'Clases', 'Baqueira', 'mejores', 'cómo', 'Inicio']):
                                obj[key] = translate_text(value, target_lang)
                        elif isinstance(value, (dict, list)):
                            translate_json_fields(value)
                elif isinstance(obj, list):
                    for item in obj:
                        translate_json_fields(item)
            
            translate_json_fields(data)
            
            new_json = json.dumps(data, indent=2, ensure_ascii=False)
            # Preserve original indentation
            content = content.replace(match.group(0), 
                                     f'<script type="application/ld+json">\n    {new_json}\n    </script>')
            changes.append('schema')
        except Exception as e:
            pass  # Skip if can't parse
    
    # Fix breadcrumbs
    breadcrumb_matches = list(re.finditer(r'<li class="breadcrumb-item[^"]*"[^>]*>(<a[^>]*>)?([^<]+)(</a>)?</li>', content))
    for match in breadcrumb_matches:
        text = match.group(2).strip()
        if text and any(word in text for word in ['Inicio', 'Blog', 'Contacto', 'Servicios']):
            new_text = translate_text(text, target_lang)
            content = content.replace(match.group(0), match.group(0).replace(text, new_text), 1)
            changes.append('breadcrumb')
    
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return len(changes)
    return 0

def main():
    print("=" * 70)
    print("Fix Schema.org, Meta Tags, and Breadcrumbs in All Translated Pages")
    print("=" * 70)
    
    for lang in ['en', 'pt', 'ca', 'fr']:
        lang_dir = Path(lang)
        if not lang_dir.exists():
            continue
        
        print(f"\n📂 Processing {lang.upper()} pages...")
        html_files = list(lang_dir.rglob('*.html'))
        
        fixed_count = 0
        total_changes = 0
        
        for html_file in html_files:
            changes = fix_page(html_file, lang)
            if changes > 0:
                fixed_count += 1
                total_changes += changes
                print(f"  ✓ {html_file}: {changes} changes")
        
        print(f"  📊 {lang.upper()}: {fixed_count} files fixed, {total_changes} total changes")
    
    print("\n" + "=" * 70)
    print("✅ Complete!")
    print("=" * 70)

if __name__ == '__main__':
    main()
