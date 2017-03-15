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
$name = $_POST['name'];
$branch = $_POST['branch'];

$status = 'success';
$lastLogin = $time.", ".$date;
$query = "INSERT INTO z_roles (`code`, `name`, `role` , `branch`) VALUES ('{$code}','{$name}','AGENT','{$branch}')";
$main = mysql_query($query);

$output = array(
	"response" => $response,
	"status" => $status,
	"error" => $error
);

//$list = array('status' => $flag);    
echo json_encode($output);
		
?>

