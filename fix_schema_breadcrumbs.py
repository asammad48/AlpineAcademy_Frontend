#!/usr/bin/env python3
"""
Fix Schema.org JSON-LD and breadcrumbs in translated blog articles
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
        time.sleep(0.3)
        return result
    except:
        return text

def fix_blog_file(file_path: Path, target_lang: str):
    """Fix Schema.org and breadcrumbs in a blog file"""
    print(f"\n🔧 Fixing: {file_path}")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    changes = 0
    
    # Fix Schema.org JSON-LD
    json_ld_matches = list(re.finditer(r'<script type="application/ld\+json">(.*?)</script>', 
                                        content, re.DOTALL))
    
    for match in json_ld_matches:
        json_content = match.group(1)
        try:
            data = json.loads(json_content)
            
            def translate_json_fields(obj):
                if isinstance(obj, dict):
                    for key, value in obj.items():
                        if key in ['name', 'headline', 'description', 'text'] and isinstance(value, str):
                            # Check if it's Spanish text (simple heuristic)
                            if any(word in value.lower() for word in ['cómo', 'los', 'las', 'para', 'esquí', 'mejores']):
                                obj[key] = translate_text(value, target_lang)
                        elif isinstance(value, (dict, list)):
                            translate_json_fields(value)
                elif isinstance(obj, list):
                    for item in obj:
                        translate_json_fields(item)
            
            translate_json_fields(data)
            
            new_json = json.dumps(data, indent=2, ensure_ascii=False)
            content = content.replace(match.group(0), 
                                     f'<script type="application/ld+json">{new_json}</script>')
            changes += 1
        except Exception as e:
            print(f"  ⚠️  Could not process JSON-LD: {e}")
    
    # Fix breadcrumb items
    breadcrumb_pattern = r'<li class="breadcrumb-item[^"]*"[^>]*>(<a[^>]*>)?([^<]+)(</a>)?</li>'
    breadcrumb_matches = list(re.finditer(breadcrumb_pattern, content))
    
    for match in breadcrumb_matches:
        original_text = match.group(2).strip()
        # Only translate if it's in Spanish
        if original_text and any(word in original_text for word in ['Inicio', 'Blog']):
            translated_text = translate_text(original_text, target_lang)
            content = content.replace(match.group(0), 
                                     match.group(0).replace(original_text, translated_text), 1)
            changes += 1
    
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✅ Fixed {changes} items")
        return changes
    else:
        print(f"  ⏭️  No changes needed")
        return 0

def main():
    print("=" * 70)
    print("Fix Schema.org and Breadcrumbs in Translated Blog Articles")
    print("=" * 70)
    
    total_fixes = 0
    
    for lang in ['en', 'pt', 'ca', 'fr']:
        blog_dir = Path(f'{lang}/blog')
        if not blog_dir.exists():
            continue
        
        print(f"\n📂 Processing {lang.upper()} blog articles...")
        blog_files = list(blog_dir.glob('*.html'))
        
        for blog_file in blog_files:
            fixes = fix_blog_file(blog_file, lang)
            total_fixes += fixes
    
    print("\n" + "=" * 70)
    print(f"✅ Complete! Total fixes: {total_fixes}")
    print("=" * 70)

if __name__ == '__main__':
    main()
