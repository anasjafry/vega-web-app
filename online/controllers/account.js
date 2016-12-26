angular.module('Account', ['ngRoute'])
      

    .controller('HistoryController', ['$scope','$http', function($scope, $http) {


      $scope.init = function(){ 
        $scope.item=null;
        $scope.cart=null;
        var data = {}; 
        data.user = "9043960876";

        $http({
          method  : 'POST',
          url     : 'http://localhost/vega-web-app/online/orderhistory.php',
          data    : data, //forms user object
          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
         })
          .then(function(response) {
              $scope.item = response.data;
              $scope.cart = response.data.cart;
              console.log(response);   
          }); 

        }
        $scope.init();
    }])

    

    .controller('UserProfileController', ['$scope','$http', function($scope, $http) {

        $scope.userName = "Anas Jafry";
        $scope.userMobile = "9884179675";
        $scope.userAddress = "KK Villa Calicut";
        $scope.userEmail = "anasjafry@accelerate.net.in";
        $scope.userType = "SILVER";

        $scope.toggleFlag = 0;
        $scope.swapFlag = function(to){
          $scope.toggleFlag = to;
        }

    }]);