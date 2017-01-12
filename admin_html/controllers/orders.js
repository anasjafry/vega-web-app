angular.module('OrdersApp', [])

  .controller('ordersController', function($scope, $http, $interval) {    


    $scope.initializePendingOrders = function(){
      $http.get("http://localhost/vega-web-app/online/orderhistory.php?status=0").then(function(response) {
          $scope.pending_orders = response.data;

          //Default ORDER to display:
          $scope.displayOrderID = $scope.pending_orders[0].orderID;
          $scope.displayOrderContent = $scope.pending_orders[0];
      });       
    }


    $scope.refreshPendingOrders = function(){
      $http.get("http://localhost/vega-web-app/online/orderhistory.php?status=0").then(function(response) {
          $scope.pending_orders = response.data;
      });       
    }


    $http.get("http://localhost/vega-web-app/online/orderhistory.php?status=1").then(function(response) {
        $scope.confirmed_orders = response.data;
    }); 

    

    $scope.showOrder = function(orderid){
      $scope.displayOrderID = orderid;       
      var i = 0;  
      //Find matching order 
      while(i < $scope.pending_orders.length){
          if($scope.displayOrderID == $scope.pending_orders[i].orderID){
            $scope.displayOrderContent = $scope.pending_orders[i];
            break;
          }
          i++;
      }
    }


    $scope.confirmOrder = function(orderid){
      $http.get("http://localhost/vega-web-app/online/confirmorder.php?id="+orderid).then(function(response) {
        $scope.initializePendingOrders();
      });            
    }


    //Refresh Page every 15 seconds.
    $scope.Timer = $interval(function () {
        $scope.refreshPendingOrders();
    }, 15000);    




	})

  .controller('profileController', function($scope) {
       
  })
  ;

    