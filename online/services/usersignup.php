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

$mobile = mysql_real_escape_string($_POST['mobile']);

$query = "SELECT * from z_users WHERE mobile='{$mobile}'";
$main = mysql_query($query);
$rows = mysql_fetch_assoc($main);
$status = '';
$error = '';


$otp = rand(1000,9999);
$otp = 1000;

//To encrypt
$encryptedotp = openssl_encrypt($otp, $encryptionMethod, $secretHash);
$decryptedotp = openssl_decrypt($encryptedotp, $encryptionMethod, $secretHash);

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
	$error = 'Mobile nummber aldready registered';
}

$output = array(
	"response" => $response,
	"status" => $status,
	"error" => $error
);

//$list = array('status' => $flag);
echo json_encode($output);

?>
