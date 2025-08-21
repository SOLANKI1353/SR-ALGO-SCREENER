<?php
function base64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}
function create_jwt($payload, $secret='mysecret') {
    $header = base64url_encode(json_encode(['alg'=>'HS256','typ'=>'JWT']));
    $payload = base64url_encode(json_encode($payload));
    $signature = base64url_encode(hash_hmac('sha256', $header . "." . $payload, $secret, true));
    return $header . "." . $payload . "." . $signature;
}
function verify_jwt($jwt, $secret='mysecret') {
    $parts = explode('.', $jwt);
    if(count($parts) !== 3) return false;
    list($header, $payload, $sig) = $parts;
    $check = base64url_encode(hash_hmac('sha256', $header . "." . $payload, $secret, true));
    return hash_equals($check, $sig) ? json_decode(base64_decode(strtr($payload, '-_', '+/')), true) : false;
}
?>

