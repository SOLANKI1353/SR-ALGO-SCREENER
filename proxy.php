<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

if(!isset($_GET['url'])) {
    echo json_encode(["error"=>"No URL"]);
    exit;
}

$url = $_GET['url'];

// केवल NSE India endpoints को allow करेंगे
if(strpos($url, "nseindia.com") === false) {
    echo json_encode(["error"=>"Only NSE India URLs allowed"]);
    exit;
}

// cURL से call
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_ENCODING, "");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Accept: application/json, text/plain, */*',
    'Referer: https://www.nseindia.com/'
]);
$response = curl_exec($ch);

if(curl_errno($ch)) {
    echo json_encode(["error"=>curl_error($ch)]);
} else {
    echo $response;
}
curl_close($ch);
?>
