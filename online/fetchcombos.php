<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');

define('INCLUDE_CHECK', true);
require 'connect.php';

$combos = [];

if(!isset($_GET['outlet'])){
	$output = array(
		"response" => "",
		"status" => false,
		"error" => "Parameter Missing"
		);

	die(json_encode($output));
}

$query = "SELECT * from z_combos WHERE outlet='{$_GET['outlet']}'";
$main = mysql_query($query);

$status = false;
$error = '';

while($row = mysql_fetch_assoc($main)){

	$combos[]=array(
		"itemCode" => $row['code'],
		"itemName" => $row['name'],
		"itemPrice" => $row['price'],
		"isAvailable" => $row['isAvailable']? true : false,
		"description" => $row['description'],
		"isImageAvailable" => $row['isImg'],
		"url" => $row['url']
	);
	$status = true;
}

$output = array(
	"response" => $combos,
	"status" => $status,
	"error" => $error
	);

echo json_encode($output);

?>
