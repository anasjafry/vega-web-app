<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');

define('INCLUDE_CHECK', true);
require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

//$token = mysql_real_escape_string($_POST['token']);


//validate token

$type = "ARABIAN";




$query = "SELECT DISTINCT mainType FROM z_menu WHERE mainType='{$type}'";
$main = mysql_query($query);

$output = [];

while($rows = mysql_fetch_assoc($main))
{
	$mainType = $rows['mainType'];
	$submenuQuery = "SELECT DISTINCT subType FROM z_menu WHERE mainType='{$mainType}'";
	$sub = mysql_query($submenuQuery);

	$subCategories=[];
	
	while($subrows = mysql_fetch_assoc($sub)){
		$subType = $subrows['subType'];

		$itemQuery = "SELECT * FROM z_menu WHERE mainType='{$mainType}' AND subType='{$subType}'";
		$allitems = mysql_query($itemQuery);

		//Put all the items into an array.
		$items=[];
		while($item = mysql_fetch_assoc($allitems)){		
			$items[] = array(
				"itemCode" => $item['code'],
				"itemName" => $item['name'],
				"itemPrice" => $item['price'],
				"isVeg" => $item['isVeg'],
				"tags" => json_decode($item['tags']),
				"isAvailable" => $item['isAvailable']
			); 
		}

		//Create the subCategory with it's name and items array just created.		
		$subCategories[] = array(
		    "subType" => $subrows['subType'],
		    "subName" => "FETCH FROM DB",
		    "items" => $items
		);
	}

	$output[] =array(
		"mainType" => $rows['mainType'],
		"mainName"=> "FETCH FROM DB",
		"subCategories" => $subCategories
	);
}
   
echo json_encode($output);
		
?>