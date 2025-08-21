<?php
header('Content-Type: application/json');

$fo = [
    "NIFTY"=>["expiry"=>"2025-08-28","strikes"=>[19000,19100,19200,19300]],
    "BANKNIFTY"=>["expiry"=>"2025-08-28","strikes"=>[42000,42100,42200,42300]],
    "RELIANCE"=>["expiry"=>"2025-08-28","strikes"=>[2400,2450,2500,2550]]
];

echo json_encode($fo);
?>
