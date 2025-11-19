# Alpine Ski Academy Website

## Overview
Alpine Ski Academy is a professional ski and snowboard school website based in Baqueira Beret, Spain. The site is a fully multilingual (Spanish, English, Catalan, French, Portuguese) static HTML website with a PHP backend for handling contact form submissions.

**Purpose:** Marketing and booking platform for ski/snowboard lessons  
**Technology Stack:** HTML, CSS, JavaScript, PHP  
**Last Updated:** November 19, 2025

## Project Structure

```
/
├── index.html              # Spanish homepage
├── clases-de-esqui-baqueira.html       # Main ski lessons page
├── clases-de-snowboard-baqueira.html   # Snowboard lessons
├── sobre-nosotros.html                 # About us
├── viajes-de-esqui.html                # Ski trips
├── camaras-baqueira.html               # Webcams
├── alquiler-de-material-baqueira.html  # Equipment rental
├── precios-y-tarifas-baqueira.html     # Pricing
├── contacto-reservas.html              # Contact & booking
├── blog.html                           # Blog listing
├── clases-particulares-*.html          # Private lesson pages (kids, adults, families)
├── clases-de-freeride-baqueira.html    # Freeride lessons
├── clases-de-freestyle-baqueira.html   # Freestyle lessons
├── clases-tecnologia-carv-baqueira.html # CARV technology lessons
├── clases-grupo-*.html                 # Group lesson pages
├── clases-empresas-colegios-baqueira.html # Corporate/school lessons
├── politica-*.html                     # Legal pages
├── send-email.php                      # Contact form email handler
├── styles.css                          # Main stylesheet
├── script.js                           # Main JavaScript
├── animation.js                        # Animation effects
├── /js                                 # JavaScript modules
│   ├── /components        
│   │   └── language.js                 # Language switcher
│   └── contact-form-handler.js         # Form submission handler
├── /css                                # Stylesheets
│   ├── /components                     # Component styles
│   └── /pages                          # Page-specific styles
├── /images                             # Image assets
├── /blog                               # Blog articles
├── /clases-esqui-baqueira              # Legacy ski classes directory
├── /en/                                # English version (23 pages)
│   ├── index.html
│   ├── ski-lessons-baqueira.html
│   ├── snowboard-lessons-baqueira.html
│   ├── private-ski-lessons-*.html
│   └── ... (all English translations)
├── /pt/                                # Portuguese version (23 pages)
│   ├── index.html
│   ├── aulas-de-esqui-baqueira.html
│   └── ... (all Portuguese translations)
├── /ca/                                # Catalan version (23 pages)
│   ├── index.html
│   ├── classes-desqui-baqueira.html
│   └── ... (all Catalan translations)
└── /fr/                                # French version (23 pages)
    ├── index.html
    ├── cours-de-ski-baqueira.html
    └── ... (all French translations)
```

## Recent Changes

### November 19, 2025 - Major Multilingual Restructuring
- **Restructured entire website** from mixed root/subdirectory structure to organized multilingual architecture
- **Created 127 HTML pages** across 5 languages (24 Spanish + 23 each for EN/PT/CA/FR)
- **Spanish (Root - 24 pages):** Reorganized with standardized SEO-friendly filenames
  - Main pages: `index.html`, `clases-de-esqui-baqueira.html`, `sobre-nosotros.html`, etc.
  - All lesson subpages moved from `/clases-esqui-baqueira/` to root with `-baqueira` suffix
  - Legal pages: `aviso-legal.html`, `politica-de-privacidad.html`, `politica-de-cookies.html`, `politica-de-cancelacion.html`
- **English (/en/ - 23 pages):** Complete English translation with SEO-optimized URLs
  - Examples: `ski-lessons-baqueira.html`, `private-ski-lessons-kids-baqueira.html`, `about-us.html`
- **Portuguese (/pt/ - 23 pages):** Full Portuguese localization
  - Examples: `aulas-de-esqui-baqueira.html`, `sobre-nos.html`, `contato-reservas.html`
- **Catalan (/ca/ - 23 pages):** Complete Catalan translation
  - Examples: `classes-desqui-baqueira.html`, `nosaltres.html`, `contacte-reserves.html`
- **French (/fr/ - 23 pages):** Full French localization
  - Examples: `cours-de-ski-baqueira.html`, `a-propos-de-nous.html`, `contact-reservations.html`
- **Asset path updates:** All subfolder pages use root-relative paths (`/styles.css`, `/images/`, `/js/`)

