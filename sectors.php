<?php
header('Content-Type: application/json');

$sectors = [
    "IT"=>["TCS","INFY","WIPRO","HCLTECH"],
    "BANKS"=>["HDFCBANK","ICICIBANK","KOTAKBANK","SBIN"],
    "ENERGY"=>["RELIANCE","ONGC","BPCL","IOC"],
    "PHARMA"=>["SUNPHARMA","CIPLA","DRREDDY","DIVISLAB"],
    "AUTO"=>["TATAMOTORS","M&M","EICHERMOT","BAJAJ-AUTO"]
];

echo json_encode($sectors);
?>
