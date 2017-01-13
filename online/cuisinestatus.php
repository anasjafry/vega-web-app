<?php

/*** YET TO ADD "NO RESULTS" SCENARIO ***/

header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');

define('INCLUDE_CHECK', true);
require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$cuisine = $_GET['cuisine'];//VALIDATION pending

$query = "UPDATE z_menu SET isAvailable = 1 WHERE mainType='{$cuisine}'";


mysql_query($query);

$msg = array(
	'status' => 'success'
);

echo json_encode($msg);
		
?>