#!/usr/bin/env python3
"""Fix metadata in galeria pages for all languages"""

import re

# Metadata for each language
METADATA = {
    'en': {
        'title': 'Gallery Alpine Ski Academy | Skiing and Snowboarding Images in Baqueira Beret',
        'description': 'Explore the official gallery of Alpine Ski Academy in Baqueira Beret. Photographs and videos of our ski and snowboard classes, moments on the slopes and unique Pyrenees landscapes.',
        'h1': 'Alpine Ski Academy Image Gallery',
        'intro': 'Discover the best moments of Alpine Ski Academy in Baqueira Beret, where each image tells a story about snow, teaching and the thrill of skiing in the Pyrenees. Our gallery brings together the most special moments from our ski and snowboard classes, the smiles of beginners, the technique of experts and the unique beauty of the mountains that surround us.',
        'file': 'en/gallery.html',
        'lang': 'en'
    },
    'ca': {
        'title': 'Galeria Alpine Ski Academy | Imatges d\'Esquí i Snowboard a Baqueira Beret',
        'description': 'Explora la galeria oficial d\'Alpine Ski Academy a Baqueira Beret. Fotografies i vídeos de les nostres classes d\'esquí i snowboard, moments a pista i paisatges únics del Pirineu.',
        'h1': 'Galeria d\'Imatges Alpine Ski Academy',
        'intro': 'Descobreix els millors moments d\'Alpine Ski Academy a Baqueira Beret, on cada imatge explica una història sobre la neu, l\'ensenyament i l\'emoció de lliscar pel Pirineu. La nostra galeria reuneix els instants més especials de les nostres classes d\'esquí i snowboard, el somriure dels debutants, la tècnica dels experts i la bellesa única de les muntanyes que ens envolten.',
        'file': 'ca/galeria.html',
        'lang': 'ca'
    },
    'fr': {
        'title': 'Galerie Alpine Ski Academy | Images de Ski et Snowboard à Baqueira Beret',
        'description': 'Explorez la galerie officielle d\'Alpine Ski Academy à Baqueira Beret. Photographies et vidéos de nos cours de ski et snowboard, moments sur piste et paysages uniques des Pyrénées.',
        'h1': 'Galerie d\'Images Alpine Ski Academy',
        'intro': 'Découvrez les meilleurs moments d\'Alpine Ski Academy à Baqueira Beret, où chaque image raconte une histoire sur la neige, l\'enseignement et l\'émotion de glisser dans les Pyrénées. Notre galerie rassemble les instants les plus spéciaux de nos cours de ski et snowboard, le sourire des débutants, la technique des experts et la beauté unique des montagnes qui nous entourent.',
        'file': 'fr/galerie.html',
        'lang': 'fr'
    },
    'pt': {
        'title': 'Galeria Alpine Ski Academy | Imagens de Esqui e Snowboard em Baqueira Beret',
        'description': 'Explore a galeria oficial da Alpine Ski Academy em Baqueira Beret. Fotografias e vídeos das nossas aulas de esqui e snowboard, momentos na pista e paisagens únicas dos Pirinéus.',
        'h1': 'Galeria de Imagens Alpine Ski Academy',
        'intro': 'Descubra os melhores momentos da Alpine Ski Academy em Baqueira Beret, onde cada imagem conta uma história sobre a neve, o ensino e a emoção de deslizar pelos Pirinéus. Nossa galeria reúne os momentos mais especiais de nossas aulas de esqui e snowboard, o sorriso dos iniciantes, a técnica dos especialistas e a beleza única das montanhas que nos rodeiam.',
        'file': 'pt/galeria.html',
        'lang': 'pt'
    }
}

def fix_metadata(lang_code, data):
    """Fix metadata for a specific language"""
    print(f"Fixing metadata for {lang_code}...")
    
    with open(data['file'], 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update title
    content = re.sub(
        r'<title>.*?</title>',
        f'<title>{data["title"]}</title>',
        content
    )
    
    # Update meta description
    content = re.sub(
        r'<meta name="description"\s+content="[^"]*"',
        f'<meta name="description" content="{data["description"]}"',
        content
    )
    
    # Update OG title
    content = re.sub(
        r'<meta property="og:title" content="[^"]*"',
        f'<meta property="og:title" content="{data["title"]}"',
        content
    )
    
    # Update OG description
    content = re.sub(
        r'<meta property="og:description"\s+content="[^"]*"',
        f'<meta property="og:description" content="{data["description"]}"',
        content
    )
    
    # Update Twitter title  
    content = re.sub(
        r'<meta property="twitter:title" content="[^"]*"',
        f'<meta property="twitter:title" content="{data["title"]}"',
        content
    )
    
    # Update Twitter description
    content = re.sub(
        r'<meta property="twitter:description"\s+content="[^"]*"',
        f'<meta property="twitter:description" content="{data["description"]}"',
        content
    )
    
    # Update H1
    content = re.sub(
        r'<h1 class="display-4 fw-bold mb-4">.*?</h1>',
        f'<h1 class="display-4 fw-bold mb-4">{data["h1"]}</h1>',
        content,
        flags=re.DOTALL
    )
    
    # Update intro paragraph
    content = re.sub(
        r'(<p class="lead mb-4">).*?(</p>)',
        f'\\1{data["intro"]}\\2',
        content,
        flags=re.DOTALL
    )
    
    with open(data['file'], 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✓ Fixed {data['file']}")

def main():
    print("=" * 60)
    print("FIXING GALERIA METADATA FOR ALL LANGUAGES")
    print("=" * 60)
    
    for lang_code, data in METADATA.items():
        fix_metadata(lang_code, data)
    
    print("\n✅ ALL METADATA FIXED!")

if __name__ == "__main__":
    main()
