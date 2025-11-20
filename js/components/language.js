// Language switching functionality
document.addEventListener('DOMContentLoaded', function() {
  // Blog article filename mappings across languages
  const blogArticleMappings = {
    // Article 1: How to get to Baqueira
    'como-llegar-baqueira-beret.html': {
      es: 'como-llegar-baqueira-beret.html',
      en: 'how-to-get-to-baqueira-beret.html',
      ca: 'com-arribar-a-baqueira-beret.html',
      fr: 'comment-arriver-a-baqueira-beret.html',
      pt: 'como-chegar-a-baqueira-beret.html'
    },
    'how-to-get-to-baqueira-beret.html': {
      es: 'como-llegar-baqueira-beret.html',
      en: 'how-to-get-to-baqueira-beret.html',
      ca: 'com-arribar-a-baqueira-beret.html',
      fr: 'comment-arriver-a-baqueira-beret.html',
      pt: 'como-chegar-a-baqueira-beret.html'
    },
    'com-arribar-a-baqueira-beret.html': {
      es: 'como-llegar-baqueira-beret.html',
      en: 'how-to-get-to-baqueira-beret.html',
      ca: 'com-arribar-a-baqueira-beret.html',
      fr: 'comment-arriver-a-baqueira-beret.html',
      pt: 'como-chegar-a-baqueira-beret.html'
    },
    'comment-arriver-a-baqueira-beret.html': {
      es: 'como-llegar-baqueira-beret.html',
      en: 'how-to-get-to-baqueira-beret.html',
      ca: 'com-arribar-a-baqueira-beret.html',
      fr: 'comment-arriver-a-baqueira-beret.html',
      pt: 'como-chegar-a-baqueira-beret.html'
    },
    'como-chegar-a-baqueira-beret.html': {
      es: 'como-llegar-baqueira-beret.html',
      en: 'how-to-get-to-baqueira-beret.html',
      ca: 'com-arribar-a-baqueira-beret.html',
      fr: 'comment-arriver-a-baqueira-beret.html',
      pt: 'como-chegar-a-baqueira-beret.html'
    },
    
    // Article 2: Best restaurants
    'mejores-restaurantes-baqueira-beret.html': {
      es: 'mejores-restaurantes-baqueira-beret.html',
      en: 'best-restaurants-baqueira-beret.html',
      ca: 'millors-restaurants-baqueira-beret.html',
      fr: 'meilleurs-restaurants-baqueira-beret.html',
      pt: 'melhores-restaurantes-baqueira-beret.html'
    },
    'best-restaurants-baqueira-beret.html': {
      es: 'mejores-restaurantes-baqueira-beret.html',
      en: 'best-restaurants-baqueira-beret.html',
      ca: 'millors-restaurants-baqueira-beret.html',
      fr: 'meilleurs-restaurants-baqueira-beret.html',
      pt: 'melhores-restaurantes-baqueira-beret.html'
    },
    'millors-restaurants-baqueira-beret.html': {
      es: 'mejores-restaurantes-baqueira-beret.html',
      en: 'best-restaurants-baqueira-beret.html',
      ca: 'millors-restaurants-baqueira-beret.html',
      fr: 'meilleurs-restaurants-baqueira-beret.html',
      pt: 'melhores-restaurantes-baqueira-beret.html'
    },
    'meilleurs-restaurants-baqueira-beret.html': {
      es: 'mejores-restaurantes-baqueira-beret.html',
      en: 'best-restaurants-baqueira-beret.html',
      ca: 'millors-restaurants-baqueira-beret.html',
      fr: 'meilleurs-restaurants-baqueira-beret.html',
      pt: 'melhores-restaurantes-baqueira-beret.html'
    },
    'melhores-restaurantes-baqueira-beret.html': {
      es: 'mejores-restaurantes-baqueira-beret.html',
      en: 'best-restaurants-baqueira-beret.html',
      ca: 'millors-restaurants-baqueira-beret.html',
      fr: 'meilleurs-restaurants-baqueira-beret.html',
      pt: 'melhores-restaurantes-baqueira-beret.html'
    },
    
    // Article 3: Best family hotels
    'mejores-hoteles-familias-baqueira-beret.html': {
      es: 'mejores-hoteles-familias-baqueira-beret.html',
      en: 'best-family-hotels-baqueira-beret.html',
      ca: 'millors-hotels-families-baqueira-beret.html',
      fr: 'meilleurs-hotels-familles-baqueira-beret.html',
      pt: 'melhores-hoteis-familias-baqueira-beret.html'
    },
    'best-family-hotels-baqueira-beret.html': {
      es: 'mejores-hoteles-familias-baqueira-beret.html',
      en: 'best-family-hotels-baqueira-beret.html',
      ca: 'millors-hotels-families-baqueira-beret.html',
      fr: 'meilleurs-hotels-familles-baqueira-beret.html',
      pt: 'melhores-hoteis-familias-baqueira-beret.html'
    },
    'millors-hotels-families-baqueira-beret.html': {
      es: 'mejores-hoteles-familias-baqueira-beret.html',
      en: 'best-family-hotels-baqueira-beret.html',
      ca: 'millors-hotels-families-baqueira-beret.html',
      fr: 'meilleurs-hotels-familles-baqueira-beret.html',
      pt: 'melhores-hoteis-familias-baqueira-beret.html'
    },
    'meilleurs-hotels-familles-baqueira-beret.html': {
      es: 'mejores-hoteles-familias-baqueira-beret.html',
      en: 'best-family-hotels-baqueira-beret.html',
      ca: 'millors-hotels-families-baqueira-beret.html',
      fr: 'meilleurs-hotels-familles-baqueira-beret.html',
      pt: 'melhores-hoteis-familias-baqueira-beret.html'
    },
    'melhores-hoteis-familias-baqueira-beret.html': {
      es: 'mejores-hoteles-familias-baqueira-beret.html',
      en: 'best-family-hotels-baqueira-beret.html',
      ca: 'millors-hotels-families-baqueira-beret.html',
      fr: 'meilleurs-hotels-familles-baqueira-beret.html',
      pt: 'melhores-hoteis-familias-baqueira-beret.html'
    },
    
    // Article 4: Best apps for skiing
    'las-mejores-apps-para-esquiar-en-baqueira-beret.html': {
      es: 'las-mejores-apps-para-esquiar-en-baqueira-beret.html',
      en: 'best-ski-apps-baqueira-beret.html',
      ca: 'millors-apps-per-esquiar-baqueira-beret.html',
      fr: 'meilleures-apps-pour-skier-baqueira-beret.html',
      pt: 'melhores-apps-para-esquiar-baqueira-beret.html'
    },
    'best-ski-apps-baqueira-beret.html': {
      es: 'las-mejores-apps-para-esquiar-en-baqueira-beret.html',
      en: 'best-ski-apps-baqueira-beret.html',
      ca: 'millors-apps-per-esquiar-baqueira-beret.html',
      fr: 'meilleures-apps-pour-skier-baqueira-beret.html',
      pt: 'melhores-apps-para-esquiar-baqueira-beret.html'
    },
    'millors-apps-per-esquiar-baqueira-beret.html': {
      es: 'las-mejores-apps-para-esquiar-en-baqueira-beret.html',
      en: 'best-ski-apps-baqueira-beret.html',
      ca: 'millors-apps-per-esquiar-baqueira-beret.html',
      fr: 'meilleures-apps-pour-skier-baqueira-beret.html',
      pt: 'melhores-apps-para-esquiar-baqueira-beret.html'
    },
    'meilleures-apps-pour-skier-baqueira-beret.html': {
      es: 'las-mejores-apps-para-esquiar-en-baqueira-beret.html',
      en: 'best-ski-apps-baqueira-beret.html',
      ca: 'millors-apps-per-esquiar-baqueira-beret.html',
      fr: 'meilleures-apps-pour-skier-baqueira-beret.html',
      pt: 'melhores-apps-para-esquiar-baqueira-beret.html'
    },
    'melhores-apps-para-esquiar-baqueira-beret.html': {
      es: 'las-mejores-apps-para-esquiar-en-baqueira-beret.html',
      en: 'best-ski-apps-baqueira-beret.html',
      ca: 'millors-apps-per-esquiar-baqueira-beret.html',
      fr: 'meilleures-apps-pour-skier-baqueira-beret.html',
      pt: 'melhores-apps-para-esquiar-baqueira-beret.html'
    },
    
    // Article 5: Ski rental
    'alquiler-esqui-snowboard-baqueira.html': {
      es: 'alquiler-esqui-snowboard-baqueira.html',
      en: 'ski-snowboard-rental-baqueira.html',
      ca: 'lloguer-esqui-snowboard-baqueira.html',
      fr: 'location-ski-snowboard-baqueira.html',
      pt: 'aluguel-esqui-snowboard-baqueira.html'
    },
    'ski-snowboard-rental-baqueira.html': {
      es: 'alquiler-esqui-snowboard-baqueira.html',
      en: 'ski-snowboard-rental-baqueira.html',
      ca: 'lloguer-esqui-snowboard-baqueira.html',
      fr: 'location-ski-snowboard-baqueira.html',
      pt: 'aluguel-esqui-snowboard-baqueira.html'
    },
    'lloguer-esqui-snowboard-baqueira.html': {
      es: 'alquiler-esqui-snowboard-baqueira.html',
      en: 'ski-snowboard-rental-baqueira.html',
      ca: 'lloguer-esqui-snowboard-baqueira.html',
      fr: 'location-ski-snowboard-baqueira.html',
      pt: 'aluguel-esqui-snowboard-baqueira.html'
    },
    'location-ski-snowboard-baqueira.html': {
      es: 'alquiler-esqui-snowboard-baqueira.html',
      en: 'ski-snowboard-rental-baqueira.html',
      ca: 'lloguer-esqui-snowboard-baqueira.html',
      fr: 'location-ski-snowboard-baqueira.html',
      pt: 'aluguel-esqui-snowboard-baqueira.html'
    },
    'aluguel-esqui-snowboard-baqueira.html': {
      es: 'alquiler-esqui-snowboard-baqueira.html',
      en: 'ski-snowboard-rental-baqueira.html',
      ca: 'lloguer-esqui-snowboard-baqueira.html',
      fr: 'location-ski-snowboard-baqueira.html',
      pt: 'aluguel-esqui-snowboard-baqueira.html'
    },
    
    // Article 6: How to learn skiing
    'como-aprender-esquiar-baqueira.html': {
      es: 'como-aprender-esquiar-baqueira.html',
      en: 'how-to-learn-skiing-baqueira.html',
      ca: 'com-aprendre-esquiar-baqueira.html',
      fr: 'comment-apprendre-skier-baqueira.html',
      pt: 'como-aprender-esquiar-baqueira.html'
    },
    'how-to-learn-skiing-baqueira.html': {
      es: 'como-aprender-esquiar-baqueira.html',
      en: 'how-to-learn-skiing-baqueira.html',
      ca: 'com-aprendre-esquiar-baqueira.html',
      fr: 'comment-apprendre-skier-baqueira.html',
      pt: 'como-aprender-esquiar-baqueira.html'
    },
    'com-aprendre-esquiar-baqueira.html': {
      es: 'como-aprender-esquiar-baqueira.html',
      en: 'how-to-learn-skiing-baqueira.html',
      ca: 'com-aprendre-esquiar-baqueira.html',
      fr: 'comment-apprendre-skier-baqueira.html',
      pt: 'como-aprender-esquiar-baqueira.html'
    },
    'comment-apprendre-skier-baqueira.html': {
      es: 'como-aprender-esquiar-baqueira.html',
      en: 'how-to-learn-skiing-baqueira.html',
      ca: 'com-aprendre-esquiar-baqueira.html',
      fr: 'comment-apprendre-skier-baqueira.html',
      pt: 'como-aprender-esquiar-baqueira.html'
    },
    
    // Article 7: Beginner areas
    'zonas-principiantes-baqueira-beret.html': {
      es: 'zonas-principiantes-baqueira-beret.html',
      en: 'beginner-areas-baqueira-beret.html',
      ca: 'zones-principiants-baqueira-beret.html',
      fr: 'zones-debutants-baqueira-beret.html',
      pt: 'zonas-iniciantes-baqueira-beret.html'
    },
    'beginner-areas-baqueira-beret.html': {
      es: 'zonas-principiantes-baqueira-beret.html',
      en: 'beginner-areas-baqueira-beret.html',
      ca: 'zones-principiants-baqueira-beret.html',
      fr: 'zones-debutants-baqueira-beret.html',
      pt: 'zonas-iniciantes-baqueira-beret.html'
    },
    'zones-principiants-baqueira-beret.html': {
      es: 'zonas-principiantes-baqueira-beret.html',
      en: 'beginner-areas-baqueira-beret.html',
      ca: 'zones-principiants-baqueira-beret.html',
      fr: 'zones-debutants-baqueira-beret.html',
      pt: 'zonas-iniciantes-baqueira-beret.html'
    },
    'zones-debutants-baqueira-beret.html': {
      es: 'zonas-principiantes-baqueira-beret.html',
      en: 'beginner-areas-baqueira-beret.html',
      ca: 'zones-principiants-baqueira-beret.html',
      fr: 'zones-debutants-baqueira-beret.html',
      pt: 'zonas-iniciantes-baqueira-beret.html'
    },
    'zonas-iniciantes-baqueira-beret.html': {
      es: 'zonas-principiantes-baqueira-beret.html',
      en: 'beginner-areas-baqueira-beret.html',
      ca: 'zones-principiants-baqueira-beret.html',
      fr: 'zones-debutants-baqueira-beret.html',
      pt: 'zonas-iniciantes-baqueira-beret.html'
    }
  };
  
  // Function to handle language switching
  function switchLanguage(lang) {
    const currentPath = window.location.pathname;
    
    // Check if we're on a blog article
    const isBlogArticle = currentPath.includes('/blog/') && currentPath.split('/').pop() !== 'blog.html';
    
    if (isBlogArticle) {
      // Extract the current article filename
      const currentFilename = currentPath.split('/').pop();
      
      // Look up the mapping for this article
      if (blogArticleMappings[currentFilename]) {
        const targetFilename = blogArticleMappings[currentFilename][lang];
        
        // Build the target path
        let targetPath;
        if (lang === 'es') {
          targetPath = '/blog/' + targetFilename;
        } else {
          targetPath = '/' + lang + '/blog/' + targetFilename;
        }
        
        localStorage.setItem('preferredLanguage', lang);
        window.location.href = targetPath;
        return;
      }
    }
    
    // For non-blog pages or if mapping not found, use the original logic
    let pageName = currentPath.split('/').pop() || 'index.html';
    
    // If we're in a language subdirectory, get just the filename
    if (currentPath.includes('/en/') || currentPath.includes('/fr/') || 
        currentPath.includes('/pt/') || currentPath.includes('/ca/')) {
      pageName = currentPath.split('/').pop();
    }
    
    // Default to index.html if no page specified
    if (!pageName || pageName === '' || pageName.endsWith('/')) {
      pageName = 'index.html';
    }
    
    // Build target path based on language
    let targetPath;
    switch(lang) {
      case 'en':
        targetPath = '/en/' + pageName;
        break;
      case 'fr':
        targetPath = '/fr/' + pageName;
        break;
      case 'pt':
        targetPath = '/pt/' + pageName;
        break;
      case 'ca':
        targetPath = '/ca/' + pageName;
        break;
      default:
        // Spanish is in root
        targetPath = '/' + pageName;
    }
    
    // Store language preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Redirect to the target page
    window.location.href = targetPath;
  }
  
  // Set up language option click handlers
  document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', function(e) {
      e.preventDefault();
      const lang = this.getAttribute('data-lang');
      switchLanguage(lang);
    });
  });
  
  // Check for stored language preference
  const preferredLanguage = localStorage.getItem('preferredLanguage');
  if (preferredLanguage) {
    // Update UI to reflect preferred language
    const button = document.querySelector('.language-switcher .dropdown-toggle');
    if (button) {
      button.innerHTML = `<i class="fas fa-globe me-1"></i> ${preferredLanguage.toUpperCase()}`;
    }
    
    document.querySelectorAll('.language-option').forEach(option => {
      option.classList.remove('active');
      if (option.getAttribute('data-lang') === preferredLanguage) {
        option.classList.add('active');
      }
    });
  }
});