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

//Encryption Validation
if(!isset($_POST['token'])){
	$output = array(
		"status" => false,
		"error" => "Access Token is missing"
	);
	die(json_encode($output));
}

if(!isset($_POST['cart'])){
	$output = array(
		"status" => false,
		"error" => "Cart Object is missing"
	);
	die(json_encode($output));
}


if(!$_POST['isTakeAway'] && $_POST['address'] == []){
	$output = array(
		"status" => false,
		"error" => "Delivery Address is missing"
	);
	die(json_encode($output));
}


$token = $_POST['token'];
$decryptedtoken = openssl_decrypt($token, $encryptionMethod, $secretHash);
$tokenid = json_decode($decryptedtoken, true);

//Expiry Validation
date_default_timezone_set('Asia/Calcutta');
$dateStamp = date_create($tokenid['date']);
$today = date_create(date("Y-m-j"));
$interval = date_diff($dateStamp, $today);
$interval = $interval->format('%a');

if($interval > $tokenExpiryDays){
	$output = array(
		"status" => false,
		"error" => "Expired Token"
	);
	die(json_encode($output));
}



//Check if the token is tampered
if($tokenid['mobile']){
	$userID = $tokenid['mobile'];
}
else{
	$output = array(
		"status" => false,
		"error" => "Token is tampered"
	);
	die(json_encode($output));
}

//Parameters
$cart = $_POST['cart'];
$address = $_POST['address'];
$comments = $_POST['comments'];
$modeOfPayment = $_POST['modeOfPayment'];
$outlet = $_POST['outlet'];
$location = $_POST['location'];
$isTakeAway = $_POST['isTakeAway'];

//TO lock the order, prevent payment hacks
if($modeOfPayment == 'COD'){
	$isVerified = 1;
}
else {
	$isVerified = 0;
}


date_default_timezone_set('Asia/Calcutta');
$date = date("j F, Y");
$time = date("g:i a");

$status = false;
$error = "Failed to create an order";
$orderid = "";


$carttamper = 0;
$total = 0;


	$serve = "SELECT * FROM z_locations WHERE `location`='{$location}' AND `outlet`='{$outlet}'";
	$main = mysql_query($serve);
	$rows = mysql_fetch_assoc($main);

	$items = $cart['items'];

	$i = 0;
	while($i < sizeof($items)){

		$code = $items[$i]['itemCode'];

		//Combo Validations - Check if the combo is availble to particular outlet
		if($items[$i]['isCombo']){ //ITEM IS A COMBO
			$rowscombo = mysql_fetch_assoc(mysql_query("SELECT * FROM `z_combos` WHERE `code`='{$code}'"));
			if($rowscombo['outlet'] != $outlet)
			{
				$output = array(
						"status" => false,
						"error" => $rowscombo['name']." is not available",
						"orderid" => ""
				);
				die(json_encode($output));
			}
		}



			if(!$items[$i]['isCombo']){
				$rows1 = mysql_fetch_assoc(mysql_query("SELECT * FROM `z_menu` WHERE `code`='{$code}'"));
			}
			else{
				$rows1 = mysql_fetch_assoc(mysql_query("SELECT * FROM `z_combos` WHERE `code`='{$code}'"));
			}

			if($rows1['isAvailable'] == 0)
			{
				$output = array(
						"status" => false,
						"error" => $rows1['itemName']." is not available",
						"orderid" => ""
				);
				die(json_encode($output));
				$flag = 0;
			}
			else
			{
				$flag = 1;
				if($rows1['price'] != $items[$i]['itemPrice']){
					$carttamper = 1;
				}
				$total += $rows1['price']*$items[$i]['qty'];
			}

			$i++;

	}

	if($flag == 0)
	{
		$status = false;
		$error = "One or more items are unavailable";
	}
	else
	{
		if($isTakeAway == false)
		{
				if($cart['cartTotal'] < $rows['minOrder']){
					$status = false;
					$error = "Minimum Order for the outlet is Rs. ".$rows['minOrder'];
				}
				else
				{
					if($carttamper == 1 || $total != $cart['cartTotal']){
						$status = false;
						$error = "Cart has been tampered";
					}
					else{
						$status = true;
						$error = "";
						$cartjson = json_encode($_POST['cart']);
						$addressjson = json_encode($address);
						$query = "INSERT INTO `zaitoon_orderlist`(`isVerified`,`outlet`, `isTakeAway`,`date`,`timePlace`, `userID`, `status`, `comments`, `cart`, `deliveryAddress`, `modeOfPayment`) VALUES ('{$isVerified}','{$outlet}','{$isTakeAway}','{$date}','{$time}','{$userID}',0,'{$comments}','{$cartjson}','{$addressjson}','{$modeOfPayment}')";
						mysql_query($query);
						//Get the order ID
						$orderInfo = mysql_fetch_assoc(mysql_query("SELECT orderID FROM `zaitoon_orderlist` WHERE `userID`='{$userID}' ORDER BY orderID DESC"));
						$orderid = $orderInfo['orderID'];
					}
				}
		}
			else
			{
				if($carttamper == 1 || $total!=$cart['cartTotal'])
				{
					$status = false;
					$error = "Cart has been tampered";
				}
				else
				{
					$status = true;
					$error = "";
					$cartjson = json_encode($_POST['cart']);
					$addressjson = json_encode($address);
					$query = "INSERT INTO `zaitoon_orderlist`(`isVerified`,`outlet`, `isTakeAway`, `date`,`timePlace`, `userID`, `status`, `comments`, `cart`, `deliveryAddress`, `modeOfPayment`) VALUES ('{$isVerified}','{$outlet}','{$isTakeAway}','{$date}','{$time}','{$userID}',0,'{$comments}','{$cartjson}','','{$modeOfPayment}')";
					mysql_query($query);
					//Get the order ID
					$orderInfo = mysql_fetch_assoc(mysql_query("SELECT orderID FROM `zaitoon_orderlist` WHERE `userID`='{$userID}' ORDER BY orderID DESC"));
					$orderid = $orderInfo['orderID'];
				}
			}
		}


$output = array(
		"status" => $status,
		"error" => $error,
		"orderid" => $orderid
);

echo json_encode($output);
?>
