<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');

define('INCLUDE_CHECK', true);
require 'connect.php';

error_reporting(0);

$city = $_GET['city'];
$keyword = $_GET['key'];

$cities = array();

	$res1 = mysql_query("SELECT DISTINCT location, locationCode from z_locations WHERE city='{$city}' AND location LIKE '{$keyword}%' ORDER BY location");
	while($rows1 = mysql_fetch_assoc($res1))
	{
		 array_push($cities, array("name"  => $rows1['locationCode'],"value"  => $rows1['location']));
	}

	$res2 = mysql_query("SELECT DISTINCT location, locationCode from z_locations WHERE city='{$city}' AND  location NOT LIKE '{$keyword}%' AND location LIKE '%{$keyword}%' ORDER BY location");
	while($rows2 = mysql_fetch_assoc($res2))
	{
		 array_push($cities, array("name"  => $rows2['locationCode'],"value"  => $rows2['location']));
	}

echo json_encode($cities);
?>
