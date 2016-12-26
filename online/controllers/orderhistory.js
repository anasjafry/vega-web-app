angular.module('OrderHistory', [])

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
    }]);