<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dbconn = pg_connect("host=localhost dbname=growDB user=postgres password=Postgress!@#$")
    or die('Could not connect: ' . pg_last_error());
function test_input($data) 
    {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        
        return $data;
}
?>