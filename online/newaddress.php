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
$address = json_decode($_POST['address']); 

$encryptionMethod = "AES-256-CBC";  
$secretHash = "7a6169746f6f6e746f6b656e";
$token = $_POST['token'];
$decryptedtoken = openssl_decrypt($token, $encryptionMethod, $secretHash);
//echo($decryptedtoken);
$tokenid = json_decode($decryptedtoken,true);
//$error = 
//$output = [];
$i = 0;
$id = 0;
//echo($tokenid['mobile']);
if($tokenid['mobile'] == $userID){
	$status = 'success';
	$query = "SELECT * from z_users WHERE mobile='{$userID}'";
	$main = mysql_query($query);
	$rows = mysql_fetch_assoc($main);
	$useraddress = json_decode($rows['savedAddresses']);
	$i = sizeof($useraddress)-1;
	$id = ($useraddress[$i]->id) + 1;
	
	$item = sizeof($useraddress);
	$useraddress[$item] = array(
		"id" => $id,
		"isDefault" => true,
		"name" => "Hamdan M Ridwan",
		"flatNo" => "306",
		"flatName" => "Mandakini Hostel",
		"landmark" => "IIT Madras Campus",
		"area" => "IIT Madras",
		"city" => "Chennai",
		"contact" => 9003824036
	);
	$newadd = json_encode($useraddress);
	//echo($newadd);
	$query = "UPDATE z_users SET `savedAddresses`='{$newadd}' WHERE mobile='{$userID}'";
	$main = mysql_query($query);
}


$output = array(
	"status" => $status,
	"error" => $error
);

echo json_encode($output);
		
?>

