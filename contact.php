<?php
/**
 * Contact form handler.
 *
 * Receives the form in index.html and emails it to $TO.
 * Answers JSON when called by fetch(), and falls back to a plain redirect
 * when JavaScript is unavailable so the form still works.
 *
 * Requires PHP with mail() enabled. See README.md if your host does not
 * provide that — mail() is often unreliable and lands in spam.
 *
 * This is also the fallback path for visitors without JavaScript, so it
 * carries the same IP rate limit as guard.php (see inc/rate-limit.php) —
 * either way in, a visitor gets the same limit.
 */

require __DIR__ . '/inc/rate-limit.php';
require __DIR__ . '/inc/cors.php';
cors_handle();

$TO      = 'stevenalexandergrant@gmail.com';
$SUBJECT = 'Portfolio contact form';

// --- Only accept POST ---------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.html#contact', true, 303);
    exit;
}

$wantsJson = isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'fetch';

// --- Rate limit (same store/limits as guard.php) -------------------------
[$rlAllowed, $rlMessage] = rl_check_and_record(rl_client_ip(), __DIR__ . '/data/rate-limit.json');
if (!$rlAllowed) {
    respond(false, $rlMessage, $wantsJson);
}

function respond($ok, $message, $wantsJson) {
    if ($wantsJson) {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code($ok ? 200 : 400);
        echo json_encode(['ok' => $ok, 'message' => $message]);
    } else {
        header('Location: index.html?sent=' . ($ok ? '1' : '0') . '#contact', true, 303);
    }
    exit;
}

// --- Honeypot: bots fill hidden fields, people do not -------------------
if (!empty($_POST['website'])) {
    respond(true, 'Thanks, your message has been sent.', $wantsJson); // silent drop
}

// --- Validate -----------------------------------------------------------
$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $message === '') {
    respond(false, 'Please fill in every field.', $wantsJson);
}
if (mb_strlen($name) > 100 || mb_strlen($email) > 150 || mb_strlen($message) > 2000) {
    respond(false, 'That message is longer than the form allows.', $wantsJson);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'That email address does not look valid.', $wantsJson);
}

// Strip CR/LF from anything that reaches a header, so a crafted value
// cannot inject extra headers and turn this into an open relay.
$safeEmail = preg_replace('/[\r\n]+/', ' ', $email);
$safeName  = preg_replace('/[\r\n]+/', ' ', $name);

// --- Compose ------------------------------------------------------------
$host = preg_replace('/[^a-zA-Z0-9.\-]/', '', $_SERVER['HTTP_HOST'] ?? 'localhost');

$body = "New message from the portfolio contact form.\n\n"
      . "Name:  {$safeName}\n"
      . "Email: {$safeEmail}\n"
      . "Time:  " . date('Y-m-d H:i:s T') . "\n"
      . "IP:    " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n\n"
      . "-------------------------------------------\n\n"
      . $message . "\n";

// From must be a domain you control or the mail is treated as spoofed;
// the visitor's address goes in Reply-To so a reply reaches them.
$headers = [
    'From: Portfolio <noreply@' . $host . '>',
    'Reply-To: ' . $safeName . ' <' . $safeEmail . '>',
    'Content-Type: text/plain; charset=utf-8',
    'X-Mailer: PHP/' . phpversion(),
];

$sent = @mail($TO, $SUBJECT, $body, implode("\r\n", $headers));

if ($sent) {
    respond(true, 'Thanks, your message has been sent.', $wantsJson);
}
respond(false, 'Sorry, the message could not be sent. Please email me directly.', $wantsJson);
