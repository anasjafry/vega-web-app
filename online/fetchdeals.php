<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');

define('INCLUDE_CHECK', true);
require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

//$token = mysql_real_escape_string($_POST['token']);

//fetching deals and coupon codes
$deals = [];

$query = "SELECT * from z_deals";
$main = mysql_query($query);

$status = 'fail';
$error = '';

while($row = mysql_fetch_assoc($main)){

	$deals[]=array(
		"type" => $row['type'],
		"code" => $row['code'],
		"description" => $row['brief'],
		"isImageAvailable" => $row['isImg'],
		"url" => $row['url'],
		"isAppOnly" => $row['isAppOnly'],
		"validTill" => $row['validTill']
	);
	$status = 'success';
}

$output = array(
	"response" => $deals,
	"status" => $status,
	"error" => $error
	);

echo json_encode($output);

?>
