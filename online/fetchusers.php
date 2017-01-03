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

$query = "SELECT * FROM z_users WHERE 1";
$main = mysql_query($query);
$output = [];

while($rows = mysql_fetch_assoc($main))
{
	$output[]=array(
		"name" => $rows['name'],
	    "mobile" => $rows['mobile'],
	    "isVerified" => $rows['isVerified'],
	    "isBlocked" => $rows['isBlocked'],
	    "lastLogin" => $rows['lastLogin'],
	    "isSubmittedFeedback"=> $rows['isFeedback'],
		"memberType"=> $rows['memberType'],
		"savedAddresses"=> json_decode($rows['savedAddresses']),
		"email"=> $rows['email'],
		"password"=> $rows['password']
	);
}
//$list = array('status' => $flag);    
echo json_encode($output);
		
?>