### November 19, 2025 - Replit Environment Setup
- Installed PHP 8.2 for backend functionality
- Set up PHP built-in development server on port 5000
- Fixed `language.js` path references across all HTML files
- Created `.gitignore` for PHP project
- Configured deployment settings for autoscale deployment
- Website is now fully functional in Replit environment

## Development Setup

### Technologies Used
- **Frontend:** HTML5, CSS3, JavaScript (ES6+), Bootstrap 5, jQuery
- **Backend:** PHP 8.2
- **External Libraries:**
  - Bootstrap 5.3.0
  - Font Awesome 6.4.0
  - jQuery 3.6.0
  - Google Fonts (Montserrat, Open Sans)

### Running Locally
The website runs on PHP's built-in development server:
- **Host:** 0.0.0.0
- **Port:** 5000
- **Command:** `php -S 0.0.0.0:5000`

### Multilingual Structure
- **Spanish:** Root directory (default language) - 24 pages
- **English:** `/en/` subdirectory - 23 pages
- **Portuguese:** `/pt/` subdirectory - 23 pages
- **Catalan:** `/ca/` subdirectory - 23 pages
- **French:** `/fr/` subdirectory - 23 pages

All language versions share the same assets (CSS, JS, images) referenced via root-relative paths.

### Contact Form
The contact form uses:
1. Frontend handler: `/js/contact-form-handler.js` - Validates and submits form data
2. Backend processor: `/send-email.php` - Processes POST requests and sends emails to `reservas@alpineskiacademy.com`

**Note:** The PHP `mail()` function requires proper mail server configuration in production. In development, emails may not send without an SMTP server configured.

## Deployment

### Configuration
- **Deployment Type:** Autoscale (stateless)
- **Run Command:** `php -S 0.0.0.0:5000`
- **Port:** 5000

The site is configured for autoscale deployment, suitable for a static website with dynamic contact form handling.

## Key Features

1. **Multilingual Support:** 5 complete languages (ES, EN, CA, FR, PT) with 127 total pages
2. **Responsive Design:** Mobile-first Bootstrap-based layout
3. **Dynamic Contact Form:** PHP-powered email submission
4. **SEO Optimized:** Schema.org markup, meta tags, Open Graph, language-specific URLs
5. **Service Categories:**
   - Private ski lessons (kids, adults, families)
   - Group lessons (kids, adults)
   - Specialty classes (Freeride, Freestyle, CARV technology)
   - Snowboard lessons
   - Equipment rental
   - Corporate & school programs

## Spanish Page Structure (Root Directory)

### Main Pages (10)
1. `index.html` - Homepage
2. `clases-de-esqui-baqueira.html` - Main ski lessons
3. `clases-de-snowboard-baqueira.html` - Snowboard lessons
4. `sobre-nosotros.html` - About us
5. `viajes-de-esqui.html` - Ski trips
6. `camaras-baqueira.html` - Webcams
7. `alquiler-de-material-baqueira.html` - Equipment rental
8. `precios-y-tarifas-baqueira.html` - Pricing & rates
9. `contacto-reservas.html` - Contact & booking
10. `blog.html` - Blog

### Lesson Pages (9)
1. `clases-particulares-ninos-baqueira.html` - Private lessons for kids
2. `clases-particulares-familias-baqueira.html` - Private lessons for families
3. `clases-particulares-adultos-baqueira.html` - Private lessons for adults
4. `clases-de-freeride-baqueira.html` - Freeride lessons
5. `clases-de-freestyle-baqueira.html` - Freestyle lessons
6. `clases-tecnologia-carv-baqueira.html` - CARV technology lessons
7. `clases-grupo-ninos-baqueira.html` - Group lessons for kids
8. `clases-grupo-adultos-baqueira.html` - Group lessons for adults
9. `clases-empresas-colegios-baqueira.html` - Corporate & school programs

### Legal Pages (4)
1. `aviso-legal.html` - Legal notice
2. `politica-de-privacidad.html` - Privacy policy
3. `politica-de-cookies.html` - Cookie policy
4. `politica-de-cancelacion.html` - Cancellation policy

## Important Files

- **send-email.php:** Contact form backend - handles email submissions
- **js/contact-form-handler.js:** Frontend form validation and submission
- **styles.css:** Main stylesheet with custom CSS variables
- **script.js:** Main JavaScript for navigation, animations, and interactions
- **js/components/language.js:** Language switcher functionality

## Notes

- All static assets (images, videos) are stored in the `/images` directory and shared across all languages
- Blog content is in `/blog` directory with separate subdirectories for article images
- All language subfolders use root-relative paths for assets (e.g., `/styles.css`, `/images/logo.jpg`)
- Language switcher should be configured to navigate between corresponding pages in different languages
- Total of **127 HTML pages** across all languages
