angular.module('FullMenu', [])
   .controller('MenuController', function($scope) {
       $scope.title = "My Menu Full";
	})

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

    $http.get("http://localhost:3001/menutype").then(function(response) {
        $scope.menu = response.data;
    }); 
 
  })

    .controller('CartController', function($scope) {
       $scope.title = "My Cart";
	})


   ;