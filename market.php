<?php
header('Content-Type: application/json');

$mode = $_GET['mode'] ?? 'demo';

if($mode == 'live') {
    $url = "https://www.nseindia.com/api/live-analysis-variations?index=gainers";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'User-Agent: Mozilla/5.0',
        'Accept: application/json'
    ]);
    $res = curl_exec($ch);
    if($res) {
        echo $res;
        exit;
    }
}

// fallback demo data
echo json_encode([
    "data"=>[
        ["symbol"=>"TCS","ltp"=>3650,"chg"=>2.5,"sector"=>"IT"],
        ["symbol"=>"INFY","ltp"=>1490,"chg"=>-1.2,"sector"=>"IT"],
        ["symbol"=>"HDFCBANK","ltp"=>1650,"chg"=>1.1,"sector"=>"BANKS"],
        ["symbol"=>"ICICIBANK","ltp"=>970,"chg"=>-0.8,"sector"=>"BANKS"],
        ["symbol"=>"RELIANCE","ltp"=>2500,"chg"=>0.5,"sector"=>"ENERGY"],
        ["symbol"=>"ONGC","ltp"=>185,"chg"=>3.2,"sector"=>"ENERGY"]
    ]
]);
?>
