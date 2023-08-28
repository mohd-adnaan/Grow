<?php
$dbconn = pg_connect("host=localhost dbname=growSDB user=postgres password=Postgress!@#$")
    or die('Could not connect: ' . pg_last_error());

function test_input($data) 
    {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        
        return $data;
}

?>