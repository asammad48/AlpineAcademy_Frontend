#!/usr/bin/env python3
import os
import re
from pathlib import Path

def fix_images_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    modifications = 0
    
    # Pattern to match img tags that don't already have img-fluid class
    # This pattern handles both self-closing and regular img tags
    def replace_img(match):
        nonlocal modifications
        img_tag = match.group(0)
        
        # Skip if already has img-fluid class
        if 'img-fluid' in img_tag:
            return img_tag
        
        # Skip logo images in navbar (they should stay fixed size)
        if 'logo' in img_tag.lower() and 'navbar-brand' in content[max(0, match.start()-200):match.start()]:
            return img_tag
        
        # Skip flag images (they're already sized correctly)
        if 'flagcdn.com' in img_tag or 'Flag_of_Catalonia' in img_tag:
            return img_tag
        
        # Add img-fluid class
        if 'class="' in img_tag:
            # Add to existing class attribute
            new_tag = img_tag.replace('class="', 'class="img-fluid ')
        else:
            # Add new class attribute before src or at the end
            if 'src=' in img_tag:
                new_tag = img_tag.replace('src=', 'class="img-fluid" src=')
            else:
                # Insert before the closing >
                new_tag = img_tag.replace('>', ' class="img-fluid">')
        
        modifications += 1
        return new_tag
    
    # Match img tags (both self-closing and regular)
    content = re.sub(r'<img[^>]*>', replace_img, content)
    
    if modifications > 0:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return modifications
    
    return 0

def main():
    # Find all HTML files except blog
    html_files = []
    
    # Root HTML files
    for file in Path('.').glob('*.html'):
        html_files.append(file)
    
    # Subdirectory HTML files (en, fr, ca, pt, etc.)
    for subdir in ['en', 'fr', 'ca', 'pt', 'clases-esqui-baqueira']:
        if os.path.exists(subdir):
            for file in Path(subdir).glob('*.html'):
                html_files.append(file)
    
    total_files = 0
    total_modifications = 0
    
    print(f"Found {len(html_files)} HTML files to process...")
    
    for filepath in html_files:
        mods = fix_images_in_file(filepath)
        if mods > 0:
            total_files += 1
            total_modifications += mods
            print(f"✓ {filepath}: Fixed {mods} images")
    
    print(f"\n{'='*60}")
    print(f"SUMMARY:")
    print(f"  Files modified: {total_files}")
    print(f"  Total images fixed: {total_modifications}")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()
