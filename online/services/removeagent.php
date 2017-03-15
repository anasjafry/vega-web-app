<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');
error_reporting(0);
define('INCLUDE_CHECK', true);
require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$encryptionMethod = "AES-256-CBC";  
$secretHash = "7a6169746f6f6e746f6b656e"; //hexa for "zaitoontoken"

$code = $_POST['code'];

$status = 'true';
$query = "DELETE FROM `z_roles` WHERE `code`='{$code}'";
$main = mysql_query($query);

$output = array(
	"status" => $status
);

//$list = array('status' => $flag);    
echo json_encode($output);
		
?>

