<?php
$DB_HOST = '127.0.0.1';
$DB_USER = 'root';
$DB_PASS = 'root';
$DB_NAME = 'RestaurantDBSample';
$mysqli  = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

if (mysqli_connect_errno()) {
	print_r("Connect failed: %s\n", mysqli_connect_error());
	exit();
}

?>
