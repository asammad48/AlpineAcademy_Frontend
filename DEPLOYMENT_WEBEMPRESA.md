# Deployment Guide for Webempresa Hosting

This guide provides step-by-step instructions for deploying the Alpine Ski Academy website to Webempresa hosting.

## Prerequisites

- Active Webempresa hosting account
- FTP/SFTP access credentials
- Domain name configured and pointed to Webempresa servers

## File Preparation (Already Complete)

✅ All asset paths converted to root-relative paths (`/styles.css`, `/images/logo.jpg`, etc.)
✅ `.htaccess` file created with clean URL configuration
✅ Blog folders renamed from `/blog/` to `/blogs/`
✅ All HTML internal links use clean URLs (without `.html` extension)

## Deployment Steps

### 1. Connect to Your Hosting Account

**Option A: Using FTP/SFTP Client (Recommended)**
- Download FileZilla or similar FTP client
- Get your FTP credentials from Webempresa cPanel
- Connect using:
  - Host: `ftp.yourdomain.com` or your server IP
  - Username: Your cPanel username
  - Password: Your cPanel password
  - Port: 21 (FTP) or 22 (SFTP recommended)

**Option B: Using cPanel File Manager**
- Log in to your Webempresa cPanel
- Click on "File Manager"
- Navigate to `public_html` directory

### 2. Prepare Your Local Files

Create a deployment package with these files and folders:

```
/
├── .htaccess                    # ✅ Clean URL routing
├── index.html                   # Spanish homepage
├── blog.html                    # Blog listing page
├── send-email.php              # Contact form handler
├── styles.css                   # Main stylesheet
├── script.js                    # Main JavaScript
├── animation.js                 # Animation JavaScript
├── 404.html                     # Error page
├── robots.txt                   # SEO file
├── sitemap.xml                  # SEO sitemap
├── favicon files                # Favicon and icons
├── /images/                     # All website images
├── /js/                         # JavaScript files
├── /css/                        # Additional CSS files
├── /blogs/                      # Blog articles (Spanish)
├── /en/                         # English version
├── /fr/                         # French version
├── /ca/                         # Catalan version
├── /pt/                         # Portuguese version
└── all other .html files
```

**DO NOT UPLOAD:**
- `router.php` (not needed on Apache server)
- `.git/` folder
- `_old_files_backup/` folder
- `clases-esqui-baqueira/` folder (if not needed)
- `node_modules/` (if exists)
- `.replit` file
- `replit.nix` file
- Development files

### 3. Upload Files to Webempresa

**Using FTP Client:**
1. Select all files and folders listed above
2. Drag and drop to the `public_html` folder on your server
3. Wait for upload to complete (may take several minutes)
4. Verify file permissions:
   - Folders: 755
   - Files: 644
   - `.htaccess`: 644

**Using cPanel File Manager:**
1. Compress all files into a ZIP archive
2. Upload the ZIP file to `public_html`
3. Extract the ZIP file
4. Delete the ZIP file after extraction
5. Verify file permissions as above

### 4. Configure .htaccess (If Needed)

The `.htaccess` file is pre-configured, but you may want to uncomment these optional settings:

**Force HTTPS (Recommended for production):**
```apache
# Uncomment these lines in .htaccess:
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

**Force www or non-www:**
```apache
# Choose ONE option and uncomment in .htaccess

# Option 1: Force www
RewriteCond %{HTTP_HOST} !^www\. [NC]
RewriteRule ^(.*)$ https://www.%{HTTP_HOST}/$1 [R=301,L]

# Option 2: Force non-www (remove www)
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]
```

### 5. Configure PHP Settings (If Needed)

The contact form (`send-email.php`) requires PHP to be enabled. Webempresa typically has PHP enabled by default.

To change PHP version:
1. Go to cPanel → "Select PHP Version"
2. Choose PHP 8.0 or higher
3. Click "Set as current"

### 6. Test Your Website

After deployment, test these URLs:

**Homepage:**
- `https://yourdomain.com/` → Should load Spanish homepage
- `https://yourdomain.com/en/` → Should load English homepage
- `https://yourdomain.com/fr/` → Should load French homepage

**Clean URLs (without .html):**
- `https://yourdomain.com/sobre-nosotros` ✅
- `https://yourdomain.com/en/about-us` ✅
- `https://yourdomain.com/fr/a-propos-de-nous` ✅

**Blog URLs:**
- `https://yourdomain.com/blogs` → Blog listing
- `https://yourdomain.com/blogs/como-llegar-baqueira-beret` → Blog article
- `https://yourdomain.com/en/blogs/how-to-get-to-baqueira-beret` → English article

