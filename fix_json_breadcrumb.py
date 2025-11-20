#!/usr/bin/env python3
"""Fix JSON-LD breadcrumb syntax error in blog files"""

import re
from pathlib import Path

def fix_breadcrumb_json(filepath):
    """Fix JSON-LD breadcrumb closing structure"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Fix the malformed breadcrumb closing: "{}</script> should be "\n    }\n  ]\n}</script>
    content = content.replace('"{}</script>', '"\n    }\n  ]\n}</script>')
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("=" * 60)
    print("FIXING JSON-LD BREADCRUMB SYNTAX")
    print("=" * 60)
    
    fixed_count = 0
    
    # Fix all blog HTML files
    for blog_dir in ['blog', 'en/blog', 'ca/blog', 'fr/blog', 'pt/blog']:
        if Path(blog_dir).exists():
            for html_file in Path(blog_dir).glob('*.html'):
                if fix_breadcrumb_json(str(html_file)):
                    print(f"✓ Fixed {html_file}")
                    fixed_count += 1
    
    print("\n" + "=" * 60)
    print(f"✅ COMPLETED! Fixed {fixed_count} files")
    print("=" * 60)

if __name__ == "__main__":
    main()
