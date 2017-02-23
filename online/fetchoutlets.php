<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');

define('INCLUDE_CHECK', true);
require 'connect.php';

error_reporting(0);

$status = false;
$error = '';

if(isset($_GET['outletcode'])){
	$query1 = "SELECT * from z_outlets WHERE code='{$_GET['outletcode']}'";
	$main1 = mysql_query($query1);

	if($rows1 = mysql_fetch_assoc($main1)){
	$status = true;
	$response=array(
		"name"=> $rows1['name'],
		"code"=> $rows1['code'],
		"line1"=> $rows1['line1'],
		"line2"=> $rows1['line2'],
		"mobile"=> $rows1['contact'],
		"lat"=> $rows1['latitude'],
		"lng"=> $rows1['longitude'],
		"pictures" => json_decode($rows1['fotos'])
	);
	}
	else{
		$status = false;
		$error = "Invalid Code";
	}

}

else{
$query = "SELECT DISTINCT city from z_outlets";
$main = mysql_query($query);

while($rows = mysql_fetch_assoc($main)){
	$query1 = "SELECT * from z_outlets WHERE city='{$rows['city']}'";
	$main1 = mysql_query($query1);
	$outlets = [];

	while($rows1 = mysql_fetch_assoc($main1)){
		$outlets[]=array(
			"name"=> $rows1['name'],
			"code"=> $rows1['code'],
			"line1"=> $rows1['line1'],
			"line2"=> $rows1['line2'],
			"mobile"=> $rows1['contact'],
			"lat"=> $rows1['latitude'],
			"lng"=> $rows1['longitude'],
			"pictures" => json_decode($rows1['fotos'])
		);
		$status = true;
	}

	$response[]= array(
		"city" => $rows['city'],
		"outlets" => $outlets
	);
}

}


//Final Results
$output = array(
	"response" => $response,
	"status" => $status,
	"error" => $error
	);
echo json_encode($output);
?>
