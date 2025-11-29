# Alpine Ski Academy - Baqueira Beret

## Overview
Alpine Ski Academy is a multilingual static website for a ski and snowboard school located in Baqueira Beret, Spain. The site offers information about ski lessons, snowboard classes, equipment rental, and travel packages in multiple languages (Spanish, Catalan, English, French, and Portuguese).

## Project Type
Static HTML/PHP website with clean URL routing

## Technology Stack
- **Backend**: PHP 8.2.29 (built-in development server)
- **Frontend**: HTML, CSS, JavaScript (jQuery, Bootstrap 5.3)
- **Routing**: Custom PHP router for clean URLs (removes .html extensions)
- **Languages**: Multi-language support (ES, CA, EN, FR, PT)

## Project Structure
```
/
├── index.html              # Main homepage (Spanish)
├── router.php              # URL routing script
├── styles.css              # Global styles
├── script.js               # Main JavaScript
├── animation.js            # Animation scripts
├── /ca/                    # Catalan language pages
├── /en/                    # English language pages
├── /fr/                    # French language pages
├── /pt/                    # Portuguese language pages
├── /blog/                  # Blog articles with images
├── /images/                # Image assets
└── /js/components/         # JavaScript components
```

## Key Features
- Multilingual support (5 languages)
- Clean URL routing (extensionless URLs)
- SEO optimized with Schema.org markup
- Responsive design with Bootstrap
- Blog section with articles about skiing in Baqueira
- Online booking system integration

## Running the Project
The project runs on PHP's built-in development server on port 5000:
```bash
php -S 0.0.0.0:5000 router.php
```

## Current State
- ✅ Web server running successfully
- ✅ All static assets loading correctly
- ✅ Multi-language routing functional
- ✅ Blog section integrated
- ✅ No external dependencies required

## Recent Changes
- **2025-11-29**: Fixed mobile image overflow issues
  - Added global CSS to prevent images from overflowing on mobile screens
  - Fixed image overflow on precios-y-tarifas-baqueira and other pages with large images
  - Added scoped overflow prevention for intro, pricing, specialties, and included sections
  - Changed hero background-attachment to scroll for mobile performance
- **2025-11-29**: Fixed hero and CTA button alignment
  - Added unified CSS for .hero-buttons, .final-cta-buttons-flex, .final-cta-buttons, .cta-buttons
  - All buttons now have consistent height (min-height: 56px) and proper alignment
  - Mobile responsive with 12px gap when buttons stack vertically
- **2025-11-29**: Fixed testimonial section white space issues
  - Ensured testimonial cards have white background even with bg-light class
- **2025-11-25**: Completed language.js mapping verification
  - Verified all 143 HTML files (115 regular pages + 28 blog articles) have language mappings
  - Added 3 missing snowboard page mappings (Catalan, French, Portuguese)
  - Language switcher now works correctly from every page in all 5 languages
- **2025-11-25**: Fixed language switcher across all 146 HTML files
  - Changed hardcoded href values to `href="#"` for JavaScript-driven navigation
  - Language switcher now correctly maps pages (e.g., galeria → gallery, galerie)
- **2025-11-25**: Fixed asset paths in 25 Spanish HTML files
  - Changed relative paths to absolute paths for CSS/JS files
  - All pages now use `/styles.css`, `/script.js`, `/js/components/language.js`
- **2025-11-25**: Implemented 404 error handling
  - Updated router.php to serve 404.html with HTTP 404 status
  - 404 page automatically redirects to Spanish homepage (ES language fallback)
- **2025-11-24**: Project imported to Replit environment
  - Configured workflow to run PHP development server
  - Verified all pages and assets load correctly

## Contact Information
- **Phone**: +34669911342
- **Email**: reservas@alpineskiacademy.com
- **Social**: Instagram, Facebook, TikTok

## Notes
- This is a static website with no database requirements
- The router.php handles clean URLs by serving .html files without extensions
- All images are optimized in WebP format for better performance
- The site includes structured data for improved SEO
