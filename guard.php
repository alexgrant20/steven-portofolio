<?php
/**
 * Rate-limit pre-check called from the browser before EmailJS sends a
 * message. EmailJS itself is a client-side API — it has no idea who has
 * submitted the form recently — so this is the server-side gate that
 * actually enforces "not too many messages from the same IP".
 *
 * NOTE ON LIMITS: EmailJS's public key ships in the page source, so a
 * visitor who opens devtools could in theory call EmailJS directly and
 * skip this check entirely. This guard stops normal repeat-submits and
 * simple bots hitting the form — it is not a defense against a determined
 * attacker. If that matters, see the README for a stricter alternative
 * (proxy every send through PHP instead of calling EmailJS from the page).
 */

require __DIR__ . '/inc/cors.php';
cors_handle();

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Method not allowed.']);
    exit;
}

require __DIR__ . '/inc/rate-limit.php';

$ip = rl_client_ip();
[$allowed, $message, $retryAfter] = rl_check_and_record(
    $ip,
    __DIR__ . '/data/rate-limit.json'
);

http_response_code($allowed ? 200 : 429);
echo json_encode([
    'ok'         => $allowed,
    'message'    => $message,
    'retryAfter' => $retryAfter,
]);
