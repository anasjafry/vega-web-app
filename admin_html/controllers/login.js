angular.module('AdminLoginApp', [])

  .controller('adminloginController', function($scope, $http) { 

    $scope.username = "";
    $scope.password = "";   
    
    $scope.loginadmin = function(){
        var data = {};
        data.mobile = $scope.username;
        data.password = $scope.password;
        $http({
          method  : 'POST',
          url     : 'http://zaitoon.online/services/adminlogin.php',
          data    : data, //forms user object
          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
         })
         .then(function(response) {
          $scope.token = response.data.response;
          
          if(response.data.status == true){
            localStorage.setItem("admin" , $scope.token);
            window.location = "index.html";
          }
          }); 
    }
      
	})

  ;

    