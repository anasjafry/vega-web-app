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

//$stub = '{"isDefault": false, "name": "Abhijith C S", "flatNo": "306", "flatName": "Alakananda Hostel", "landmark": "IIT Madras Campus", "area": "IIT Madras", "city": "Chennai", "contact": 9003824036 }';
$details = $_POST['details'];

$encryptionMethod = "AES-256-CBC";
$secretHash = "7a6169746f6f6e746f6b656e";
$token = $_POST['token'];
$decryptedtoken = openssl_decrypt($token, $encryptionMethod, $secretHash);
//echo($decryptedtoken);
$tokenid = json_decode($decryptedtoken,true);
//$error =
//$output = [];

date_default_timezone_set('Asia/Calcutta');
$date = date("j F, Y");
$time = date("g:i a");

$status = 'fail';
$error = 'Access Denied. Not Authorized!';

//echo($tokenid['mobile']);
if($tokenid['mobile'] == $userID){
	$status = 'success';
	$error = "";
	$query = "INSERT INTO z_reservations (`userID`, `outlet`, `date` , `time` , `count`) VALUES ('{$userID}','{$details['outlet']}','{$date}','{$time}','{$details['count']}')";
	$main = mysql_query($query);
}


$output = array(
	"status" => $status,
	"error" => $error
);

echo json_encode($output);

?>
