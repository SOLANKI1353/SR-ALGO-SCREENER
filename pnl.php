<?php
header('Content-Type: application/json');
require 'db.php';

$action = $_GET['action'] ?? '';

if($action == 'add') {
    $d = json_decode(file_get_contents("php://input"), true);
    $sym = $conn->real_escape_string($d['symbol']);
    $pnl = floatval($d['pnl']);
    $conn->query("INSERT INTO trades (symbol,pnl) VALUES ('$sym',$pnl)");
    echo json_encode(["status"=>"ok"]);
}
elseif($action == 'list') {
    $res = $conn->query("SELECT * FROM trades");
    $out = [];
    while($r=$res->fetch_assoc()) $out[]=$r;
    echo json_encode($out);
}
elseif($action == 'export') {
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment;filename="pnl.csv"');
    $res = $conn->query("SELECT * FROM trades");
    echo "id,symbol,pnl\n";
    while($r=$res->fetch_assoc()) {
        echo $r['id'].",".$r['symbol'].",".$r['pnl']."\n";
    }
}
?>
