import os
import re
from urllib.parse import urlparse, unquote
from collections import defaultdict

def get_html_files():
    """Get all HTML files in the project"""
    html_files = []
    for root, dirs, files in os.walk('.'):
        # Skip hidden directories and node_modules
        dirs[:] = [d for d in dirs if not d.startswith('.') and d != 'node_modules']
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    return html_files

def extract_links(file_path):
    """Extract all links from an HTML file"""
    links = {
        'href': [],
        'src': []
    }
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
            # Extract href links
            href_pattern = r'href=["\']([^"\']+)["\']'
            links['href'] = re.findall(href_pattern, content)
            
            # Extract src links (images, scripts)
            src_pattern = r'src=["\']([^"\']+)["\']'
            links['src'] = re.findall(src_pattern, content)
            
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
    
    return links

def is_external_link(link):
    """Check if a link is external"""
    return link.startswith(('http://', 'https://', 'mailto:', 'tel:', 'whatsapp:', 'wa.me'))

def resolve_path(base_file, link):
    """Resolve a relative link to an absolute file path"""
    # Remove fragment/anchor
    link = link.split('#')[0]
    if not link:
        return None
    
    # Get the directory of the base file
    base_dir = os.path.dirname(base_file)
    
    # Handle root-relative paths
    if link.startswith('/'):
        link = link[1:]  # Remove leading slash
        resolved = link
    else:
        # Handle relative paths
        resolved = os.path.normpath(os.path.join(base_dir, link))
        if resolved.startswith('./'):
            resolved = resolved[2:]
    
    return resolved

def check_file_exists(file_path):
    """Check if a file exists"""
    return os.path.exists(file_path)

def main():
    html_files = get_html_files()
    broken_links = defaultdict(list)
    total_links = 0
    total_broken = 0
    
    print(f"Checking {len(html_files)} HTML files for broken links...\n")
    
    for html_file in html_files:
        links = extract_links(html_file)
        
        # Check href links
        for link in links['href']:
            if is_external_link(link):
                continue
            
            total_links += 1
            resolved = resolve_path(html_file, link)
            
            if resolved and not check_file_exists(resolved):
                broken_links[html_file].append({
                    'type': 'href',
                    'link': link,
                    'resolved': resolved
                })
                total_broken += 1
        
        # Check src links
        for link in links['src']:
            if is_external_link(link):
                continue
            
            total_links += 1
            resolved = resolve_path(html_file, link)
            
            if resolved and not check_file_exists(resolved):
                broken_links[html_file].append({
                    'type': 'src',
                    'link': link,
                    'resolved': resolved
                })
                total_broken += 1
    
    # Print results
    print(f"=" * 80)
    print(f"SUMMARY")
    print(f"=" * 80)
    print(f"Total links checked: {total_links}")
    print(f"Total broken links: {total_broken}")
    print(f"Files with broken links: {len(broken_links)}")
    print(f"=" * 80)
    print()
    
    if broken_links:
        print("BROKEN LINKS BY FILE:")
        print("=" * 80)
        
        # Group by type of error
        error_types = defaultdict(int)
        
        for file_path in sorted(broken_links.keys()):
            print(f"\n{file_path} ({len(broken_links[file_path])} broken links)")
            print("-" * 80)
            
            for broken in broken_links[file_path]:
                print(f"  [{broken['type']}] {broken['link']}")
                print(f"    -> Looking for: {broken['resolved']}")
                
                # Categorize error
                if '/en/' in broken['link'] or '/pt/' in broken['link'] or '/ca/' in broken['link'] or '/fr/' in broken['link']:
                    error_types['Language subfolder'] += 1
                elif broken['link'].endswith(('.jpg', '.png', '.webp', '.jpeg', '.gif', '.svg')):
                    error_types['Image'] += 1
                elif broken['link'].endswith('.html'):
                    error_types['HTML page'] += 1
                else:
                    error_types['Other'] += 1
        
        print("\n" + "=" * 80)
        print("ERROR TYPES:")
        print("=" * 80)
        for error_type, count in sorted(error_types.items(), key=lambda x: -x[1]):
            print(f"{error_type}: {count}")
    else:
        print("No broken links found!")

if __name__ == "__main__":
    main()
