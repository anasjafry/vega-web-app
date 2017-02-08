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
$address = $_POST['address']; 
$id = $_POST['id'];
$encryptionMethod = "AES-256-CBC";  
$secretHash = "7a6169746f6f6e746f6b656e";
$token = $_POST['token'];
$decryptedtoken = openssl_decrypt($token, $encryptionMethod, $secretHash);
//echo($decryptedtoken);
$tokenid = json_decode($decryptedtoken,true);

$status = 'fail';
$error = 'No such address exists!';
//$error = 
//$output = [];
$i = 0;

if($tokenid['mobile'] == $userID){
	$query = "SELECT * from z_users WHERE mobile='{$userID}'";
	$main = mysql_query($query);
	$rows = mysql_fetch_assoc($main);
	$useraddress = json_decode($rows['savedAddresses']);
	while ($i < sizeof($useraddress)) {
		if($id == $useraddress[$i]->id){
			$status = 'success';
			$error = "";
			break;
		}
		$i++;
	}

	$useraddress[$i] = array(
		"id" => $id,
		"isDefault" => $address['isDefault'],
		"name" => $address['name'],
		"flatNo" => $address['flatNo'],
		"flatName" => $address['flatName'],
		"landmark" => $address['landmark'],
		"area" => $address['area'],
		"city" => $address['city'],
		"contact" => $address['contact']
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

