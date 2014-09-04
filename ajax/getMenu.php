<?php
session_start();

require_once 'commonFuncs.php';// The mysql database connection script
$data = json_decode(file_get_contents("php://input"));

if (isset($data)) {
	$query              = "SELECT * from Menu where restaurantid='$data->id'";
	$result             = executeQuery($query);
	$arr                = convertResultToArray($result);
	echo $json_response = json_encode($arr);
} else {
	echo "false";
}
?>