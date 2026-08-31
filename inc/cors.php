<?php
/**
 * CORS handling for guard.php / contact.php.
 *
 * In production these are called from the same origin as the page, so no
 * CORS headers are strictly needed. But local dev often serves the HTML
 * from one origin (e.g. a Live Server port) and PHP from another (e.g.
 * `php -S`), and main.js sends an `X-Requested-With` header, which forces
 * the browser to send a preflight OPTIONS request first. Without this,
 * that preflight gets a plain 405 with no CORS headers and the browser
 * blocks the real request before it's ever sent.
 *
 * Reflecting the request's own Origin back (rather than a hardcoded
 * domain) means this works in both places without editing per environment.
 * No cookies/credentials are involved here, so this is safe even though
 * it's permissive.
 */

function cors_handle() {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
    header("Access-Control-Allow-Origin: {$origin}");
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
    header('Vary: Origin');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}
