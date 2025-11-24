<?php
/**
 * Router script for PHP built-in server
 * Handles clean URLs by removing .html extension requirement
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

// 2. Try adding .html extension first (prioritize .html files over directories)
// This resolves conflicts like blog.html vs blog/ folder
$htmlFile = __DIR__ . $uri . '.html';
if (file_exists($htmlFile) && is_file($htmlFile)) {
    include $htmlFile;
    return true;
}

// 3. If it's a directory, try serving index.html from it
$cleanUri = rtrim($uri, '/');
$indexFile = __DIR__ . $cleanUri . '/index.html';
if (is_dir(__DIR__ . $cleanUri) && file_exists($indexFile)) {
    include $indexFile;
    return true;
}

// If nothing found, let the server return 404
return false;
