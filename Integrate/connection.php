<?php
$dbconn = pg_connect("host=localhost dbname=minorProject user=postgres password=mysecretpassword")
    or die('Could not connect: ' . pg_last_error());

function test_input($data) 
    {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        
        return $data;
}
?>