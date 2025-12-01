<?php
/**
 * Router script for clean URLs
 * Handles language-specific routing, .html extension removal, and performance optimization
 * Matches .htaccess logic for consistent behavior
 */

// Performance: Set caching headers and serve static file
function serveStaticFile($file) {
    $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    
    // Define cache durations by file type (in seconds)
    $cacheRules = [
        // Images - cache for 1 year
        'jpg' => 31536000,
        'jpeg' => 31536000,
        'png' => 31536000,
        'gif' => 31536000,
        'webp' => 31536000,
        'svg' => 31536000,
        'ico' => 31536000,
        // CSS and JS - cache for 1 year
        'css' => 31536000,
        'js' => 31536000,
        // Fonts - cache for 1 year
        'woff' => 31536000,
        'woff2' => 31536000,
        'ttf' => 31536000,
        'otf' => 31536000,
        'eot' => 31536000,
        // Video - cache for 1 month
        'mp4' => 2592000,
        'webm' => 2592000,
    ];
    
    // MIME types mapping
    $mimeTypes = [
        'html' => 'text/html; charset=UTF-8',
        'htm' => 'text/html; charset=UTF-8',
        'css' => 'text/css; charset=UTF-8',
        'js' => 'application/javascript; charset=UTF-8',
        'json' => 'application/json; charset=UTF-8',
        'xml' => 'application/xml; charset=UTF-8',
        'svg' => 'image/svg+xml',
        'webp' => 'image/webp',
        'png' => 'image/png',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'gif' => 'image/gif',
        'ico' => 'image/x-icon',
        'woff' => 'font/woff',
        'woff2' => 'font/woff2',
        'ttf' => 'font/ttf',
        'otf' => 'font/otf',
        'eot' => 'application/vnd.ms-fontobject',
        'mp4' => 'video/mp4',
        'webm' => 'video/webm',
        'pdf' => 'application/pdf',
    ];
    
    // Set Content-Type
    if (isset($mimeTypes[$ext])) {
        header("Content-Type: " . $mimeTypes[$ext]);
    }
    
    // Set caching headers
    if (isset($cacheRules[$ext])) {
        $duration = $cacheRules[$ext];
        header("Cache-Control: public, max-age=$duration, immutable");
        header("Expires: " . gmdate("D, d M Y H:i:s", time() + $duration) . " GMT");
    }
    
    // Try gzip compression for text-based files
    $compressibleTypes = ['css', 'js', 'json', 'xml', 'svg'];
    $canCompress = extension_loaded('zlib') && !ini_get('zlib.output_compression');
    
    if (in_array($ext, $compressibleTypes) && $canCompress) {
        ob_start('ob_gzhandler');
    } else {
        // Set Content-Length when not using compression
        header("Content-Length: " . filesize($file));
    }
    
    // Serve the file
    readfile($file);
    return true;
}

// Serve HTML files with compression and no-cache headers
function serveHtmlFile($file) {
    header("Content-Type: text/html; charset=UTF-8");
    header("Cache-Control: no-cache, must-revalidate");
    
    // Enable gzip compression
    if (extension_loaded('zlib') && !ini_get('zlib.output_compression')) {
        ob_start('ob_gzhandler');
    }
    
    include $file;
    return true;
}

// Get the requested URI
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// If the URI is exactly '/', serve index.html
if ($uri === '/') {
    $indexFile = __DIR__ . '/index.html';
    if (file_exists($indexFile)) {
        return serveHtmlFile($indexFile);
    }
    return false;
}

// 1. Serve existing files directly (CSS, JS, images, etc.)
$requestedFile = __DIR__ . $uri;
if (file_exists($requestedFile) && is_file($requestedFile)) {
    $ext = strtolower(pathinfo($requestedFile, PATHINFO_EXTENSION));
    
    // HTML files get special handling
    if ($ext === 'html' || $ext === 'htm') {
        return serveHtmlFile($requestedFile);
    }
    
    // All other static files
    return serveStaticFile($requestedFile);
}

// 2. Try adding .html extension first (exact match)
$htmlFile = __DIR__ . $uri . '.html';
if (file_exists($htmlFile) && is_file($htmlFile)) {
    return serveHtmlFile($htmlFile);
}

// 3. Handle language-specific word variations (e.g., galeria/galerie/gallery)
$wordMap = [
    'galeria' => ['galeria', 'galerie', 'gallery'],
    'galerie' => ['galeria', 'galerie', 'gallery'],
    'gallery' => ['galeria', 'galerie', 'gallery'],
];

// Extract the last segment of the URI
$segments = explode('/', trim($uri, '/'));
$lastSegment = end($segments);

// If the last segment has known variations, try them
if (isset($wordMap[$lastSegment])) {
    $basePath = dirname($uri);
    if ($basePath === '.') $basePath = '';
    
    foreach ($wordMap[$lastSegment] as $variation) {
        $variantFile = __DIR__ . $basePath . '/' . $variation . '.html';
        if (file_exists($variantFile) && is_file($variantFile)) {
            return serveHtmlFile($variantFile);
        }
    }
}

// 4. Handle blogs directory requests - serve blog.html instead of blogs/index.html
// Pattern: /blogs/, /en/blogs/, /fr/blogs/, etc.
if (preg_match('#^/?([a-z]{2}/)?blogs/?$#', $uri, $matches)) {
    $langPrefix = isset($matches[1]) ? $matches[1] : '';
    $blogFile = __DIR__ . '/' . $langPrefix . 'blog.html';
    if (file_exists($blogFile) && is_file($blogFile)) {
        return serveHtmlFile($blogFile);
    }
}

// 5. If it's a directory, try serving index.html from it
$cleanUri = rtrim($uri, '/');
$indexFile = __DIR__ . $cleanUri . '/index.html';
if (is_dir(__DIR__ . $cleanUri) && file_exists($indexFile)) {
    return serveHtmlFile($indexFile);
}

// If nothing found, let the server return 404
return false;
