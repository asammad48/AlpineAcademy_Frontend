# Alpine Ski Academy Website

## Overview
The Alpine Ski Academy website is a professional, multilingual static HTML site with a PHP backend for form handling. It serves as a marketing and booking platform for ski and snowboard lessons in Baqueira Beret, Spain, targeting a broad international audience. The project aims to provide comprehensive information, facilitate bookings, and establish a strong online presence for the academy.

## User Preferences
I want iterative development. Ask before making major changes.

## System Architecture
The website is built on a static HTML, CSS, and JavaScript frontend with a PHP backend for contact form processing. It features a responsive design using Bootstrap 5 and jQuery.

### UI/UX Decisions
-   **Multilingual Interface**: Full localization across five languages (Spanish, English, Catalan, French, Portuguese) with dedicated subdirectories for each.
-   **Responsive Design**: Utilizes Bootstrap 5 for a mobile-first approach, ensuring optimal viewing across devices.
-   **Navigation**: Dynamic dropdown menus and a scroll-to-top button enhance user experience.
-   **Styling**: Custom CSS variables, Font Awesome for icons, and Google Fonts (Montserrat, Open Sans) for typography.
-   **Image Handling**: All content images are responsive (`img-fluid`) while logos and flag icons maintain fixed sizes.
-   **Button Alignment**: Hero buttons use flexbox with `justify-content: center` and responsive wrapping. CTA sections use `.final-cta-buttons-flex` and `.cta-buttons-flex` classes. Mobile views stack buttons vertically with max-width constraints.
-   **Testimonial Cards**: Single testimonial cards in centered containers (`.col-lg-8.mx-auto`) have reduced bottom margin to prevent excess whitespace; multi-card layouts retain default spacing.

### Technical Implementations
-   **Multilingual Structure**: The site employs a consistent subdirectory structure for each language (e.g., `/en/`, `/pt/`). Spanish is the default language in the root directory.
-   **Clean URL Routing**: Implemented via `router.php` to enable SEO-friendly URLs without .html extensions. The router automatically appends .html when serving files while maintaining clean URLs in the browser.
-   **Blog Structure**: Blog articles are organized in `/blogs/` directories (one per language: root, `/en/blogs/`, `/fr/blogs/`, `/ca/blogs/`, `/pt/blogs/`) with clean URLs like `/blogs/article-name` instead of `/blogs/article-name.html`.
-   **Contact Form**: Frontend validation and submission handled by `js/contact-form-handler.js`, with `send-email.php` on the backend processing email submissions.
-   **Asset Management**: All languages share root-relative paths for CSS, JavaScript, and image assets to ensure consistency and efficient caching.
-   **SEO**: Implements Schema.org markup, meta tags, and Open Graph protocols, with SEO-friendly, language-specific URLs.

### Feature Specifications
-   **Lesson Categories**: Comprehensive listings for private ski (kids, adults, families), group ski (kids, adults), specialty (Freeride, Freestyle, CARV technology), and snowboard lessons.
-   **Additional Services**: Information on equipment rental, ski trips, webcams, and corporate/school programs.
-   **Blog**: A dedicated section for blog articles.
-   **Seasonal Snowfall Effect**: Animated snowflake effect displayed during winter months (December, January, February) via `/js/snowfall.js`. The script automatically detects the current month and only activates during the ski season.

### System Design Choices
-   **Development Server**: Running on PHP's built-in development server with router.php for local testing.
-   **Production Deployment**: Optimized for Apache/Webempresa hosting with `.htaccess` for clean URL routing.
-   **Static Site Generation**: Primarily a static site, reducing server load and improving performance, with dynamic elements limited to the contact form.
-   **Asset Paths**: All CSS, JavaScript, and image references use root-relative paths (e.g., `/styles.css`, `/images/logo.jpg`) for consistent loading across all directory levels.

## External Dependencies
-   **Frontend Libraries**:
    -   Bootstrap 5.3.0
    -   Font Awesome 6.4.0
    -   jQuery 3.6.0
-   **Fonts**:
    -   Google Fonts (Montserrat, Open Sans)
-   **Backend**:
    -   PHP 8.2 (for `send-email.php`)

## Recent Changes
- **2025-12-01**: SEO Meta Description and Title Optimization
  - Updated meta descriptions and titles across 72 pages (18 pages x 4 languages: EN, FR, CA, PT)
  - Shortened all meta descriptions to under 160 characters for optimal search engine display
  - Optimized titles for SEO with concise, keyword-rich content
  - Fixed language attribute error in pt/aulas-particulares-criancas-baqueira.html (was incorrectly set to French)
  - Fixed French schema/structured data content in Portuguese page with correct Portuguese translations
  - All translations verified for accuracy in English, French, Catalan, and Portuguese

- **2025-12-01**: Fixed hero section mobile overflow issues
  - Fixed hero buttons text overflow by removing fixed height and enabling text wrap
  - Added `height: auto` and `white-space: normal` for buttons on mobile
  - Added global `overflow-x: hidden` on html element to prevent horizontal scrolling
  - Made hero title and lead text responsive on mobile screens
  - Added proper padding and container constraints for hero section on mobile