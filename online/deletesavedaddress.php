<?php

/*** YET TO ADD "NO RESULTS" SCENARIO ***/

header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');

define('INCLUDE_CHECK', true);
require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$id = $_GET['id'];//VALIDATION pending
$user = $_GET['user'];

$info = mysql_fetch_array(mysql_query("SELECT savedAddresses FROM z_users WHERE mobile='{$user}'"));
$savedAddresses = json_decode($info['savedAddresses']);

/*
Iterate through the JSON and
delete the entry matching the ID
*/
$new = [];
$i = 0;
foreach($savedAddresses as $address){
   	if(!($id == $address->id)){
      	$new[]= $savedAddresses[$i];
   	}	
	$i++;
}

$modified = json_encode($new);
mysql_query("UPDATE z_users SET savedAddresses = '{$modified}' WHERE mobile='{$user}'")

		
?>