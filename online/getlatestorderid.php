<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');
error_reporting(0);

//Database Connection
define('INCLUDE_CHECK', true);
require 'connect.php';

//Encryption Credentials
define('SECURE_CHECK', true);
require 'secure.php';

$_POST = json_decode(file_get_contents('php://input'), true);

//Encryption Validation
if(!isset($_POST['token'])){
	$output = array(
		"status" => false,
		"error" => "Access Token is missing"
	);
	die(json_encode($output));
}

//Expiry Validation
date_default_timezone_set('Asia/Calcutta');
$dateStamp = date_create($tokenid['date']);
$today = date_create(date("Y-m-j"));
$interval = date_diff($dateStamp, $today);
$interval = $interval->format('%a');

if($interval > $tokenExpiryDays){
	$output = array(
		"status" => false,
		"error" => "Expired Token"
	);
	die(json_encode($output));
}

$token = $_POST['token'];
$decryptedtoken = openssl_decrypt($token, $encryptionMethod, $secretHash);
$tokenid = json_decode($decryptedtoken,true);

//Check if the token is tampered
if($tokenid['mobile']){
	$userID = $tokenid['mobile'];
}
else{
	$output = array(
		"status" => false,
		"error" => "Token is tampered"
	);
	die(json_encode($output));
}


$status = false;
$error = 'Something went wrong';

	$query = "SELECT orderID from zaitoon_orderlist WHERE status='3' AND userID='{$userID}' AND feedback='' ORDER BY orderID DESC";
	$main = mysql_query($query);
	$rows = mysql_fetch_assoc($main);
	if(!empty($rows)){
		$query2 = "SELECT orderID from zaitoon_orderlist WHERE status='3' AND userID='{$userID}' ORDER BY orderID DESC";
		$main2 = mysql_query($query2);
		$rows2 = mysql_fetch_assoc($main2);

		if(!empty($rows2)){
			if($rows['orderID'] == $rows2['orderID']){
				$status = true;
				$error = '';
				$response = $rows['orderID'];
			}
		}
	}

$output = array(
	"status" => $status,
	"error" => $error,
	"response" => $response
);

echo json_encode($output);
?>
