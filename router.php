<?php
/**
 * Router script for PHP built-in server
 * Handles clean URLs by removing .html extension requirement
 */

// Get the requested URI
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// If the URI is exactly '/', serve index.html
if ($uri === '/') {
    $uri = '/index.html';
}

// Check if the requested file exists
if (file_exists(__DIR__ . $uri)) {
    // If it's a directory, try to serve index.html from it
    if (is_dir(__DIR__ . $uri)) {
        $indexFile = rtrim($uri, '/') . '/index.html';
        if (file_exists(__DIR__ . $indexFile)) {
            return false;
        }
        // Directory exists but no index.html, continue to try .html extension
    } else {
        // It's a file, let PHP built-in server handle it
        return false;
    }
}

// If the file doesn't exist, try adding .html extension
$htmlFile = $uri . '.html';
if (file_exists(__DIR__ . $htmlFile)) {
    // Serve the HTML file
    include __DIR__ . $htmlFile;
    return true;
}

// If still not found, check if it's a directory with index.html
if (is_dir(__DIR__ . $uri)) {
    $indexFile = rtrim($uri, '/') . '/index.html';
    if (file_exists(__DIR__ . $indexFile)) {
        include __DIR__ . $indexFile;
        return true;
    }
}

// If nothing found, let the server return 404
return false;
