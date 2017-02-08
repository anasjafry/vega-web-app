<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');
error_reporting(0);

define('INCLUDE_CHECK', true);
require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$userID = $_POST['userID'];
$info = $_POST['info'];
$encryptionMethod = "AES-256-CBC";  
$secretHash = "7a6169746f6f6e746f6b656e";
$token = $_POST['token'];
$decryptedtoken = openssl_decrypt($token, $encryptionMethod, $secretHash);
//echo($decryptedtoken);
$tokenid = json_decode($decryptedtoken,true);

$status = 'fail';
$error = 'No such user exists!';
//$error = 
//$output = [];
$i = 0;

if($tokenid['mobile'] == $userID){
	$query = "SELECT * from z_users WHERE mobile='{$userID}'";
	$main = mysql_query($query);
	$rows = mysql_fetch_assoc($main);
	
	$status = 'success';
	$error = '';

	$query = "UPDATE z_users SET `name`='{$info['name']}' , `email`='{$info['email']}' WHERE mobile='{$userID}'";
	$main = mysql_query($query);
}


$output = array(
	"status" => $status,
	"error" => $error
);

echo json_encode($output);
		
?>

