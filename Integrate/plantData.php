<?php
include_once("connection.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    if(isset($_POST["district"]) && !empty($_POST["district"])) {
        $district = mysqli_real_escape_string($dbconn, $_POST["district"]);

        $sql = "
            SELECT pd.*
            FROM plant_detailed_data pd
            JOIN species_zone_association sza ON pd.scientific_name IN (
                SELECT JSON_UNQUOTE(JSON_EXTRACT(sza.scientificName, CONCAT('$[', numbers.n, ']')))
                FROM (SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4) numbers
            )
            JOIN district_zone_association dza ON sza.zoneIndex = dza.zone_index
            WHERE dza.district = '$district' and sza.name = 'Shade trees'
        ";

        $result = mysqli_query($dbconn, $sql);

        if ($result) {

            $plantData = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $plantData[] = $row;
            }

            echo json_encode(["success" => true, "data" => $plantData]);
        } else {
            // Provide detailed error message
            echo json_encode(["success" => false, "message" => "Galat hai: " . mysqli_error($dbconn)]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Invalid 'district' parameter"]);
    }
} else {

    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}

mysqli_close($dbconn);
?>
