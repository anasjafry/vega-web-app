angular.module('OrderInfo',['ngRoute'])


.controller('DetailsController', ['$scope','$http', function($scope, $http) {

      $scope.init = function(){ 
        $scope.item=null;
        $scope.cart=null;
        var data = {}; 
        data.orderID = "10013053";

        $http({
          method  : 'POST',
          url     : 'http://localhost/vega-web-app/online/orderinfo.php',
          data    : data, //forms user object
          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
         })
          .then(function(response) {
              $scope.item = response.data;
              $scope.cart = response.data.cart;
              console.log($scope.cart);   
          }); 

        }
        $scope.init();
    }]);