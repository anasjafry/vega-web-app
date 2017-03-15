<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');
error_reporting(0);

define('INCLUDE_CHECK', true);
require 'connect.php';

$encryptionMethod = "AES-256-CBC";
$secretHash = "7a6169746f6f6e746f6b656e"; //hexa for "zaitoontoken"

$_POST = json_decode(file_get_contents('php://input'), true);

$mobile = $_POST['mobile'];
$password = $_POST['password'];

date_default_timezone_set('Asia/Calcutta');
$date = date("Y-m-j");

//$token = mysql_real_escape_string($_POST['token']);


$query = "SELECT * from z_roles WHERE `code`='{$mobile}' AND `password`='{$password}'";
$main = mysql_query($query);
$rows = mysql_fetch_assoc($main);
$status = '';
$error = '';


if(!empty($rows)){
	$responsejson = array(
		"branch" => $rows['branch'],
		"date" => $date
	);
	$textToEncrypt = json_encode($responsejson);
	$response = openssl_encrypt($textToEncrypt, $encryptionMethod, $secretHash);
	$status = true;
}
else{
	$response = "";
	$status = false;
	$error = 'No user exists';
}

$output = array(
	"response" => $response,
	"status" => $status,
	"error" => $error
);

//$list = array('status' => $flag);
echo json_encode($output);

?>
