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

	if($rows1 = mysql_fetch_assoc(mysql_query("SELECT * from z_outlets WHERE code='{$_GET['outletcode']}'"))){
	$status = true;
	//Get location specific details

	$rows2 = mysql_fetch_assoc(mysql_query("SELECT * from z_locations WHERE outlet='{$_GET['outletcode']}' AND locationCode='{$_GET['locationCode']}'"));

	$response = array(
		"outlet" => $rows1['code'],
		"city"  => $rows1['city'],
		"location"  => $rows2['location'],
		"locationCode"  => $rows2['locationCode'],
		"name"=> $rows1['name'],
		"line1"=> $rows1['line1'],
		"line2"=> $rows1['line2'],
		"mobile"=> $rows1['contact'],
		"lat"=> $rows1['latitude'],
		"lng"=> $rows1['longitude'],
		"pictures" => json_decode($rows1['fotos']),
		"isTaxCollected" => $rows1['isTaxCollected'] == 1? true: false,
		"taxPercentage"=> $rows1['taxPercentage'],
		"isParcelCollected"=> $rows1['isParcelCollected'] == 1? true: false,
		"parcelPercentageDelivery"=> $rows1['parcelPercentageDelivery'],
		"parcelPercentagePickup"=> $rows1['parcelPercentagePickup'],
		"minTime"=> $rows2['minTime'],
		"minAmount"=> $rows2['minOrder'],
		"isAcceptingOnlinePayment"=> $rows1['isAcceptingOnlinePayment'] == 1? true: false

	);
	}
	else{
		$status = false;
		$error = "Invalid Code";
	}

}
else if(isset($_GET['locationCode'])){
$outletInfo = mysql_fetch_assoc(mysql_query("SELECT * from z_locations WHERE locationCode='{$_GET['locationCode']}'"));

if($rows1 = mysql_fetch_assoc(mysql_query("SELECT * from z_outlets WHERE code='{$outletInfo['outlet']}'"))){
$status = true;

$response = array(
	"outlet" => $rows1['code'],
	"city"  => $rows1['city'],
	"location"  => $outletInfo['location'],
	"locationCode"  => $outletInfo['locationCode'],
	"name"=> $rows1['name'],
	"line1"=> $rows1['line1'],
	"line2"=> $rows1['line2'],
	"mobile"=> $rows1['contact'],
	"lat"=> $rows1['latitude'],
	"lng"=> $rows1['longitude'],
	"pictures" => json_decode($rows1['fotos']),
	"isTaxCollected" => $rows1['isTaxCollected'] == 1? true: false,
	"taxPercentage"=> $rows1['taxPercentage'],
	"isParcelCollected"=> $rows1['isParcelCollected'] == 1? true: false,
	"parcelPercentageDelivery"=> $rows1['parcelPercentageDelivery'],
	"parcelPercentagePickup"=> $rows1['parcelPercentagePickup'],
	"minTime"=> $outletInfo['minTime'],
	"minAmount"=> $outletInfo['minOrder'],
	"isAcceptingOnlinePayment"=> $rows1['isAcceptingOnlinePayment'] == 1? true: false

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
