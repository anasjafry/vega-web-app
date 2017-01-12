<?php

/*** YET TO ADD "NO RESULTS" SCENARIO ***/

header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');

define('INCLUDE_CHECK', true);
require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);


/* FRAMING QUERY */
//Howmany results to output
$limiter = "";
if(isset($_GET['id'])){
	$limiter = " LIMIT  {$_GET['id']},5";	
}

//Shortlist based on current status
$orderstatus = "";
if(isset($_GET['status'])){
	$orderstatus = " AND status = '{$_GET['status']}'";
}






$list = array();

//User Specific Orders
if(isset($_GET['mobile'])){

	$query = "SELECT * FROM zaitoon_orderlist WHERE userID = '{$_GET['mobile']}'".$orderstatus." ORDER BY orderID".$limiter;
	$all = mysql_query($query);

	while($order = mysql_fetch_assoc($all))
	{
		$cart = json_decode($order['cart']);
		$list[] = array(
			'orderID' => $order['orderID'], 
			'status' => $order['status'], 
			'cart' => $cart,
			'date' => $order['date'], 
			'timePlace' => $order['timePlace'], 
			'timeConfirm' => $order['timeConfirm'], 
			'timeDeliver' => $order['timeDeliver']
			);
	}
}
else{  //All the orders

	$query = "SELECT * FROM zaitoon_orderlist WHERE 1 ".$orderstatus." ORDER BY orderID".$limiter;
	$all = mysql_query($query);

	while($order = mysql_fetch_assoc($all))
	{
		$cart = json_decode($order['cart']); 
		$address = json_decode($order['deliveryAddress']);
		$info = mysql_fetch_array(mysql_query("SELECT name FROM z_users WHERE mobile='{$order['userID']}'"));
		$list[] = array(
			'orderID' => $order['orderID'], 
			'userID' => $order['userID'],
			'name' => $info['name'],
			'address' => $address,
			'status' => $order['status'], 
			'cart' => $cart,
			'date' => $order['date'], 
			'timePlace' => $order['timePlace'], 
			'timeConfirm' => $order['timeConfirm'], 
			'timeDeliver' => $order['timeDeliver']
			);
	}
}


echo json_encode($list);
		
?>