**Asset Loading:**
- Check that all images load correctly
- Check that CSS is applied
- Check that JavaScript works (language switcher, forms, etc.)

**Contact Form:**
- Fill out and submit the contact form
- Verify email is received

### 7. Set Up Email (For Contact Form)

Configure email settings in `send-email.php`:

```php
// Update these lines with your email
$to = "reservas@alpineskiacademy.com";  // Your email address
```

**Email Configuration in Webempresa:**
1. Go to cPanel → "Email Accounts"
2. Create email account: `reservas@yourdomain.com`
3. Set up email forwarding if needed

### 8. Configure DNS (If Not Done)

If your domain is new or not pointing to Webempresa:

1. Get nameservers from Webempresa welcome email
2. Update nameservers at your domain registrar:
   - Example: `ns1.webempresa.eu`, `ns2.webempresa.eu`
3. Wait 24-48 hours for DNS propagation

### 9. Install SSL Certificate (HTTPS)

Webempresa provides free Let's Encrypt SSL:

1. Go to cPanel → "SSL/TLS Status"
2. Find your domain
3. Click "Run AutoSSL"
4. Wait for installation (usually 5-10 minutes)
5. Test: `https://yourdomain.com`

After SSL is installed, uncomment the HTTPS redirect in `.htaccess` (see Step 4).

## Troubleshooting

### Issue: Clean URLs not working (404 errors)

**Solution:**
1. Verify `.htaccess` file was uploaded
2. Check file permissions: `.htaccess` should be 644
3. Verify mod_rewrite is enabled (contact Webempresa support)
4. Clear browser cache and try again

### Issue: Images not loading

**Solution:**
1. Verify image files were uploaded to correct directories
2. Check file paths in HTML use root-relative paths (`/images/photo.jpg`)
3. Verify file permissions: Images should be 644, folders 755
4. Check image file names for special characters or spaces

### Issue: Contact form not working

**Solution:**
1. Verify PHP is enabled (check cPanel)
2. Check PHP version is 7.4 or higher
3. Verify email account exists
4. Check spam folder for test emails
5. Review PHP error logs in cPanel

### Issue: CSS/JS not loading

**Solution:**
1. Clear browser cache (Ctrl+F5)
2. Verify files were uploaded to correct directories
3. Check file paths use root-relative format (`/styles.css`)
4. Verify file permissions: CSS/JS should be 644

### Issue: 500 Internal Server Error

**Solution:**
1. Check `.htaccess` syntax for errors
2. Review error logs in cPanel → "Error Log"
3. Verify PHP version compatibility
4. Contact Webempresa support if error persists

## Performance Optimization (Optional)

The `.htaccess` file includes:
- ✅ GZIP compression for faster loading
- ✅ Browser caching for images, CSS, and JavaScript
- ✅ Security headers

Additional optimizations:
1. Enable Cloudflare (free CDN)
2. Optimize images before upload (use WebP format)
3. Minify CSS and JavaScript files
4. Enable HTTP/2 in cPanel

## Maintenance

### Regular Updates
- Backup website monthly (use cPanel backup tool)
- Monitor contact form submissions
- Check error logs monthly
- Update content as needed

### Contact Webempresa Support

If you encounter issues:
- Email: soporte@webempresa.com
- Support ticket system in client area
- Phone support (Spain)

## Checklist Before Going Live

- [ ] All files uploaded to `public_html`
- [ ] `.htaccess` file is present and configured
- [ ] File permissions set correctly (755/644)
- [ ] Domain DNS pointing to Webempresa
- [ ] SSL certificate installed and working
- [ ] All pages load correctly (test all languages)
- [ ] Clean URLs work (test several pages)
- [ ] Images, CSS, and JavaScript loading
- [ ] Contact form working and tested
- [ ] Blog articles accessible
- [ ] Language switcher working
- [ ] Mobile responsive design verified
- [ ] 404 error page working

## Post-Launch

1. Submit sitemap to Google Search Console
2. Verify Google Analytics (if installed)
3. Test website speed (GTmetrix, PageSpeed Insights)
4. Monitor for broken links
5. Set up regular backups

---

## Support Contact

**Alpine Ski Academy**
- Website: https://alpineskiacademy.com
- Email: reservas@alpineskiacademy.com
- Phone: +34 669 911 342

**Webempresa Support**
- Website: https://www.webempresa.com
- Support: soporte@webempresa.com
