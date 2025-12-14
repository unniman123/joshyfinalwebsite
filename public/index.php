<?php
/**
 * PHP Fallback for Dynamic Meta Tags
 * 
 * This file serves as a fallback for tour pages that haven't been pre-rendered yet.
 * It detects tour URLs, fetches data from Supabase, and injects unique meta tags.
 * 
 * Safety Features:
 * - Falls back to static index.html if anything fails
 * - Preserves all JavaScript functionality
 * - No changes to React application
 * - Graceful error handling
 */

// Configuration
$SUPABASE_URL = getenv('VITE_SUPABASE_URL') ?: 'https://jzfqhflssywbciwqfjan.supabase.co';
$SUPABASE_ANON_KEY = getenv('VITE_SUPABASE_ANON_KEY') ?: '';
$SITE_URL = 'https://keralatoursglobal.com';

/**
 * Get the current request path
 */
function getCurrentPath() {
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    return rtrim($path, '/');
}

/**
 * Check if this is a tour detail page
 */
function isTourDetailPage($path) {
    return preg_match('#^/tours/([a-z0-9-]+)$#', $path, $matches) ? $matches[1] : false;
}

/**
 * Fetch tour data from Supabase
 */
function fetchTourData($slug, $supabaseUrl, $anonKey) {
    if (empty($anonKey)) {
        return null;
    }

    $endpoint = rtrim($supabaseUrl, '/') . '/rest/v1/vw_tour_by_slug?slug=eq.' . urlencode($slug);
    
    $context = stream_context_create([
        'http' => [
            'method' => 'GET',
            'header' => [
                "apikey: {$anonKey}",
                "Authorization: Bearer {$anonKey}",
                "Accept: application/json"
            ],
            'timeout' => 5
        ]
    ]);

    $response = @file_get_contents($endpoint, false, $context);
    
    if ($response === false) {
        return null;
    }

    $data = json_decode($response, true);
    return !empty($data) && is_array($data) ? $data[0] : null;
}

/**
 * Load the base HTML template
 */
function loadBaseHTML() {
    $htmlPath = __DIR__ . '/index.html';
    if (file_exists($htmlPath)) {
        return file_get_contents($htmlPath);
    }
    return false;
}

/**
 * Inject meta tags into HTML
 */
function injectMetaTags($html, $tour, $siteUrl) {
    $title = htmlspecialchars($tour['title'] . ' - KeralaToursGlobal - Kerala Travels | Discover India', ENT_QUOTES, 'UTF-8');
    $description = htmlspecialchars(substr($tour['description'], 0, 160), ENT_QUOTES, 'UTF-8');
    $url = $siteUrl . '/tours/' . $tour['slug'];
    $image = !empty($tour['featured_image_url']) ? htmlspecialchars($tour['featured_image_url'], ENT_QUOTES, 'UTF-8') : $siteUrl . '/logo-header.png';

    // Replace title
    $html = preg_replace(
        '/<title>.*?<\/title>/',
        '<title>' . $title . '</title>',
        $html,
        1
    );

    // Replace or add meta description
    if (preg_match('/<meta\s+name=["\']description["\']/i', $html)) {
        $html = preg_replace(
            '/<meta\s+name=["\']description["\']\s+content=["\'].*?["\']\s*\/?>/i',
            '<meta name="description" content="' . $description . '">',
            $html,
            1
        );
    } else {
        $html = preg_replace(
            '/(<head[^>]*>)/i',
            '$1' . "\n    <meta name=\"description\" content=\"{$description}\">",
            $html,
            1
        );
    }

    // Add Open Graph tags
    $ogTags = "
    <!-- Dynamic OG Tags (PHP Injected) -->
    <meta property=\"og:title\" content=\"{$title}\">
    <meta property=\"og:description\" content=\"{$description}\">
    <meta property=\"og:url\" content=\"{$url}\">
    <meta property=\"og:image\" content=\"{$image}\">
    <meta property=\"og:type\" content=\"article\">
    
    <!-- Twitter Card Tags -->
    <meta name=\"twitter:card\" content=\"summary_large_image\">
    <meta name=\"twitter:title\" content=\"{$title}\">
    <meta name=\"twitter:description\" content=\"{$description}\">
    <meta name=\"twitter:image\" content=\"{$image}\">
    
    <!-- Canonical URL -->
    <link rel=\"canonical\" href=\"{$url}\">";

    // Inject before closing </head>
    $html = preg_replace(
        '/(<\/head>)/i',
        $ogTags . "\n  " . '$1',
        $html,
        1
    );

    return $html;
}

/**
 * Main execution
 */
function main() {
    global $SUPABASE_URL, $SUPABASE_ANON_KEY, $SITE_URL;

    $path = getCurrentPath();
    
    // Check if this is a tour detail page
    $tourSlug = isTourDetailPage($path);
    
    if ($tourSlug) {
        // Check if pre-rendered HTML exists
        $prerenderedPath = __DIR__ . $path . '/index.html';
        
        if (file_exists($prerenderedPath)) {
            // Serve pre-rendered HTML (best case)
            readfile($prerenderedPath);
            exit;
        }

        // Pre-rendered HTML doesn't exist - use PHP fallback
        $tourData = fetchTourData($tourSlug, $SUPABASE_URL, $SUPABASE_ANON_KEY);
        
        if ($tourData) {
            // Load base HTML
            $html = loadBaseHTML();
            
            if ($html !== false) {
                // Inject dynamic meta tags
                $html = injectMetaTags($html, $tourData, $SITE_URL);
                
                // Serve modified HTML
                header('Content-Type: text/html; charset=UTF-8');
                echo $html;
                exit;
            }
        }
    }

    // Default: serve static index.html
    $indexPath = __DIR__ . '/index.html';
    if (file_exists($indexPath)) {
        readfile($indexPath);
    } else {
        http_response_code(404);
        echo '<!DOCTYPE html><html><head><title>404 Not Found</title></head><body><h1>404 Not Found</h1></body></html>';
    }
}

// Execute
main();
?>

