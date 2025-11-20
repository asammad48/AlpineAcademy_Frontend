#!/usr/bin/env python3
import os
import re
import json

# Read the language.js file to extract page mappings
with open('js/components/language.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the pageMappings object
start = content.find('const pageMappings = {')
if start == -1:
    print("Could not find pageMappings")
    exit(1)

# Find the end of the object
brace_count = 0
start_pos = content.find('{', start)
i = start_pos
while i < len(content):
    if content[i] == '{':
        brace_count += 1
    elif content[i] == '}':
        brace_count -= 1
        if brace_count == 0:
            end_pos = i + 1
            break
    i += 1

mappings_str = content[start_pos:end_pos]

# Parse the mappings (simple approach - extract filename and Spanish version)
page_mappings = {}
# Pattern to match entries like 'filename.html': { es: 'spanish-file.html', ...}
pattern = r"'([^']+\.html)':\s*\{[^}]*es:\s*'([^']+\.html)'"
for match in re.finditer(pattern, mappings_str):
    filename = match.group(1)
    spanish_file = match.group(2)
    page_mappings[filename] = spanish_file

print(f"Extracted {len(page_mappings)} page mappings")

# Function to fix language selector in a file
def fix_language_selector(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    filename = os.path.basename(filepath)
    
    # Get the Spanish version for this file
    if filename not in page_mappings:
        return False
    
    spanish_url = '/' + page_mappings[filename]
    
    # Fix pattern 1: <a class="dropdown-item active language-option" href="#" data-lang="fr">
    #                     <img src="https://flagcdn.com/w40/es.png"...>Español
    # This is wrong - Spanish should not be active or have href="#" in subdirectories
    
    # Pattern to find Spanish language links with href="#"
    patterns = [
        # Pattern with "active" class and href="#"
        (r'<a\s+class="dropdown-item\s+active\s+language-option"\s+href="#"\s+data-lang="[^"]*">\s*<img\s+src="https://flagcdn\.com/w40/es\.png"[^>]*>[^<]*Español[^<]*</a>',
         f'<a class="dropdown-item language-option" href="{spanish_url}" data-lang="es">\n                                <img src="https://flagcdn.com/w40/es.png" width="20" height="15" alt="Spanish Flag" class="me-2">Español\n                            </a>'),
        # Pattern without "active" but still href="#"
        (r'<a\s+class="dropdown-item\s+language-option"\s+href="#"\s+data-lang="[^"]*">\s*<img\s+src="https://flagcdn\.com/w40/es\.png"[^>]*>[^<]*Español[^<]*</a>',
         f'<a class="dropdown-item language-option" href="{spanish_url}" data-lang="es">\n                                <img src="https://flagcdn.com/w40/es.png" width="20" height="15" alt="Spanish Flag" class="me-2">Español\n                            </a>')
    ]
    
    updated_content = content
    changed = False
    
    for pattern, replacement in patterns:
        if re.search(pattern, updated_content, re.IGNORECASE | re.DOTALL):
            updated_content = re.sub(pattern, replacement, updated_content, flags=re.IGNORECASE | re.DOTALL)
            changed = True
    
    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        return True
    
    return False

# Process all HTML files in language subdirectories
directories = ['fr', 'en', 'ca', 'pt']
total_checked = 0
total_fixed = 0

for lang_dir in directories:
    if not os.path.exists(lang_dir):
        continue
    
    print(f"\nProcessing {lang_dir} directory...")
    
    # Walk through the directory
    for root, dirs, files in os.walk(lang_dir):
        # Skip blog directories
        if 'blog' in dirs:
            dirs.remove('blog')
        
        for filename in files:
            if filename.endswith('.html'):
                filepath = os.path.join(root, filename)
                total_checked += 1
                if fix_language_selector(filepath):
                    print(f"  Fixed: {filepath}")
                    total_fixed += 1

print(f"\n✓ Processing complete! Checked {total_checked} files, fixed {total_fixed} files.")
