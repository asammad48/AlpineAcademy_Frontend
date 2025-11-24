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
