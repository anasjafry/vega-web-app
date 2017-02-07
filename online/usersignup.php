<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');
error_reporting(0);

define('INCLUDE_CHECK', true);
require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$mobile = $_POST['mobile'];

$query = "SELECT * from z_users WHERE mobile='{$mobile}'";
$main = mysql_query($query);
$rows = mysql_fetch_assoc($main);
$status = '';
$error = '';


$otp = rand(1000,9999);
$encryptionMethod = "AES-256-CBC";  
$secretHash = "7a6169746f6f6e746f6b656e"; //hexa for "zaitoontoken"

//To encrypt
$encryptedotp = openssl_encrypt($otp, $encryptionMethod, $secretHash);
$decryptedotp = openssl_decrypt($encryptedotp, $encryptionMethod, $secretHash);

echo ($otp);

if(empty($rows)){
	$response = array(
		"userid" => $mobile,
		"isOTPSent" => true,
		"otp" => $encryptedotp
 	);
	$status = 'success';
}
else{
	$response = array(
		"userid" => $mobile,
		"isOTPSent" => false
	);
	$status = 'fail';
	$error = 'User aldready exists';
}

$output = array(
	"response" => $response,
	"status" => $status,
	"error" => $error
);

//$list = array('status' => $flag);    
echo json_encode($output);
		
?>

