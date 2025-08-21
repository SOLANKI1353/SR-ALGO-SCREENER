<?php
header('Content-Type: application/json');
require 'db.php';
require 'helpers.php';

$action = $_GET['action'] ?? '';

if($action == 'signup') {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $conn->real_escape_string($data['email']);
    $pass = password_hash($data['pass'], PASSWORD_BCRYPT);
    $conn->query("INSERT INTO users (email,pass) VALUES ('$email','$pass')");
    echo json_encode(["status"=>"ok"]);
}
elseif($action == 'login') {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $conn->real_escape_string($data['email']);
    $pass = $data['pass'];
    $res = $conn->query("SELECT * FROM users WHERE email='$email' LIMIT 1");
    if($row = $res->fetch_assoc()) {
        if(password_verify($pass, $row['pass'])) {
            $token = create_jwt(['email'=>$email,'iat'=>time()]);
            echo json_encode(["status"=>"ok","token"=>$token]);
        } else { echo json_encode(["status"=>"fail"]); }
    } else { echo json_encode(["status"=>"fail"]); }
}
?>

