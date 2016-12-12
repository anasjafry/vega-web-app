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

    .controller('CartController', function($scope) {
       $scope.title = "My Cart";
	})


   ;