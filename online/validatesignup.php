<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');
error_reporting(0);
define('INCLUDE_CHECK', true);
require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$encryptionMethod = "AES-256-CBC";  
$secretHash = "7a6169746f6f6e746f6b656e"; //hexa for "zaitoontoken"

$mobile = $_POST['mobile'];
$otpapi = openssl_decrypt($_POST['otpapi'], $encryptionMethod, $secretHash);
$otpuser = $_POST['otpuser'];
$name = $_POST['name'];
$email = $_POST['email'];


date_default_timezone_set('Asia/Calcutta');
$date = date("j F Y");
$time = date("g:i a");

$status = '';
$error = '';

$tokenjson = array(
	"mobile" => $mobile,
	"date" => $date,
	"time" => $time
);

//$token = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key,json_encode($loginjson), MCRYPT_MODE_CBC, $iv);
//hash_hmac ( "sha256" , json_encode($loginjson) , 'zaitoonkey' );

$textToEncrypt = json_encode($tokenjson);

//To encrypt
$token  = openssl_encrypt($textToEncrypt, $encryptionMethod, $secretHash);

//To Decrypt
$decryptedtoken = openssl_decrypt($token, $encryptionMethod, $secretHash);

//Result
//echo "Encrypted: $encryptedMessage <br>Decrypted: $decryptedMessage";


if($otpuser == $otpapi){
	$response = array(
		"name" => $name,
		"mobile" => $mobile,
		"isVerified" => true,
		"isBlocked" => false,
		"lastLogin" => $time.", ".$date,
		"memberSince" => $date,
		"isSubmittedFeedback" => false,
		"memberType" => "fresher",
		"savedAddresses" => [],
		"email" => $email,
		"token" => $token
	);

	$status = 'success';
	$lastLogin = $time.", ".$date;
	$query = "INSERT INTO z_users (`mobile`, `name`, `isVerified`, `isBlocked`, `lastLogin`, `memberSince`, `isFeedback`, `memberType`, `savedAddresses`, `email`, `password`, `otp`) VALUES ('{$mobile}','{$name}','true','false','{$lastLogin}','{$date}','false','fresher','[]','{$email}','password','{$otpapi}')";
	$main = mysql_query($query);
}
else{
	$response = "";
	$status = 'fail';
	$error = 'Not valid credentials';
}

$output = array(
	"response" => $response,
	"status" => $status,
	"error" => $error
);

//$list = array('status' => $flag);    
echo json_encode($output);
		
?>

