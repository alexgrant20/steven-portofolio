<?php
/**
 * Shared IP-based rate limiter for the contact form.
 *
 * Used by both guard.php (the AJAX pre-check called before EmailJS sends
 * from the browser) and contact.php (the no-JS server-side fallback), so a
 * visitor gets the same limit however their submission is sent.
 *
 * Storage is a single JSON file keyed by IP address, guarded with flock()
 * so concurrent requests can't race each other into double-counting.
 */

function rl_check_and_record($ip, $storeFile, $maxPerWindow = 3, $windowSeconds = 1800, $minGapSeconds = 60) {
    $dir = dirname($storeFile);
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }

    $fp = @fopen($storeFile, 'c+');
    if (!$fp) {
        // Can't read/write the store — fail open so a filesystem hiccup
        // doesn't silently block every visitor from reaching you.
        return [true, '', 0];
    }

    flock($fp, LOCK_EX);

    $raw  = stream_get_contents($fp);
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        $data = [];
    }

    $now = time();

    // Drop entries that are well outside any window so the file doesn't
    // grow forever.
    foreach ($data as $key => $rec) {
        if (($now - ($rec['windowStart'] ?? 0)) > $windowSeconds * 4) {
            unset($data[$key]);
        }
    }

    $rec = $data[$ip] ?? ['count' => 0, 'windowStart' => $now, 'last' => 0];

    if (($now - $rec['windowStart']) > $windowSeconds) {
        $rec = ['count' => 0, 'windowStart' => $now, 'last' => $rec['last']];
    }

    $allowed    = true;
    $message    = '';
    $retryAfter = 0;

    if (($now - $rec['last']) < $minGapSeconds) {
        $allowed    = false;
        $retryAfter = $minGapSeconds - ($now - $rec['last']);
        $message    = 'You are sending messages too quickly. Please wait a moment and try again.';
    } elseif ($rec['count'] >= $maxPerWindow) {
        $allowed    = false;
        $retryAfter = $windowSeconds - ($now - $rec['windowStart']);
        $message    = "You've reached the limit of {$maxPerWindow} messages for now. Please try again later.";
    }

    if ($allowed) {
        $rec['count'] += 1;
        $rec['last']   = $now;
        $data[$ip]     = $rec;

        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, json_encode($data));
        fflush($fp);
    }

    flock($fp, LOCK_UN);
    fclose($fp);

    return [$allowed, $message, $retryAfter];
}

function rl_client_ip() {
    // REMOTE_ADDR is set by the web server itself, not sent by the client,
    // so it can't be spoofed the way an X-Forwarded-For header can.
    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}
