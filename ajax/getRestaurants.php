<?

require_once 'commonFuncs.php';// The mysql database connection script

$query  = "SELECT * from Restaurants";
$result = executeQuery($query);
$arr    = convertResultToArray($result);

echo $json_response = json_encode($arr);

?>