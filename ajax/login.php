<?php

require_once 'commonFuncs.php';

// if (isset($_SESSION['user'])) {
// 	returnOutputJSON(1, $_SESSION['user']);
// }

$data = json_decode(file_get_contents("php://input"));

if (!checkUserData($data->username, $data->password)) {

	returnOutputJSON(0, "Problem in User Data");
}

$myUsername = $mysqli->real_escape_string($data->username);
$myPassword = $mysqli->real_escape_string($data->password);

$query = "SELECT * from user where username='$myUsername'";

$result = executeQuery($query);
$arr    = convertResultToArray($result);

$login = false;

if (count($arr) != 1) {
	returnOutputJSON(0, "Invalid Login/Password");
}

$hashvalue = hash('ripemd160', $myPassword);
if ($hashvalue == $arr[0]['password']) {
	$_SESSION['user']  = $myUsername;
	$_SESSION['token'] = openssl_random_pseudo_bytes(16);

	$result             = array();
	$result['username'] = $myUsername;
	$result['token']    = bin2hex($_SESSION['token']);

	returnOutputJSON(1, $result);
} else {
	returnOutputJSON(0, "Invalid Login/Password");
}

?>