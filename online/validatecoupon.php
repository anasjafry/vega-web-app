<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');

define('INCLUDE_CHECK', true);
require 'connect.php';
error_reporting(0);
//$_POST = json_decode(file_get_contents('php://input'), true);

//Take coupon code from the POST request.
$code = "ZAITOONFIRST";
$user = "9043960876";

//Get the corresponding rule from the DB
//$coupon = json_decode('{ "rule": "FIRSTORDER", "discount": "75", "minimum": "400", "isAppOnly": true }',true);
// $coupon = json_decode('{ "rule": "PERCENTAGE", "minimumCart": 400, "maximum": 50, "percentage":8.9, "isAppOnly": true }',true);
$coupon = json_decode('{ "rule": "DISCOUNTEDCOMBO", "items": [{"code":1000098,"count":2},{"code":1000099,"count":1}], "discount":100, "isAppOnly": true }',true);
$rule = $coupon['rule'];

//Get Cart Info.
$cart = json_decode('{ "cartTotal": 568, "cartCoupon": "GET10", "items": [{ "itemCode": "1000098", "itemName": "Veg Burger", "itemQuantity": 7, "itemPrice": "45", "itemVariety": "Burgers" }, { "itemCode": "1000099", "itemName": "Veg Cheese Burger", "itemQuantity": 3, "itemPrice": "50", "itemVariety": "Burgers" }, { "itemCode": "10000125", "itemName": "Kesari", "itemQuantity": 1, "itemPrice": "15", "itemVariety": "Breakfast" }, { "itemCode": "10000124", "itemName": "Vada (2 Nos)", "itemQuantity": 1, "itemPrice": "20", "itemVariety": "Breakfast" }, { "itemCode": "10000123", "itemName": "Pongal", "itemQuantity": 1, "itemPrice": "20", "itemVariety": "Breakfast" }, { "itemCode": "10000122", "itemName": "Idly (3 Nos)", "itemQuantity": 1, "itemPrice": "20", "itemVariety": "Breakfast" }, { "itemCode": "10000121", "itemName": "Onion Oothappam", "itemQuantity": 1, "itemPrice": "30", "itemVariety": "Breakfast" }] }', true);
$cartItems = $cart['items'];


//Rules
switch ($rule){
	case "FIRSTORDER":{
		$discount = 0;
		//Ensure the user makes his first order
		$result = mysql_query("SELECT * FROM zaitoon_orderlist WHERE userID='{$user}'");
		if(!$order = mysql_fetch_assoc($result)){
			//Now check if the cart minimum rule applies
			$i = 0;
			$total = 0;
			while($cart['items'][$i]['itemCode']){
				$total = $total + ($cart['items'][$i]['itemPrice']*$cart['items'][$i]['itemQuantity']);
				$i++;
			}
				//setting status true if cart value is greater than min. of coupon
				if($total >= $coupon['minimum']){
					$status = true;
					$discount = $coupon['discount'];
				}
				else{
					$status = false;
					$error = "Minimum order value is ".$coupon['minimum'];
				}


		}
		else{
			$status = false;
			$error = "Coupon applicable only for first order";
		}

		$output = array(
			"status" => $status,
			"discount" => $discount,
			"error" => $error
		);

		echo json_encode($output);
		break;
	}


	case "PERCENTAGE":{
		$discount = 0;

		$i = 0;
		$total = 0;
		while($cart['items'][$i]['itemCode']){
			$total = $total + ($cart['items'][$i]['itemPrice']*$cart['items'][$i]['itemQuantity']);
			$i++;
		}

		if($total >= $coupon['minimumCart']){
			$status = true;
			$discount = round(($coupon['percentage']/100)*$total);
			if($discount >= $coupon['maximum'])
				$discount = $coupon['maximum'];
		}
		else{
			$status = false;
			$error = "Minimum order value is ".$coupon['minimumCart'];
		}

		$output = array(
			"status" => $status,
			"discount" => $discount,
			"error" => $error
		);

		echo json_encode($output);
		break;

	}


	case "DISCOUNTEDCOMBO":{
		$total_discount = 0;
		$combocart = $cart;
		$mycoupon = $coupon;

		function getDiscount($coupon){
			global $combocart;
			$isValid = false;

			$i = 0;
			$terminate = false;
			while($combocart['items'][$i]['itemCode'] && !$terminate){
				// echo '<br><br><br>Case-'.$i.'<br>________________________';
				// echo '<br>Taking item '.$combocart['items'][$i]['itemCode'].' from CART';
				//Search if the item is present in coupon's required items
				$j = 0;
				while($coupon['items'][$j]['code']){
					// echo '<br>[COUPON]'.$coupon['items'][$j]['code'];
					if($combocart['items'][$i]['itemCode'] == $coupon['items'][$j]['code'])
					{
						// echo '<br>[COUPON] found matching!';
						if($combocart['items'][$i]['itemQuantity'] >= $coupon['items'][$j]['count'])
						{
							// echo '<br>[COUPON] Proceed';
							$combocart['items'][$i]['itemQuantity'] = $combocart['items'][$i]['itemQuantity'] - $coupon['items'][$j]['count'];
							$isValid = true;
						}
						else {
							// echo '<br>[COUPON] TERMINATE!!!!!!!';
							$terminate = true;
							$isValid = false;
							break;
						}
						break;
					}
					$j++;
				}
				$i++;
			}

			if($isValid){
				// echo '<br><br>*********************************************SUCCESS!*********************************************';
				return $coupon['discount'];
			}
			else {
				return 0;
			}
		}

		//Calculate the grand total of discounts
		while($disc = getDiscount($mycoupon))
		{
			$total_discount = $total_discount + $disc;
		}


		//Results
		if($total_discount > 0){
			$output = array(
				"status" => true,
				"discount" => $total_discount,
			);
		}
		else{
			$output = array(
				"status" => false,
				"error" => "Your cart does not contain required items."
			);
		}
		echo json_encode($output);
		break;
	}


}


?>
