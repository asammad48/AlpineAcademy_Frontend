<?php
/**
 * Router script for clean URLs
 * Handles language-specific routing and .html extension removal
 * Matches .htaccess logic for consistent behavior
 */

// Get the requested URI
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// If the URI is exactly '/', serve index.html
if ($uri === '/') {
    return false; // Let PHP server handle it normally
}

// 1. Serve existing files directly (CSS, JS, images, etc.)
if (file_exists(__DIR__ . $uri) && is_file(__DIR__ . $uri)) {
    return false; // Let PHP built-in server handle it
}

// 2. Try adding .html extension first (exact match)
$htmlFile = __DIR__ . $uri . '.html';
if (file_exists($htmlFile) && is_file($htmlFile)) {
    include $htmlFile;
    return true;
}

// 3. Handle language-specific word variations (e.g., galeria/galerie/gallery)
// Map of common word variations across languages
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
            include $variantFile;
            return true;
        }
    }
}

// 4. Handle blog directory requests - serve blog.html instead of blog/index.html
// Pattern: /blog/, /en/blog/, /fr/blog/, etc.
if (preg_match('#^/?([a-z]{2}/)?blog/?$#', $uri, $matches)) {
    $langPrefix = isset($matches[1]) ? $matches[1] : '';
    $blogFile = __DIR__ . '/' . $langPrefix . 'blog.html';
    if (file_exists($blogFile) && is_file($blogFile)) {
        include $blogFile;
        return true;
    }
}

// 5. If it's a directory, try serving index.html from it
$cleanUri = rtrim($uri, '/');
$indexFile = __DIR__ . $cleanUri . '/index.html';
if (is_dir(__DIR__ . $cleanUri) && file_exists($indexFile)) {
    include $indexFile;
    return true;
}

// If nothing found, let the server return 404
return false;
