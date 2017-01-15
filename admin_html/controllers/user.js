angular.module('UsersApp', [])

  .controller('userOrdersController', function($scope, $http) {
  	console.log("This works!!");
  	$http.get("http://localhost/vega-web-app/online/orderhistory.php?id=0&mobile=9043960876").then(function(response) {
        $scope.user_orders = response.data;       
    }); 
    $scope.prevflag=false;
    $scope.limiter=0;
    $scope.nextflag=true;
    $scope.showNext = function(){
    	$scope.prevflag=true;
    	$scope.limiter+=5;
    	$http.get("http://localhost/vega-web-app/online/orderhistory.php?mobile=9043960876&id="+$scope.limiter).then(function(response) {
        	$scope.user_orders = response.data;
        	if($scope.user_orders.length < 5){
        		$scope.nextflag=false;
        	}       
    	}); 
    }
    $scope.showPrev = function(){
    	$scope.nextflag=true;
    	$scope.limiter-=5;
    	$http.get("http://localhost/vega-web-app/online/orderhistory.php?mobile=9043960876&id="+$scope.limiter).then(function(response) {
        	$scope.user_orders = response.data;       
    	});
    	if($scope.limiter==0){
    		$scope.prevflag=false;
    	} 
    }
  })