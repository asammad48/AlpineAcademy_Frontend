# Deployment Guide for Webempresa

## Overview
This website uses the **Front Controller Pattern** for clean URL routing. All requests are handled through `router.php`, making deployment to webempresa (Apache hosting) straightforward and reliable.

---

## How It Works

### The .htaccess File (Apache Configuration)
The `.htaccess` file uses Apache's `mod_rewrite` to route all requests:

1. **Static files** (CSS, JS, images) → served directly
2. **Existing directories** → accessed normally  
3. **Everything else** → routed through `router.php`

```apache
RewriteEngine On
RewriteBase /

# Serve actual files directly
RewriteCond %{REQUEST_FILENAME} -f
RewriteRule ^ - [L]

# Serve actual directories directly
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Route everything else through router.php
RewriteRule ^(.*)$ router.php [L]
```

### The router.php File (URL Routing Logic)
The `router.php` script handles all URL routing using `$_SERVER['REQUEST_URI']`:

- **Homepage**: `/` → `index.html`
- **Language pages**: `/fr` → `fr/index.html`
- **Blog indexes**: `/fr/blog` → `fr/blog.html`
- **Blog articles**: `/fr/blog/article-name` → `fr/blog/article-name.html`
- **Main pages**: `/sobre-nosotros` → `sobre-nosotros.html`
- **Cross-language word variations**: `/galeria`, `/galerie`, `/gallery` → correct file

---

## Deployment Steps for Webempresa

### 1. Upload Files via FTP/SFTP
Upload all project files to your webempresa hosting directory (typically `/public_html/`):

```
/public_html/
├── .htaccess          ← Apache rewrite rules
├── router.php         ← URL routing logic
├── index.html         ← Homepage (Spanish)
├── blog.html          ← Blog index (Spanish)
├── sobre-nosotros.html
├── clases-de-esqui-baqueira.html
├── /en/               ← English language files
│   ├── index.html
│   ├── blog.html
│   └── blog/
│       └── article.html
├── /fr/               ← French language files
├── /ca/               ← Catalan language files
├── /pt/               ← Portuguese language files
├── /images/           ← Image assets
├── /js/               ← JavaScript files
├── styles.css
└── script.js
```

### 2. Verify mod_rewrite is Enabled
Webempresa has `mod_rewrite` enabled by default. To verify:

1. Log into your webempresa cPanel
2. Check that `.htaccess` files are being processed
3. Test a clean URL like `https://yourdomain.com/sobre-nosotros`

If you get a 404 error, contact webempresa support to enable `mod_rewrite`.

### 3. Test All URL Patterns
After deployment, test these URLs to verify everything works:

- ✅ `https://yourdomain.com/` (homepage)
- ✅ `https://yourdomain.com/fr` (French homepage)
- ✅ `https://yourdomain.com/sobre-nosotros` (about page)
- ✅ `https://yourdomain.com/blog` (blog index)
- ✅ `https://yourdomain.com/fr/blog` (French blog)
- ✅ `https://yourdomain.com/blog/article-name` (blog article)
- ✅ `https://yourdomain.com/styles.css` (CSS loads)
- ✅ `https://yourdomain.com/script.js` (JS loads)

### 4. Check for Errors
If something doesn't work:

1. **Check file permissions**: Files should be `644`, directories `755`
2. **Check .htaccess location**: Must be in the same directory as `router.php`
3. **Check PHP version**: Requires PHP 7.4 or higher (webempresa supports this)
4. **Check error logs**: Access via cPanel → Error Logs

---

## Key Features

### ✅ Clean URLs
- Users see: `https://yourdomain.com/sobre-nosotros`
- Not: `https://yourdomain.com/sobre-nosotros.html`

### ✅ Multilingual Support
- 5 languages: Spanish, English, French, Catalan, Portuguese
- Each language has its own directory: `/en/`, `/fr/`, `/ca/`, `/pt/`
- Main site (no prefix) is Spanish

### ✅ Blog System
- Blog indexes: `/blog`, `/en/blog`, `/fr/blog`, etc.
- Blog articles: `/blog/article-name`, `/en/blog/article-name`, etc.
- Articles stored in: `/blog/`, `/en/blog/`, `/fr/blog/`, etc.

### ✅ SEO-Friendly
- All URLs work with or without trailing slashes
- Static files (CSS/JS/images) load directly
- Clean, readable URLs for better search rankings

---

## Troubleshooting

### Problem: "404 Not Found" for Clean URLs
**Solution**: mod_rewrite is not enabled. Contact webempresa support.

### Problem: CSS/JS Not Loading
**Solution**: Check file paths are root-relative (starting with `/`):
```html
<link rel="stylesheet" href="/styles.css">
<script src="/script.js"></script>
```

### Problem: Blog Pages Show Wrong Content
**Solution**: Verify `router.php` has correct blog directory handling logic (lines 57-66).

### Problem: Pages Not Updating After Changes
**Solution**: Clear browser cache. The `.htaccess` includes cache-control headers for HTML/PHP files.

---

## Performance Notes

- Static files are served directly by Apache (fast)
- Only dynamic URLs go through PHP routing
- No database required (static HTML site)
- Perfect for hosting on webempresa's shared hosting

---

## Support

If you encounter issues with webempresa deployment:

1. Check this guide first
2. Review webempresa's PHP and Apache documentation
3. Contact webempresa support for server-specific issues

---

## Technical Details

**Framework**: None (vanilla PHP + Apache)  
**PHP Version**: 7.4+ (tested on 8.2)  
**Server**: Apache with mod_rewrite  
**Hosting**: Webempresa (Spanish hosting provider)  
**URL Pattern**: Front Controller (used by Laravel, WordPress, etc.)

This is a battle-tested pattern used by millions of websites worldwide.
