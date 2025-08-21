<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents("php://input"), true);
if(!$input) { echo json_encode(["error"=>"no data"]); exit; }

$signals = [];
foreach($input as $row){
    $sig = "HOLD";
    if($row['chg'] > 2) $sig = "BUY";
    elseif($row['chg'] < -2) $sig = "SELL";
    $signals[] = ["symbol"=>$row['symbol'], "signal"=>$sig];
}

echo json_encode(["signals"=>$signals]);
?>
