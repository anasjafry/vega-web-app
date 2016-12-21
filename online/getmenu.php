<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');

define('INCLUDE_CHECK', true);
//require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

//$token = mysql_real_escape_string($_POST['token']);


//validate token

$link = mysqli_connect("localhost", "root", "", "zaitoon");

$query3 = "SELECT * FROM zaitoon_maintypes WHERE 1";
$obj3 = $link->query($query3);
$output = [];

while($rows3 = $obj3->fetch_assoc())
{

	$query = "SELECT * FROM zaitoon_menutypes WHERE mainType='{$rows3['type']}'";
	$obj = $link->query($query);
	

	
	$submenu=[];
	$items=[];

	//Iterate through complete menu types
	while($rows = $obj->fetch_assoc()){
	    
	        $query2 = "SELECT * from zaitoon_menu WHERE type='{$rows['subType']}'";
	        $obj2 = $link->query($query2);
	        $items = [];

	        while($rows2 = $obj2->fetch_assoc()){
	          $items[] = array(
	          	"itemCode" => $rows2['code'],
	            "itemName" => $rows2['name'],
	            "itemPrice" => $rows2['price']
	          );
	        }

	        //Create Sub-menu
	        $submenu[] = array(
	        	"subType" => $rows['subType'],
	            "subName" => $rows['subName'],
	            "items" => $items
	        	);

	    }
	    $output[] =array(
	        	"mainType" => $rows3['type'],
	          	"mainName"=> $rows3['name'],
	          	"submenu" => $submenu
	        	);

}
//$list = array('status' => $flag);    
echo json_encode($output);
		
?>