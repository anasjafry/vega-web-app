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



$query = "SELECT * FROM z_menu WHERE 1";
$main = mysql_query($query);
$output = [];
$rows = mysql_fetch_assoc($main);
$maint = $rows['mainType'];
$sub = $rows['subType'];

while($rows = mysql_fetch_assoc($main))
{
	$query2 = "SELECT * FROM z_types WHERE short='{$rows['mainType']}'";
	$main2 = mysql_query($query2);
	$rows2 = mysql_fetch_assoc($main2);
	
	$subCategories=[];
	$items=[];

	if($maint==$rows['mainType'])
	{
		//Create Sub-menu
	    $items[] = array(
		"itemCode" => $rows['code'],
		"itemName" => $rows['name'],
		"itemPrice" => $rows['price'],
		"isVeg" => $rows['isVeg'],
		"tags" => $rows['tags'],
		"isAvailable" => $rows['isAvailable']
		); 

		if($sub==$rows['subType'])
		{
			$query3 = "SELECT * FROM z_types WHERE short='{$rows['subType']}'";
			$main3 = mysql_query($query3);
			$rows3 = mysql_fetch_assoc($main3);

			//Create Sub-menu
		    $subCategories[] = array(
		    "subType" => $rows['subType'],
		    "subName" => $rows3['name'],
		    "items" => $items
			);
		    //$items=[]; 
		} 
	}
	else{
	  	$output[] =array(
		"mainType" => $rows['mainType'],
		"mainName"=> $rows2['name'],
		"subCategories" => $subCategories
		);
	  	$maint = rows['mainType'];
	  	//$subCategories=[];
	} 

}
//$list = array('status' => $flag);    
echo json_encode($output);
		
?>