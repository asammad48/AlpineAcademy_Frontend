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
      en: 'best-apps-for-skiing-baqueira-beret.html',
      ca: 'millors-apps-per-esquiar-baqueira-beret.html',
      fr: 'meilleures-apps-pour-skier-baqueira-beret.html',
      pt: 'melhores-apps-para-esquiar-baqueira-beret.html'
    },
    'best-apps-for-skiing-baqueira-beret.html': {
      es: 'las-mejores-apps-para-esquiar-en-baqueira-beret.html',
      en: 'best-apps-for-skiing-baqueira-beret.html',
      ca: 'millors-apps-per-esquiar-baqueira-beret.html',
      fr: 'meilleures-apps-pour-skier-baqueira-beret.html',
      pt: 'melhores-apps-para-esquiar-baqueira-beret.html'
    },
    'millors-apps-per-esquiar-baqueira-beret.html': {
      es: 'las-mejores-apps-para-esquiar-en-baqueira-beret.html',
      en: 'best-apps-for-skiing-baqueira-beret.html',
      ca: 'millors-apps-per-esquiar-baqueira-beret.html',
      fr: 'meilleures-apps-pour-skier-baqueira-beret.html',
      pt: 'melhores-apps-para-esquiar-baqueira-beret.html'
    },
    'meilleures-apps-pour-skier-baqueira-beret.html': {
      es: 'las-mejores-apps-para-esquiar-en-baqueira-beret.html',
      en: 'best-apps-for-skiing-baqueira-beret.html',
      ca: 'millors-apps-per-esquiar-baqueira-beret.html',
      fr: 'meilleures-apps-pour-skier-baqueira-beret.html',
      pt: 'melhores-apps-para-esquiar-baqueira-beret.html'
    },
    'melhores-apps-para-esquiar-baqueira-beret.html': {
      es: 'las-mejores-apps-para-esquiar-en-baqueira-beret.html',
      en: 'best-apps-for-skiing-baqueira-beret.html',
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
  
  // Page filename mappings across languages
  const pageMappings = {
    'index.html': {
      es: 'index.html',
      en: 'index.html',
      ca: 'index.html',
      fr: 'index.html',
      pt: 'index.html'
    },
    'sobre-nosotros.html': {
      es: 'sobre-nosotros.html',
      en: 'about-us.html',
      ca: 'nosaltres.html',
      fr: 'a-propos-de-nous.html',
      pt: 'sobre-nos.html'
    },
    'about-us.html': {
      es: 'sobre-nosotros.html',
      en: 'about-us.html',
      ca: 'nosaltres.html',
      fr: 'a-propos-de-nous.html',
      pt: 'sobre-nos.html'
    },
    'nosaltres.html': {
      es: 'sobre-nosotros.html',
      en: 'about-us.html',
      ca: 'nosaltres.html',
      fr: 'a-propos-de-nous.html',
      pt: 'sobre-nos.html'
    },
    'a-propos-de-nous.html': {
      es: 'sobre-nosotros.html',
      en: 'about-us.html',
      ca: 'nosaltres.html',
      fr: 'a-propos-de-nous.html',
      pt: 'sobre-nos.html'
    },
    'sobre-nos.html': {
      es: 'sobre-nosotros.html',
      en: 'about-us.html',
      ca: 'nosaltres.html',
      fr: 'a-propos-de-nous.html',
      pt: 'sobre-nos.html'
    },
    'clases-de-esqui-baqueira.html': {
      es: 'clases-de-esqui-baqueira.html',
      en: 'ski-lessons-baqueira.html',
      ca: 'classes-desqui-baqueira.html',
      fr: 'cours-de-ski-baqueira.html',
      pt: 'aulas-de-esqui-baqueira.html'
    },
    'ski-lessons-baqueira.html': {
      es: 'clases-de-esqui-baqueira.html',
      en: 'ski-lessons-baqueira.html',
      ca: 'classes-desqui-baqueira.html',
      fr: 'cours-de-ski-baqueira.html',
      pt: 'aulas-de-esqui-baqueira.html'
    },
    'classes-desqui-baqueira.html': {
      es: 'clases-de-esqui-baqueira.html',
      en: 'ski-lessons-baqueira.html',
      ca: 'classes-desqui-baqueira.html',
      fr: 'cours-de-ski-baqueira.html',
      pt: 'aulas-de-esqui-baqueira.html'
    },
    'cours-de-ski-baqueira.html': {
      es: 'clases-de-esqui-baqueira.html',
      en: 'ski-lessons-baqueira.html',
      ca: 'classes-desqui-baqueira.html',
      fr: 'cours-de-ski-baqueira.html',
      pt: 'aulas-de-esqui-baqueira.html'
    },
    'aulas-de-esqui-baqueira.html': {
      es: 'clases-de-esqui-baqueira.html',
      en: 'ski-lessons-baqueira.html',
      ca: 'classes-desqui-baqueira.html',
      fr: 'cours-de-ski-baqueira.html',
      pt: 'aulas-de-esqui-baqueira.html'
    },
    'clases-de-snowboard-baqueira.html': {
      es: 'clases-de-snowboard-baqueira.html',
      en: 'snowboard-lessons-baqueira.html',
      ca: 'classes-de-snowboard-baqueira.html',
      fr: 'cours-de-snowboard-baqueira.html',
      pt: 'aulas-de-snowboard-baqueira.html'
    },
    'snowboard-lessons-baqueira.html': {
      es: 'clases-de-snowboard-baqueira.html',
      en: 'snowboard-lessons-baqueira.html',
      ca: 'classes-de-snowboard-baqueira.html',
      fr: 'cours-de-snowboard-baqueira.html',
      pt: 'aulas-de-snowboard-baqueira.html'
    },
    'contacto-reservas.html': {
      es: 'contacto-reservas.html',
      en: 'contact-booking.html',
      ca: 'contacte-reserves.html',
      fr: 'contact-reservations.html',
      pt: 'contato-reservas.html'
    },
    'contact-booking.html': {
      es: 'contacto-reservas.html',
      en: 'contact-booking.html',
      ca: 'contacte-reserves.html',
      fr: 'contact-reservations.html',
      pt: 'contato-reservas.html'
    },
    'contacte-reserves.html': {
      es: 'contacto-reservas.html',
      en: 'contact-booking.html',
      ca: 'contacte-reserves.html',
      fr: 'contact-reservations.html',
      pt: 'contato-reservas.html'
    },
    'contact-reservations.html': {
      es: 'contacto-reservas.html',
      en: 'contact-booking.html',
      ca: 'contacte-reserves.html',
      fr: 'contact-reservations.html',
      pt: 'contato-reservas.html'
    },
    'contato-reservas.html': {
      es: 'contacto-reservas.html',
      en: 'contact-booking.html',
      ca: 'contacte-reserves.html',
      fr: 'contact-reservations.html',
      pt: 'contato-reservas.html'
    },
    'precios-y-tarifas-baqueira.html': {
      es: 'precios-y-tarifas-baqueira.html',
      en: 'ski-snowboard-lessons-prices-baqueira.html',
      ca: 'preus-i-tarifes-baqueira.html',
      fr: 'prix-et-tarifs-baqueira.html',
      pt: 'precos-e-tarifas-baqueira.html'
    },
    'ski-snowboard-lessons-prices-baqueira.html': {
      es: 'precios-y-tarifas-baqueira.html',
      en: 'ski-snowboard-lessons-prices-baqueira.html',
      ca: 'preus-i-tarifes-baqueira.html',
      fr: 'prix-et-tarifs-baqueira.html',
      pt: 'precos-e-tarifas-baqueira.html'
    },
    'preus-i-tarifes-baqueira.html': {
      es: 'precios-y-tarifas-baqueira.html',
      en: 'ski-snowboard-lessons-prices-baqueira.html',
      ca: 'preus-i-tarifes-baqueira.html',
      fr: 'prix-et-tarifs-baqueira.html',
      pt: 'precos-e-tarifas-baqueira.html'
    },
    'prix-et-tarifs-baqueira.html': {
      es: 'precios-y-tarifas-baqueira.html',
      en: 'ski-snowboard-lessons-prices-baqueira.html',
      ca: 'preus-i-tarifes-baqueira.html',
      fr: 'prix-et-tarifs-baqueira.html',
      pt: 'precos-e-tarifas-baqueira.html'
    },
    'precos-e-tarifas-baqueira.html': {
      es: 'precios-y-tarifas-baqueira.html',
      en: 'ski-snowboard-lessons-prices-baqueira.html',
      ca: 'preus-i-tarifes-baqueira.html',
      fr: 'prix-et-tarifs-baqueira.html',
      pt: 'precos-e-tarifas-baqueira.html'
    },
    'alquiler-de-material-baqueira.html': {
      es: 'alquiler-de-material-baqueira.html',
      en: 'ski-snowboard-rental-baqueira.html',
      ca: 'lloguer-de-material-baqueira.html',
      fr: 'location-de-materiel-baqueira.html',
      pt: 'aluguel-de-equipamento-baqueira.html'
    },
    'ski-snowboard-rental-baqueira.html': {
      es: 'alquiler-de-material-baqueira.html',
      en: 'ski-snowboard-rental-baqueira.html',
      ca: 'lloguer-de-material-baqueira.html',
      fr: 'location-de-materiel-baqueira.html',
      pt: 'aluguel-de-equipamento-baqueira.html'
    },
    'lloguer-de-material-baqueira.html': {
      es: 'alquiler-de-material-baqueira.html',
      en: 'ski-snowboard-rental-baqueira.html',
      ca: 'lloguer-de-material-baqueira.html',
      fr: 'location-de-materiel-baqueira.html',
      pt: 'aluguel-de-equipamento-baqueira.html'
    },
    'location-de-materiel-baqueira.html': {
      es: 'alquiler-de-material-baqueira.html',
      en: 'ski-snowboard-rental-baqueira.html',
      ca: 'lloguer-de-material-baqueira.html',
      fr: 'location-de-materiel-baqueira.html',
      pt: 'aluguel-de-equipamento-baqueira.html'
    },
    'aluguel-de-equipamento-baqueira.html': {
      es: 'alquiler-de-material-baqueira.html',
      en: 'ski-snowboard-rental-baqueira.html',
      ca: 'lloguer-de-material-baqueira.html',
      fr: 'location-de-materiel-baqueira.html',
      pt: 'aluguel-de-equipamento-baqueira.html'
    },
    'camaras-baqueira.html': {
      es: 'camaras-baqueira.html',
      en: 'webcams-baqueira.html',
      ca: 'cameres-baqueira.html',
      fr: 'cameras-baqueira.html',
      pt: 'cameras-baqueira.html'
    },
    'webcams-baqueira.html': {
      es: 'camaras-baqueira.html',
      en: 'webcams-baqueira.html',
      ca: 'cameres-baqueira.html',
      fr: 'cameras-baqueira.html',
      pt: 'cameras-baqueira.html'
    },
    'cameres-baqueira.html': {
      es: 'camaras-baqueira.html',
      en: 'webcams-baqueira.html',
      ca: 'cameres-baqueira.html',
      fr: 'cameras-baqueira.html',
      pt: 'cameras-baqueira.html'
    },
    'cameras-baqueira.html': {
      es: 'camaras-baqueira.html',
      en: 'webcams-baqueira.html',
      ca: 'cameres-baqueira.html',
      fr: 'cameras-baqueira.html',
      pt: 'cameras-baqueira.html'
    },
    'viajes-de-esqui.html': {
      es: 'viajes-de-esqui.html',
      en: 'ski-trips.html',
      ca: 'viatges-desqui.html',
      fr: 'voyages-de-ski.html',
      pt: 'viagens-de-esqui.html'
    },
    'ski-trips.html': {
      es: 'viajes-de-esqui.html',
      en: 'ski-trips.html',
      ca: 'viatges-desqui.html',
      fr: 'voyages-de-ski.html',
      pt: 'viagens-de-esqui.html'
    },
    'viatges-desqui.html': {
      es: 'viajes-de-esqui.html',
      en: 'ski-trips.html',
      ca: 'viatges-desqui.html',
      fr: 'voyages-de-ski.html',
      pt: 'viagens-de-esqui.html'
    },
    'voyages-de-ski.html': {
      es: 'viajes-de-esqui.html',
      en: 'ski-trips.html',
      ca: 'viatges-desqui.html',
      fr: 'voyages-de-ski.html',
      pt: 'viagens-de-esqui.html'
    },
    'viagens-de-esqui.html': {
      es: 'viajes-de-esqui.html',
      en: 'ski-trips.html',
      ca: 'viatges-desqui.html',
      fr: 'voyages-de-ski.html',
      pt: 'viagens-de-esqui.html'
    },
    'blog.html': {
      es: 'blog.html',
      en: 'blog.html',
      ca: 'blog.html',
      fr: 'blog.html',
      pt: 'blog.html'
    },
    'clases-particulares-ninos-baqueira.html': {
      es: 'clases-particulares-ninos-baqueira.html',
      en: 'private-ski-lessons-kids-baqueira.html',
      ca: 'classes-particulars-nens-baqueira.html',
      fr: 'cours-particuliers-enfants-baqueira.html',
      pt: 'aulas-particulares-criancas-baqueira.html'
    },
    'private-ski-lessons-kids-baqueira.html': {
      es: 'clases-particulares-ninos-baqueira.html',
      en: 'private-ski-lessons-kids-baqueira.html',
      ca: 'classes-particulars-nens-baqueira.html',
      fr: 'cours-particuliers-enfants-baqueira.html',
      pt: 'aulas-particulares-criancas-baqueira.html'
    },
    'classes-particulars-nens-baqueira.html': {
      es: 'clases-particulares-ninos-baqueira.html',
      en: 'private-ski-lessons-kids-baqueira.html',
      ca: 'classes-particulars-nens-baqueira.html',
      fr: 'cours-particuliers-enfants-baqueira.html',
      pt: 'aulas-particulares-criancas-baqueira.html'
    },
    'cours-particuliers-enfants-baqueira.html': {
      es: 'clases-particulares-ninos-baqueira.html',
      en: 'private-ski-lessons-kids-baqueira.html',
      ca: 'classes-particulars-nens-baqueira.html',
      fr: 'cours-particuliers-enfants-baqueira.html',
      pt: 'aulas-particulares-criancas-baqueira.html'
    },
    'aulas-particulares-criancas-baqueira.html': {
      es: 'clases-particulares-ninos-baqueira.html',
      en: 'private-ski-lessons-kids-baqueira.html',
      ca: 'classes-particulars-nens-baqueira.html',
      fr: 'cours-particuliers-enfants-baqueira.html',
      pt: 'aulas-particulares-criancas-baqueira.html'
    },
    'clases-particulares-adultos-baqueira.html': {
      es: 'clases-particulares-adultos-baqueira.html',
      en: 'private-ski-lessons-adults-baqueira.html',
      ca: 'classes-particulars-adults-baqueira.html',
      fr: 'cours-particuliers-adultes-baqueira.html',
      pt: 'aulas-particulares-adultos-baqueira.html'
    },
    'private-ski-lessons-adults-baqueira.html': {
      es: 'clases-particulares-adultos-baqueira.html',
      en: 'private-ski-lessons-adults-baqueira.html',
      ca: 'classes-particulars-adults-baqueira.html',
      fr: 'cours-particuliers-adultes-baqueira.html',
      pt: 'aulas-particulares-adultos-baqueira.html'
    },
    'classes-particulars-adults-baqueira.html': {
      es: 'clases-particulares-adultos-baqueira.html',
      en: 'private-ski-lessons-adults-baqueira.html',
      ca: 'classes-particulars-adults-baqueira.html',
      fr: 'cours-particuliers-adultes-baqueira.html',
      pt: 'aulas-particulares-adultos-baqueira.html'
    },
    'cours-particuliers-adultes-baqueira.html': {
      es: 'clases-particulares-adultos-baqueira.html',
      en: 'private-ski-lessons-adults-baqueira.html',
      ca: 'classes-particulars-adults-baqueira.html',
      fr: 'cours-particuliers-adultes-baqueira.html',
      pt: 'aulas-particulares-adultos-baqueira.html'
    },
    'aulas-particulares-adultos-baqueira.html': {
      es: 'clases-particulares-adultos-baqueira.html',
      en: 'private-ski-lessons-adults-baqueira.html',
      ca: 'classes-particulars-adults-baqueira.html',
      fr: 'cours-particuliers-adultes-baqueira.html',
      pt: 'aulas-particulares-adultos-baqueira.html'
    },
    'clases-particulares-familias-baqueira.html': {
      es: 'clases-particulares-familias-baqueira.html',
      en: 'private-ski-lessons-families-baqueira.html',
      ca: 'classes-particulars-families-baqueira.html',
      fr: 'cours-particuliers-familles-baqueira.html',
      pt: 'aulas-particulares-familias-baqueira.html'
    },
    'private-ski-lessons-families-baqueira.html': {
      es: 'clases-particulares-familias-baqueira.html',
      en: 'private-ski-lessons-families-baqueira.html',
      ca: 'classes-particulars-families-baqueira.html',
      fr: 'cours-particuliers-familles-baqueira.html',
      pt: 'aulas-particulares-familias-baqueira.html'
    },
    'classes-particulars-families-baqueira.html': {
      es: 'clases-particulares-familias-baqueira.html',
      en: 'private-ski-lessons-families-baqueira.html',
      ca: 'classes-particulars-families-baqueira.html',
      fr: 'cours-particuliers-familles-baqueira.html',
      pt: 'aulas-particulares-familias-baqueira.html'
    },
    'cours-particuliers-familles-baqueira.html': {
      es: 'clases-particulares-familias-baqueira.html',
      en: 'private-ski-lessons-families-baqueira.html',
      ca: 'classes-particulars-families-baqueira.html',
      fr: 'cours-particuliers-familles-baqueira.html',
      pt: 'aulas-particulares-familias-baqueira.html'
    },
    'aulas-particulares-familias-baqueira.html': {
      es: 'clases-particulares-familias-baqueira.html',
      en: 'private-ski-lessons-families-baqueira.html',
      ca: 'classes-particulars-families-baqueira.html',
      fr: 'cours-particuliers-familles-baqueira.html',
      pt: 'aulas-particulares-familias-baqueira.html'
    },
    'clases-tecnologia-carv-baqueira.html': {
      es: 'clases-tecnologia-carv-baqueira.html',
      en: 'private-ski-lessons-carv-baqueira.html',
      ca: 'classes-tecnologia-carv-baqueira.html',
      fr: 'cours-technologie-carv-baqueira.html',
      pt: 'aulas-tecnologia-carv-baqueira.html'
    },
    'private-ski-lessons-carv-baqueira.html': {
      es: 'clases-tecnologia-carv-baqueira.html',
      en: 'private-ski-lessons-carv-baqueira.html',
      ca: 'classes-tecnologia-carv-baqueira.html',
      fr: 'cours-technologie-carv-baqueira.html',
      pt: 'aulas-tecnologia-carv-baqueira.html'
    },
    'classes-tecnologia-carv-baqueira.html': {
      es: 'clases-tecnologia-carv-baqueira.html',
      en: 'private-ski-lessons-carv-baqueira.html',
      ca: 'classes-tecnologia-carv-baqueira.html',
      fr: 'cours-technologie-carv-baqueira.html',
      pt: 'aulas-tecnologia-carv-baqueira.html'
    },
    'cours-technologie-carv-baqueira.html': {
      es: 'clases-tecnologia-carv-baqueira.html',
      en: 'private-ski-lessons-carv-baqueira.html',
      ca: 'classes-tecnologia-carv-baqueira.html',
      fr: 'cours-technologie-carv-baqueira.html',
      pt: 'aulas-tecnologia-carv-baqueira.html'
    },
    'aulas-tecnologia-carv-baqueira.html': {
      es: 'clases-tecnologia-carv-baqueira.html',
      en: 'private-ski-lessons-carv-baqueira.html',
      ca: 'classes-tecnologia-carv-baqueira.html',
      fr: 'cours-technologie-carv-baqueira.html',
      pt: 'aulas-tecnologia-carv-baqueira.html'
    },
    'clases-de-freeride-baqueira.html': {
      es: 'clases-de-freeride-baqueira.html',
      en: 'freeride-ski-lessons-baqueira.html',
      ca: 'classes-freeride-baqueira.html',
      fr: 'cours-freeride-baqueira.html',
      pt: 'aulas-freeride-baqueira.html'
    },
    'freeride-ski-lessons-baqueira.html': {
      es: 'clases-de-freeride-baqueira.html',
      en: 'freeride-ski-lessons-baqueira.html',
      ca: 'classes-freeride-baqueira.html',
      fr: 'cours-freeride-baqueira.html',
      pt: 'aulas-freeride-baqueira.html'
    },
    'classes-freeride-baqueira.html': {
      es: 'clases-de-freeride-baqueira.html',
      en: 'freeride-ski-lessons-baqueira.html',
      ca: 'classes-freeride-baqueira.html',
      fr: 'cours-freeride-baqueira.html',
      pt: 'aulas-freeride-baqueira.html'
    },
    'cours-freeride-baqueira.html': {
      es: 'clases-de-freeride-baqueira.html',
      en: 'freeride-ski-lessons-baqueira.html',
      ca: 'classes-freeride-baqueira.html',
      fr: 'cours-freeride-baqueira.html',
      pt: 'aulas-freeride-baqueira.html'
    },
    'aulas-freeride-baqueira.html': {
      es: 'clases-de-freeride-baqueira.html',
      en: 'freeride-ski-lessons-baqueira.html',
      ca: 'classes-freeride-baqueira.html',
      fr: 'cours-freeride-baqueira.html',
      pt: 'aulas-freeride-baqueira.html'
    },
    'clases-de-freestyle-baqueira.html': {
      es: 'clases-de-freestyle-baqueira.html',
      en: 'freestyle-ski-lessons-baqueira.html',
      ca: 'classes-freestyle-baqueira.html',
      fr: 'cours-freestyle-baqueira.html',
      pt: 'aulas-freestyle-baqueira.html'
    },
    'freestyle-ski-lessons-baqueira.html': {
      es: 'clases-de-freestyle-baqueira.html',
      en: 'freestyle-ski-lessons-baqueira.html',
      ca: 'classes-freestyle-baqueira.html',
      fr: 'cours-freestyle-baqueira.html',
      pt: 'aulas-freestyle-baqueira.html'
    },
    'classes-freestyle-baqueira.html': {
      es: 'clases-de-freestyle-baqueira.html',
      en: 'freestyle-ski-lessons-baqueira.html',
      ca: 'classes-freestyle-baqueira.html',
      fr: 'cours-freestyle-baqueira.html',
      pt: 'aulas-freestyle-baqueira.html'
    },
    'cours-freestyle-baqueira.html': {
      es: 'clases-de-freestyle-baqueira.html',
      en: 'freestyle-ski-lessons-baqueira.html',
      ca: 'classes-freestyle-baqueira.html',
      fr: 'cours-freestyle-baqueira.html',
      pt: 'aulas-freestyle-baqueira.html'
    },
    'aulas-freestyle-baqueira.html': {
      es: 'clases-de-freestyle-baqueira.html',
      en: 'freestyle-ski-lessons-baqueira.html',
      ca: 'classes-freestyle-baqueira.html',
      fr: 'cours-freestyle-baqueira.html',
      pt: 'aulas-freestyle-baqueira.html'
    },
    'clases-grupo-ninos-baqueira.html': {
      es: 'clases-grupo-ninos-baqueira.html',
      en: 'group-ski-lessons-kids-baqueira.html',
      ca: 'classes-grup-nens-baqueira.html',
      fr: 'cours-groupe-enfants-baqueira.html',
      pt: 'aulas-grupo-criancas-baqueira.html'
    },
    'group-ski-lessons-kids-baqueira.html': {
      es: 'clases-grupo-ninos-baqueira.html',
      en: 'group-ski-lessons-kids-baqueira.html',
      ca: 'classes-grup-nens-baqueira.html',
      fr: 'cours-groupe-enfants-baqueira.html',
      pt: 'aulas-grupo-criancas-baqueira.html'
    },
    'classes-grup-nens-baqueira.html': {
      es: 'clases-grupo-ninos-baqueira.html',
      en: 'group-ski-lessons-kids-baqueira.html',
      ca: 'classes-grup-nens-baqueira.html',
      fr: 'cours-groupe-enfants-baqueira.html',
      pt: 'aulas-grupo-criancas-baqueira.html'
    },
    'cours-groupe-enfants-baqueira.html': {
      es: 'clases-grupo-ninos-baqueira.html',
      en: 'group-ski-lessons-kids-baqueira.html',
      ca: 'classes-grup-nens-baqueira.html',
      fr: 'cours-groupe-enfants-baqueira.html',
      pt: 'aulas-grupo-criancas-baqueira.html'
    },
    'aulas-grupo-criancas-baqueira.html': {
      es: 'clases-grupo-ninos-baqueira.html',
      en: 'group-ski-lessons-kids-baqueira.html',
      ca: 'classes-grup-nens-baqueira.html',
      fr: 'cours-groupe-enfants-baqueira.html',
      pt: 'aulas-grupo-criancas-baqueira.html'
    },
    'clases-grupo-adultos-baqueira.html': {
      es: 'clases-grupo-adultos-baqueira.html',
      en: 'group-ski-lessons-adults-baqueira.html',
      ca: 'classes-grup-adults-baqueira.html',
      fr: 'cours-groupe-adultes-baqueira.html',
      pt: 'aulas-grupo-adultos-baqueira.html'
    },
    'group-ski-lessons-adults-baqueira.html': {
      es: 'clases-grupo-adultos-baqueira.html',
      en: 'group-ski-lessons-adults-baqueira.html',
      ca: 'classes-grup-adults-baqueira.html',
      fr: 'cours-groupe-adultes-baqueira.html',
      pt: 'aulas-grupo-adultos-baqueira.html'
    },
    'classes-grup-adults-baqueira.html': {
      es: 'clases-grupo-adultos-baqueira.html',
      en: 'group-ski-lessons-adults-baqueira.html',
      ca: 'classes-grup-adults-baqueira.html',
      fr: 'cours-groupe-adultes-baqueira.html',
      pt: 'aulas-grupo-adultos-baqueira.html'
    },
    'cours-groupe-adultes-baqueira.html': {
      es: 'clases-grupo-adultos-baqueira.html',
      en: 'group-ski-lessons-adults-baqueira.html',
      ca: 'classes-grup-adults-baqueira.html',
      fr: 'cours-groupe-adultes-baqueira.html',
      pt: 'aulas-grupo-adultos-baqueira.html'
    },
    'aulas-grupo-adultos-baqueira.html': {
      es: 'clases-grupo-adultos-baqueira.html',
      en: 'group-ski-lessons-adults-baqueira.html',
      ca: 'classes-grup-adults-baqueira.html',
      fr: 'cours-groupe-adultes-baqueira.html',
      pt: 'aulas-grupo-adultos-baqueira.html'
    },
    'clases-empresas-colegios-baqueira.html': {
      es: 'clases-empresas-colegios-baqueira.html',
      en: 'ski-lessons-companies-schools-baqueira.html',
      ca: 'classes-empreses-escoles-baqueira.html',
      fr: 'cours-entreprises-ecoles-baqueira.html',
      pt: 'aulas-empresas-escolas-baqueira.html'
    },
    'ski-lessons-companies-schools-baqueira.html': {
      es: 'clases-empresas-colegios-baqueira.html',
      en: 'ski-lessons-companies-schools-baqueira.html',
      ca: 'classes-empreses-escoles-baqueira.html',
      fr: 'cours-entreprises-ecoles-baqueira.html',
      pt: 'aulas-empresas-escolas-baqueira.html'
    },
    'classes-empreses-escoles-baqueira.html': {
      es: 'clases-empresas-colegios-baqueira.html',
      en: 'ski-lessons-companies-schools-baqueira.html',
      ca: 'classes-empreses-escoles-baqueira.html',
      fr: 'cours-entreprises-ecoles-baqueira.html',
      pt: 'aulas-empresas-escolas-baqueira.html'
    },
    'cours-entreprises-ecoles-baqueira.html': {
      es: 'clases-empresas-colegios-baqueira.html',
      en: 'ski-lessons-companies-schools-baqueira.html',
      ca: 'classes-empreses-escoles-baqueira.html',
      fr: 'cours-entreprises-ecoles-baqueira.html',
      pt: 'aulas-empresas-escolas-baqueira.html'
    },
    'aulas-empresas-escolas-baqueira.html': {
      es: 'clases-empresas-colegios-baqueira.html',
      en: 'ski-lessons-companies-schools-baqueira.html',
      ca: 'classes-empreses-escoles-baqueira.html',
      fr: 'cours-entreprises-ecoles-baqueira.html',
      pt: 'aulas-empresas-escolas-baqueira.html'
    },
    'aviso-legal.html': {
      es: 'aviso-legal.html',
      en: 'legal-notice.html',
      ca: 'avis-legal.html',
      fr: 'mentions-legales.html',
      pt: 'aviso-legal.html'
    },
    'legal-notice.html': {
      es: 'aviso-legal.html',
      en: 'legal-notice.html',
      ca: 'avis-legal.html',
      fr: 'mentions-legales.html',
      pt: 'aviso-legal.html'
    },
    'avis-legal.html': {
      es: 'aviso-legal.html',
      en: 'legal-notice.html',
      ca: 'avis-legal.html',
      fr: 'mentions-legales.html',
      pt: 'aviso-legal.html'
    },
    'mentions-legales.html': {
      es: 'aviso-legal.html',
      en: 'legal-notice.html',
      ca: 'avis-legal.html',
      fr: 'mentions-legales.html',
      pt: 'aviso-legal.html'
    },
    'politica-de-privacidad.html': {
      es: 'politica-de-privacidad.html',
      en: 'privacy-policy.html',
      ca: 'politica-de-privacitat.html',
      fr: 'politique-de-confidentialite.html',
      pt: 'politica-de-privacidade.html'
    },
    'privacy-policy.html': {
      es: 'politica-de-privacidad.html',
      en: 'privacy-policy.html',
      ca: 'politica-de-privacitat.html',
      fr: 'politique-de-confidentialite.html',
      pt: 'politica-de-privacidade.html'
    },
    'politica-de-privacitat.html': {
      es: 'politica-de-privacidad.html',
      en: 'privacy-policy.html',
      ca: 'politica-de-privacitat.html',
      fr: 'politique-de-confidentialite.html',
      pt: 'politica-de-privacidade.html'
    },
    'politique-de-confidentialite.html': {
      es: 'politica-de-privacidad.html',
      en: 'privacy-policy.html',
      ca: 'politica-de-privacitat.html',
      fr: 'politique-de-confidentialite.html',
      pt: 'politica-de-privacidade.html'
    },
    'politica-de-privacidade.html': {
      es: 'politica-de-privacidad.html',
      en: 'privacy-policy.html',
      ca: 'politica-de-privacitat.html',
      fr: 'politique-de-confidentialite.html',
      pt: 'politica-de-privacidade.html'
    },
    'politica-de-cookies.html': {
      es: 'politica-de-cookies.html',
      en: 'cookie-policy.html',
      ca: 'politica-de-cookies.html',
      fr: 'politique-de-cookies.html',
      pt: 'politica-de-cookies.html'
    },
    'cookie-policy.html': {
      es: 'politica-de-cookies.html',
      en: 'cookie-policy.html',
      ca: 'politica-de-cookies.html',
      fr: 'politique-de-cookies.html',
      pt: 'politica-de-cookies.html'
    },
    'politique-de-cookies.html': {
      es: 'politica-de-cookies.html',
      en: 'cookie-policy.html',
      ca: 'politica-de-cookies.html',
      fr: 'politique-de-cookies.html',
      pt: 'politica-de-cookies.html'
    },
    'politica-de-cancelacion.html': {
      es: 'politica-de-cancelacion.html',
      en: 'cancellation-policy.html',
      ca: 'politica-de-cancel-lacio.html',
      fr: 'politique-dannulation.html',
      pt: 'politica-de-cancelamento.html'
    },
    'cancellation-policy.html': {
      es: 'politica-de-cancelacion.html',
      en: 'cancellation-policy.html',
      ca: 'politica-de-cancel-lacio.html',
      fr: 'politique-dannulation.html',
      pt: 'politica-de-cancelamento.html'
    },
    'politica-de-cancel-lacio.html': {
      es: 'politica-de-cancelacion.html',
      en: 'cancellation-policy.html',
      ca: 'politica-de-cancel-lacio.html',
      fr: 'politique-dannulation.html',
      pt: 'politica-de-cancelamento.html'
    },
    'politique-dannulation.html': {
      es: 'politica-de-cancelacion.html',
      en: 'cancellation-policy.html',
      ca: 'politica-de-cancel-lacio.html',
      fr: 'politique-dannulation.html',
      pt: 'politica-de-cancelamento.html'
    },
    'politica-de-cancelamento.html': {
      es: 'politica-de-cancelacion.html',
      en: 'cancellation-policy.html',
      ca: 'politica-de-cancel-lacio.html',
      fr: 'politique-dannulation.html',
      pt: 'politica-de-cancelamento.html'
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
    
    // Get the current page filename
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
    
    // Check if we have a mapping for this page
    if (pageMappings[pageName]) {
      const targetFilename = pageMappings[pageName][lang];
      
      // Build target path based on language
      let targetPath;
      if (lang === 'es') {
        targetPath = '/' + targetFilename;
      } else {
        targetPath = '/' + lang + '/' + targetFilename;
      }
      
      // Store language preference
      localStorage.setItem('preferredLanguage', lang);
      
      // Redirect to the target page
      window.location.href = targetPath;
      return;
    }
    
    // Fallback: use the same filename (for pages not in mapping)
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