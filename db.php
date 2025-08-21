<?php
$host = "sql113.infinityfree.com";
$user = "if0_39689600";   
$pass = "PARM4wKnMH0pScw"; 
$dbname = "if0_39689600_sralgotrading"; 

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
