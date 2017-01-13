angular.module('MenuApp', [])

  .controller('menuController', function($scope, $http) {    
      $http.get("http://localhost/vega-web-app/online/fetchmenu.php").then(function(response) {
          $scope.menu = response.data;  
      }); 


      $scope.cuisine = "";
      $scope.showCuisineItems = function(cuisineCode){
        var i = 0;
        while(i < $scope.menu.length){
          if($scope.menu[i].mainType == cuisineCode)
          {            
            $scope.cuisine = $scope.menu[i];
            break;
          }
          i++;
        }

        //$scope.initializeMenu();
      }

      $scope.initializeMenu = function(){
        $http.get("http://localhost/vega-web-app/online/fetchmenu.php").then(function(response) {
            $scope.menu = response.data;            
        }); 
      }


      $scope.markAllAvail = function(cuisine){
        $http.get("http://localhost/vega-web-app/online/cuisinestatus.php?cuisine="+cuisine).then(function(response) {
          });
        $scope.cuisine = "";
        $scope.initializeMenu();
        $scope.showCuisineItems(cuisine);
      }

      $scope.resetAvail = function(id, status){
        if(!status){
          $http.get("http://localhost/vega-web-app/online/itemstatus.php?status=1&code="+id).then(function(response) {
          });
          document.getElementById(id).innerHTML="<span class=\"label label-success\">Available</span>";
        }
        else
        {
          $http.get("http://localhost/vega-web-app/online/itemstatus.php?status=0&code="+id).then(function(response) {
          });  
          document.getElementById(id).innerHTML="<span class=\"label label-danger\">Out of Stock</span>";
        }
      }

	})

  .controller('profileController', function($scope) {
       
  })
  ;

    