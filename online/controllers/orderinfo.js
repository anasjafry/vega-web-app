angular.module('OrderInfo',['ngRoute'])

.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}])



.controller('DetailsController', ['$scope','$http', function($scope, $http) {

      $scope.init = function(){
        $scope.item=null;
        $scope.cart=null;
        var data = {};
        data.orderID = "10013201";
        data.token = JSON.parse(localStorage.getItem("user")).token;

        $http({
          method  : 'POST',
          url     : 'http://www.zaitoon.online/services/orderinfo.php',
          data    : data, //forms user object
          headers : {'Content-Type': 'application/x-www-form-urlencoded'}
         })
          .then(function(response) {
            if(response.data.status){
              $scope.item = response.data.response;
              $scope.cart = response.data.response.cart;
            }
            else{
              alert('Not Authorised!');
            }

          });

        }
        $scope.init();
    }]);
