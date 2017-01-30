<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');

define('INCLUDE_CHECK', true);
require 'connect.php';

$_POST = json_decode(file_get_contents('php://input'), true);

//$token = mysql_real_escape_string($_POST['token']);

/*

[{
	"city": "CHENNAI",
	"outlets": [{
		"name": "Velachery",
		"code": "VELACHERY",
		"line1": "Opp. to Grand Mall",
		"line2": "Velacheri - Thambaram Main Road",
		"line3": "Chennai",
		"mobile": "9043960876",
		"lat": 43.07493,
		"lng": -89.381388
	}, {
		"name": "Adyar",
		"code": "ADYAR",
		"line1": "Near Bus Depot",
		"line2": "Besant Nagar Road",
		"line3": "Thiruvanmyur",
		"mobile": "9884179675",
		"lat": 12.996752,
		"lng": 80.2539273
	}]

}, {
	"city": "BANGALORE",
	"outlets": [{
		"name": "HAL Road",
		"code": "VELACHERY",
		"line1": "Opp. to Grand Mall",
		"line2": "Velacheri - Thambaram Main Road",
		"line3": "Chennai",
		"mobile": "9043960876",
		"lat": 43.07493,
		"lng": -89.381388
	}, {
		"name": "JP Nagar",
		"code": "ADYAR",
		"line1": "Near Bus Depot",
		"line2": "Besant Nagar Road",
		"line3": "Thiruvanmyur",
		"mobile": "9884179675",
		"lat": 12.996752,
		"lng": 80.2539273
	}]

}]

*/

$output = [];
$outlets = [];

	$outlets[]=array(
		"name"=> "HAL Road",
		"code"=> "VELACHERY",
		"line1"=> "Opp. to Grand Mall",
		"line2"=> "Velacheri - Thambaram Main Road",
		"line3"=> "Chennai",
		"mobile"=> "9043960876",
		"lat"=> 43.07493,
		"lng"=> -89.381388
	);


	$outlets[]=array(
		"name"=> "JP Nagar",
		"code"=> "1",
		"line1"=> "Near Bus Depot",
		"line2"=> "Besant Nagar Road",
		"line3"=> "Thiruvanmyur",
		"mobile"=> "9884179675",
		"lat"=> 12.996752,
		"lng"=> 80.2539273
	);

	$output[]=array(
		"city" => "Bangalore",
		"outlets"=> $outlets	
	);	
   
$outlets = [];

	$outlets[]=array(
		"name"=> "Adyar",
		"code"=> "ADYAR",
		"line1"=> "Near Bus Depot",
		"line2"=> "Besant Nagar Road",
		"line3"=> "Thiruvanmyur",
		"mobile"=> "9884179675",
		"lat"=> 12.996752,
		"lng"=> 80.2539273
	);


	$outlets[]=array(
		"name"=> "Velachery",
		"code"=> "VELACHERY",
		"line1"=> "Opp. to Grand Mall",
		"line2"=> "Velacheri - Thambaram Main Road",
		"line3"=> "Chennai",
		"mobile"=> "9043960876",
		"lat"=> 43.07493,
		"lng"=> -89.381388
	);   

		$output[]=array(
		"city" => "Chennai",
		"outlets"=> $outlets	
	);	
   
if(!isset($_GET['id'])){
	echo json_encode($output);
}
else{
	$outlet = "";
	$outlet =array(
		"name"=> "Velachery",
		"code"=> "VELACHERY",
		"line1"=> "Opp. to Grand Mall",
		"line2"=> "Velacheri - Thambaram Main Road",
		"line3"=> "Chennai",
		"mobile"=> "9043960876",
		"lat"=> 12.996752,
		"lng"=> 80.2539273
	);   
	echo json_encode($outlet);
}
		
?>

