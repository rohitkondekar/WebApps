<?php

require_once 'commonFuncs.php';

$data = json_decode(file_get_contents("php://input"));

if (!checkUserData($data->username, $data->password, $data->name, $data->email)) {

	returnOutputJSON(0, "Problem in User Data");
}

$myUsername = $mysqli->real_escape_string($data->username);
$myPassword = $mysqli->real_escape_string($data->password);
$myEmail    = $mysqli->real_escape_string($data->email);
$myName     = $mysqli->real_escape_string($data->name);

$query = "SELECT * from user where username = '$myUsername' or email = '$myEmail'";

$result = executeQuery($query);
$arr    = convertResultToArray($result);

$login = false;

if (count($arr) != 0) {
	returnOutputJSON(0, "User Already Registered");
}

$hashvalue = hash('ripemd160', $myPassword);
$query     = "INSERT INTO user VALUES ('$myUsername','$hashvalue','$myEmail','$myName',1)";
$result    = executeQuery($query);
returnOutputJSON(1, $result);

?>