<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');

define('INCLUDE_CHECK', true);
require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$mobile = $_POST['mobile'];

//$token = mysql_real_escape_string($_POST['token']);

$output = [];

$query = "SELECT * from z_users WHERE mobile='{$mobile}'";
$main = mysql_query($query);
$rows = mysql_fetch_assoc($main);
$output = [];
$status = '';
$error = '';

if(!empty($rows)){
	$response[] = array(
		"userid" => $mobile,
		"isOTPSent" => true
	);
	$status = 'success';
}
else{
	$response[] = array(
		"userid" => $mobile,
		"isOTPSent" => false
	);
	$status = 'fail';
	$error = 'No user exists';
}

$output[] = array(
	"response" => $response,
	"status" => $status,
	"error" => $error
);

//$list = array('status' => $flag);    
echo json_encode($output);
		
?>

