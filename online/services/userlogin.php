<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');

define('INCLUDE_CHECK', true);
require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$mobile = mysql_real_escape_string($_POST['mobile']);

$query = "SELECT * from z_users WHERE mobile='{$mobile}'";
$main = mysql_query($query);
$rows = mysql_fetch_assoc($main);
$status = '';
$error = '';
$otp = 1000; //rand(1000,9999);

if(!empty($rows)){
	$query1 = "UPDATE `z_users` SET `otp`='{$otp}' WHERE mobile='{$mobile}'";
	$main1 = mysql_query($query1);
	$response = array(
		"userid" => $mobile,
		"isOTPSent" => true
	);
	$status = true;
}
else{
	$response = array(
		"userid" => $mobile,
		"isOTPSent" => false
	);
	$status = false;
	$error = 'No user exists';
}

$output = array(
	"response" => $response,
	"status" => $status,
	"error" => $error
);

echo json_encode($output);

?>
