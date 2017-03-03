<?php

/*** YET TO ADD "NO RESULTS" SCENARIO ***/

header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');

define('INCLUDE_CHECK', true);
require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$orderid = $_GET['id'];//VALIDATION pending

$query = "UPDATE zaitoon_orderlist SET status = 5 WHERE orderID='{$orderid}'";


mysql_query($query);

$msg = array(
	'status' => 'success'
);

echo json_encode($msg);
		
?>