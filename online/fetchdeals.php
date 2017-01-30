<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');

define('INCLUDE_CHECK', true);
require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

//$token = mysql_real_escape_string($_POST['token']);

//fetching deals and coupon codes
$output = [];

	$output[]=array(
		"type" => "coupon",
		"code" => "FIRST10",
		"description" => "Get flat 10% off on minimum order of Rs. 400",
		"isImageAvailable" => false,
		"isAppOnly" => true,
		"validTill" => "30-01-2017"
	);


	$output[]=array(
		"type" => "offer",
		"code" => "",
		"description" => "Make a table reservation through Zaitoon First App and get FLAT 5% off on bill",
		"isImageAvailable" => false,
		"isAppOnly" => true,
		"validTill" => "30-01-2017"
	);

	$output[]=array(
		"type" => "promotion",
		"code" => "",
		"description" => "Introducing the new cuisine, Arabian Exotica! Avaialable only at Zaitoon.",
		"isImageAvailable" => true,
		"url" => "http://localhost/vega-web-app/landing/images/pic04.jpg",
		"isAppOnly" => false,
		"validTill" => "30-01-2017"
	);	
//$list = array('status' => $flag);    
echo json_encode($output);
		
?>

