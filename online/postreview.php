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
$review = json_encode($_POST['review']); 
$orderID = $_POST['orderID'];
$encryptionMethod = "AES-256-CBC";  
$secretHash = "7a6169746f6f6e746f6b656e";
$token = $_POST['token'];
$decryptedtoken = openssl_decrypt($token, $encryptionMethod, $secretHash);
//echo($decryptedtoken);
$tokenid = json_decode($decryptedtoken,true);

$status = 'fail';
$error = 'No such order/user exists!';
//$error = 
//$output = [];
$i = 0;

if($tokenid['mobile'] == $userID){
	$error = 'No such order exists for the user!';
	$query = "SELECT * from zaitoon_orderlist WHERE orderID='{$orderID}'";
	$main = mysql_query($query);
	$rows = mysql_fetch_assoc($main);
	if(!empty($rows)){
		$status = 'success';
		$error = '';
		$query1 = "UPDATE zaitoon_orderlist SET `feedback`='{$review}' WHERE userID='{$userID}' AND orderID='{$orderID}'";
		mysql_query($query1);
		echo($query1);
	}
}


$output = array(
	"status" => $status,
	"error" => $error
);

echo json_encode($output);
		
?>

