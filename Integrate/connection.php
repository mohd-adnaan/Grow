<?php
$servername = "localhost";
$username = "root";
$password = "mysql";
$dbname = "datagrow";

// Create connection
$dbconn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$dbconn) {
    die("Connection failed: " . mysqli_connect_error());
}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>
