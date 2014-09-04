<?php

session_start();
require_once '../includes/db.php';

function convertResultToArray($result) {

	$arr = array();
	if ($result->num_rows > 0) {
		while ($row = $result->fetch_assoc()) {
			$arr[] = $row;
		}
	}

	return $arr;

}

function executeQuery($query) {
	global $mysqli;
	$result = $mysqli->query($query) or die($mysqli->error . __LINE__);
	return $result;
}

function checkUserData() {
	$array = func_get_args();
	$count = func_num_args();

	for ($i = 0; $i < func_num_args(); $i++) {
		$var = func_get_arg($i);
		if (mb_strlen($var) == 0 && mb_strlen($var) > 32) {
			return false;
		}
	}

	return true;
}

function returnOutputJSON($code, $string) {
	$array         = array();//returned Output [0] - error/success [1] - error/string
	$array['code'] = $code;
	$array['data'] = $string;
	echo json_encode($array);
	exit;
}

function saveUserSession($username, $access, $data) {
	$query = "SELECT * from user where username='$myUsername'";
}

?>