angular.module('FullMenu', [])
  
  //var urlroot="http://localhost/zaitoononline/";


    .controller('SideMenuController', function($scope, $http) {
		$http.get("http://localhost:3001/test").then(function(response) {
        $scope.title = response.data.name;
       	console.log($scope.title);
    });    	
      	
	})

    .controller('MenuTypeController', function($scope, $http) {

    $http.get("http://localhost:3001/menutype").then(function(response) {
        $scope.menulist = response.data;
    }); 
 
  })

    .controller('MenuController', function($scope, $http) {

    $http.get("http://localhost/vega-web-app/online/getmenu.php").then(function(response) {
        $scope.menu = response.data;
        console.log(response.data);

    }); 

    
 
  })

    .controller('CartController', function($scope) {
       $scope.title = "My Cart";
	})


   ;