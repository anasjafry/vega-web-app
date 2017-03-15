angular.module('MenuApp', [])

  .controller('menuController', function($scope, $http) {    
      $http.get("http://zaitoon.online/services/fetchmenuweb.php").then(function(response) {
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
        $http.get("http://zaitoon.online/services/fetchmenuweb.php").then(function(response) {
            $scope.menu = response.data;            
        }); 
      }


      $scope.markAllAvail = function(cuisine){
        var data = {};
        //data.token = "5pOUIJKuXNJ7hCs04udBRlBu5kpEXL5VjOGO67sUkuULClei8y1eyliYfsi1jF2K";
        data.cuisine = cuisine;
        $http({
          method  : 'POST',
          url     : 'http://zaitoon.online/services/cuisinestatus.php',
          data    : data, //forms user object
          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
         })
         .then(function(response) {
         });
        $scope.cuisine = "";
        $scope.initializeMenu();
        $scope.showCuisineItems(cuisine);
        window.location.reload();
      }

      $scope.resetAvail = function(id, status){
        if(!status){
          var data = {};
          //data.token = "5pOUIJKuXNJ7hCs04udBRlBu5kpEXL5VjOGO67sUkuULClei8y1eyliYfsi1jF2K";
          data.code = id;
          //console.log (id);
          data.status = 1;
          $http({
            method  : 'POST',
            url     : 'http://zaitoon.online/services/itemstatus.php',
            data    : data, //forms user object
            headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
           })
           .then(function(response) {
           });
          document.getElementById(id).innerHTML="<span class=\"label label-success\">Available</span>";
        }
        else
        {
          var data = {};
          //data.token = "5pOUIJKuXNJ7hCs04udBRlBu5kpEXL5VjOGO67sUkuULClei8y1eyliYfsi1jF2K";
          data.code = id;
          data.status = 0;
          $http({
            method  : 'POST',
            url     : 'http://zaitoon.online/services/itemstatus.php',
            data    : data, //forms user object
            headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
           })
           .then(function(response) {
           });  
          document.getElementById(id).innerHTML="<span class=\"label label-danger\">Out of Stock</span>";
        }
      }

	})

  .controller('profileController', function($scope) {
       
  })
  ;

    