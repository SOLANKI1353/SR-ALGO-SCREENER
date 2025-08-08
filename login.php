<?php
include("db.php");
session_start();

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
$result = $conn->query($sql);

if ($result->num_rows == 1) {
    $_SESSION['username'] = $username;
    header("Location: dashboard.html");
} else {
    echo "Invalid login";
}
?>
