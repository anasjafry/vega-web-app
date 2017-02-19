<?php

/*** YET TO ADD "NO RESULTS" SCENARIO ***/

header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');

define('INCLUDE_CHECK', true);
require 'connect.php';

$encryptionMethod = "AES-256-CBC";
$secretHash = "7a6169746f6f6e746f6b656e";

$_POST = json_decode(file_get_contents('php://input'), true);

$status = $_POST['status'];
$outlet = $_POST['outlet']; 

$token = $_POST['token'];
$decryptedtoken = openssl_decrypt($token, $encryptionMethod, $secretHash);
$tokenid = json_decode($decryptedtoken,true);

$list = "";

$status = 'fail';
$error = 'Not authorized!';

if($outlet == $tokenid['outlet']) 
{
	$status = 'fail';
	$error = 'No orders!';
	$query = "SELECT * FROM `zaitoon_orderlist` WHERE `status`='{$status}' AND `outlet`='{$outlet}'";
	$all = mysql_query($query);
	while($order = mysql_fetch_assoc($all)){
		$status = 'success';
		$error = '';
		$cart = json_decode($order['cart']);
		$list[] = array(
			'orderID' => $order['orderID'], 
			'userID' => $order['userID'],
			'status' => $order['status'],  
			'cart' => $cart,
			'deliveryAddress' => $order['deliveryAddress'],
			'date' => $order['date'], 
			'timePlace' => $order['timePlace'], 
			'timeConfirm' => $order['timeConfirm'], 
			'timeDeliver' => $order['timeDeliver']
		);
	}
}

$output = array(
	"status" => $status,
	"error" => $error,
	"response" => $list
);

echo json_encode($output);
		
?>