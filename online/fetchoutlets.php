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

	$fotos = [];
	$fotos = array(
		"https://b.zmtcdn.com/data/reviews_photos/0fe/dc4a9be9c2d2cc74b20805bff358a0fe_1481544893.jpg",
		"https://b.zmtcdn.com/data/pictures/1/60681/2f4892ce5684d423d6782ead8c240f9d.jpg",
		"https://b.zmtcdn.com/data/pictures/1/60681/4dfdad4aed2c8e4a35cfa345fa99c9f5.jpg");

$output = [];
$outlets = [];

	$outlets[]=array(
		"name"=> "HAL Road",
		"code"=> "HALROAD",
		"line1"=> "Opp. to Grand Mall",
		"line2"=> "Velacheri - Thambaram Main Road",
		"line3"=> "Chennai",
		"mobile"=> "9043960876",
		"lat"=> 43.07493,
		"lng"=> -89.381388,
		"pictures" => $fotos
	);

	$outlets[]=array(
		"name"=> "JP Nagar",
		"code"=> "JPNAGAR",
		"line1"=> "Near Bus Depot",
		"line2"=> "Besant Nagar Road",
		"line3"=> "Thiruvanmyur",
		"mobile"=> "9884179675",
		"lat"=> 12.996752,
		"lng"=> 80.2539273,
		"pictures" => $fotos
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
		"lng"=> 80.2539273,
		"pictures" => $fotos
	);


	$outlets[]=array(
		"name"=> "Velachery",
		"code"=> "VELACHERY",
		"line1"=> "Opp. to Grand Mall",
		"line2"=> "Velacheri - Thambaram Main Road",
		"line3"=> "Chennai",
		"mobile"=> "9043960876",
		"lat"=> 43.07493,
		"lng"=> -89.381388,
		"pictures" => $fotos
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
		"name"=> $_GET['id'],
		"code"=> "VELACHERY",
		"line1"=> "Opp. to Grand Mall",
		"line2"=> "Velacheri - Thambaram Main Road",
		"line3"=> "Chennai",
		"mobile"=> "9043960876",
		"lat"=> 12.996752,
		"lng"=> 80.2539273,
		"pictures" => $fotos
	);   
	echo json_encode($outlet);
}
		
?>

