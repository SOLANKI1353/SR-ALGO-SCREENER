<?php
header('Content-Type: application/json');

$broker = $_GET['broker'] ?? '';
$action = $_GET['action'] ?? '';

if(!$broker || !$action) {
    echo json_encode(["error"=>"missing params"]);
    exit;
}

if($action=="connect") {
    echo json_encode(["status"=>"connected","broker"=>$broker]);
}
elseif($action=="disconnect") {
    echo json_encode(["status"=>"disconnected","broker"=>$broker]);
}
else {
    echo json_encode(["error"=>"invalid action"]);
}
?>
