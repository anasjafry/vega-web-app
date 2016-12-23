<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');

define('INCLUDE_CHECK', true);
require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$user = mysql_real_escape_string($_POST['user']);
$cart = $_POST['cart'];

date_default_timezone_set('Asia/Calcutta');
$date = date("j F, Y");
$time = date("g:i a");



$query = "INSERT INTO `zaitoon_orderlist`(`date`,`timePlace`, `userID`, `status`, `comments`, `cart`) VALUES ('{$date}','{$time}','{$user}',0,'None','{$cart}')";
mysql_query($query);
$getID = "SELECT orderID FROM zaitoon_orderlist ORDER BY orderID DESC LIMIT 1";
$id = mysql_fetch_assoc(mysql_query($getID));
$oid = $id['orderID'];

$flag = true;


$list = array('status' => $flag, 'orderid' => $oid);    
echo json_encode($list);
		
?>