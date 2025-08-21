<?php
$host = "sqlXXX.epizy.com"; // InfinityFree से असली host भरें (जैसे sql301.epizy.com)
$user = "epiz_XXXXXXX";    // InfinityFree MySQL Username
$pass = "YOUR_DB_PASSWORD"; // InfinityFree MySQL Password (आप खुद भरें)
$dbname = "epiz_XXXXXXX_db"; // InfinityFree MySQL Database Name

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
