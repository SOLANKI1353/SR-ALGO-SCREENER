<?php
$host = "localhost";
$user = "admin";
$pass = "admin123";
$dbname = "sr_algo_db";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
