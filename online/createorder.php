<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');

define('INCLUDE_CHECK', true);
require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$userID = $_POST['userID'];
$cart = $_POST['cart'];
$address = $_POST['address'];
$comments = $_POST['comments'];
$modeOfPayment = $_POST['modeOfPayment'];
$outlet = $_POST['outlet'];
$location = $_POST['location'];
$isTakeAway = $_POST['isTakeAway'];

$encryptionMethod = "AES-256-CBC";
$secretHash = "7a6169746f6f6e746f6b656e";
$token = $_POST['token'];
$decryptedtoken = openssl_decrypt($token, $encryptionMethod, $secretHash);
$tokenid = json_decode($decryptedtoken,true);

date_default_timezone_set('Asia/Calcutta');
$date = date("j F, Y");
$time = date("g:i a");

$status = "fail";
$error = "Not authorized user!";
$i = 0;

if($tokenid['mobile'] == $userID){
	$error = "";
	$serve = "SELECT * FROM z_locations WHERE `location`='{$location}' AND `outlet`='{$outlet}'";
	$main = mysql_query($serve);
	$rows = mysql_fetch_assoc($main);
	$rows['minOrder'];
	$items = ($cart['items']);
	//echo($items);
	while($i < sizeof($items)){
		echo($items[$i]['itemCode']."<br>");
		$code = $items[$i]['itemCode'];
		$getcode = "SELECT * FROM `z_menu` WHERE `code`='{$code}'";
		$main1 = mysql_query($getcode);
		$rows1 = mysql_fetch_assoc($main1);
		if($rows1['isAvailable'] == 0){
			$flag = 0;
		}
		else{
			$flag = 1;
		}
		$i++;
	}
	if($flag == 0){
		$status = "fail";
		$error = "One or More item is unavailable";
	}
	else{
		if($cart['cartTotal'] < $rows['minOrder']){
			$status = "fail";
			$error = "Minimum Order for the outlet is: ".$rows['minOrder'];
		}
		else{
			$status = "success";
			$error = "";
			$cartjson = json_encode($_POST['cart']);
			$addressjson = json_encode($address);
			$query = "INSERT INTO `zaitoon_orderlist`(`date`,`timePlace`, `userID`, `status`, `comments`, `cart`, `deliveryAddress`, `modeOfPayment`) VALUES ('{$date}','{$time}','{$userID}',0,'{$comments}','{$cartjson}','{$addressjson}','{$modeOfPayment}')";
			mysql_query($query);
		}
	}


	
	//$query = "INSERT INTO `zaitoon_orderlist`(`date`,`timePlace`, `userID`, `status`, `comments`, `cart`) VALUES ('{$date}','{$time}','{$userID}',0,'None','{$cart}')";
	//mysql_query($query);
}

$output = array(
		"status" => $status,
		"error" => $error
	);

echo json_encode($output);


//$list = array('status' => $flag, 'orderid' => $oid);    
//echo json_encode($list);
		
?>