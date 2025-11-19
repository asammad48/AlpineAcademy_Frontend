# Alpine Ski Academy Website

## Overview
Alpine Ski Academy is a professional ski and snowboard school website based in Baqueira Beret, Spain. The site is a multilingual (Spanish, English, Catalan, French, Portuguese) static HTML website with a PHP backend for handling contact form submissions.

**Purpose:** Marketing and booking platform for ski/snowboard lessons  
**Technology Stack:** HTML, CSS, JavaScript, PHP  
**Last Updated:** November 19, 2025

## Project Structure

```
/
├── index.html              # Main homepage
├── contacto.html           # Contact page
├── blog.html              # Blog listing page
├── precios.html           # Pricing page
├── galeria.html           # Gallery page
├── Nosotros.html          # About us page
├── alquiler.html          # Equipment rental page
├── send-email.php         # Contact form email handler (backend)
├── styles.css             # Main stylesheet
├── script.js              # Main JavaScript file
├── animation.js           # Animation effects
├── /js                    # JavaScript modules
│   ├── /components        
│   │   └── language.js    # Language switcher
│   └── contact-form-handler.js  # Form submission handler
├── /css                   # Stylesheets
│   ├── /components        # Component styles
│   └── /pages            # Page-specific styles
├── /images               # Image assets
├── /blog                 # Blog articles
└── /clases-esqui-baqueira  # Ski classes section
```

## Recent Changes

### November 19, 2025 - Replit Environment Setup
- Installed PHP 8.2 for backend functionality
- Set up PHP built-in development server on port 5000
- Fixed `language.js` path references across all HTML files (from `/language.js` to `/js/components/language.js` and `../js/components/language.js` for subdirectories)
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

1. **Multilingual Support:** 5 languages (ES, EN, CA, FR, PT)
2. **Responsive Design:** Mobile-first Bootstrap-based layout
3. **Dynamic Contact Form:** PHP-powered email submission
4. **SEO Optimized:** Schema.org markup, meta tags, Open Graph
5. **Service Categories:**
   - Private ski lessons (kids, adults, families)
   - Group lessons
   - Specialty classes (Freeride, Freestyle, CARV technology)
   - Snowboard lessons
   - Equipment rental

## Important Files

- **send-email.php:** Contact form backend - handles email submissions
- **js/contact-form-handler.js:** Frontend form validation and submission
- **styles.css:** Main stylesheet with custom CSS variables
- **script.js:** Main JavaScript for navigation, animations, and interactions

## Notes

- All static assets (images, videos) are stored in the `/images` directory
- Blog content is in `/blog` directory with separate subdirectories for article images
- The site uses relative paths for navigation between pages
- Language switcher is implemented via separate HTML files per language (e.g., `en.html`, `ca.html`)
