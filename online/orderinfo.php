<?php

/*** YET TO ADD "NO RESULTS" SCENARIO ***/

header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');

define('INCLUDE_CHECK', true);
require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$oid = "10013052";//mysql_real_escape_string($_POST['orderid']);

$query = "SELECT `date`, `timePlace`, `timeConfirm`, `timeDeliver`, `orderID`,`status`, `cart`,`comments` FROM `zaitoon_orderlist` WHERE `orderID`='{$oid}'";
$all = mysql_query($query);

$list = array();

while($order = mysql_fetch_assoc($all))
{
	$cart = json_decode($order['cart']);
	$list[] = array(
		'orderID' => $order['orderID'], 
		'status' => $order['status'], 
		'comment' => $order['comments'], 
		'cart' => $cart,
		'date' => $order['date'], 
		'timePlace' => $order['timePlace'], 
		'timeConfirm' => $order['timeConfirm'], 
		'timeDeliver' => $order['timeDeliver']
		);
}

echo json_encode($list);
		
?>