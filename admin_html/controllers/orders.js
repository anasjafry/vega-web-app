angular.module('OrdersApp', [])

  .controller('ordersController', function($scope, $http, $interval) {    

    //Default styling
    document.getElementById("confirmedTab").style.display="none";
    document.getElementById("confirmedTabButton").style.background="#F1F1F1";
    document.getElementById("pendingTabButton").style.background="#FFF";
    $scope.isPendingDisplayed = true;


    $scope.showConfirmed = function(){
      document.getElementById("pendingTab").style.display="none";
      document.getElementById("confirmedTab").style.display="block";
      document.getElementById("pendingTabButton").style.background="#F1F1F1";
      document.getElementById("confirmedTabButton").style.background="#FFF";
      $scope.isPendingDisplayed = false;
      $scope.initializePendingOrders();
      if($scope.confirmed_orders.length < 1)
        $scope.displayOrderID = "";
    }

    $scope.showPending = function(){
      document.getElementById("pendingTab").style.display="block";
      document.getElementById("confirmedTab").style.display="none";
      document.getElementById("confirmedTabButton").style.background="#F1F1F1";
      document.getElementById("pendingTabButton").style.background="#FFF";
      $scope.isPendingDisplayed = true;
      $scope.initializePendingOrders();
      if($scope.pending_orders.length < 1)
        $scope.displayOrderID = "";
    }

    $scope.initializePendingOrders = function(){
      $http.get("http://localhost/vega-web-app/online/orderhistory.php?status=0").then(function(response) {
          $scope.pending_orders = response.data;  
          //Default ORDER to display:
          if($scope.isPendingDisplayed){
            $scope.displayOrderID = $scope.pending_orders[0].orderID;
            $scope.displayOrderContent = $scope.pending_orders[0];
          }          
      }); 

      $http.get("http://localhost/vega-web-app/online/orderhistory.php?status=1").then(function(response) {
        $scope.confirmed_orders = response.data;
        if(!$scope.isPendingDisplayed){
            $scope.displayOrderID = $scope.confirmed_orders[0].orderID;
            $scope.displayOrderContent = $scope.confirmed_orders[0];
          }      
      });       
    }


    $scope.refreshPendingOrders = function(){
      $http.get("http://localhost/vega-web-app/online/orderhistory.php?status=0").then(function(response) {
          $scope.pending_orders = response.data;
      }); 

      $http.get("http://localhost/vega-web-app/online/orderhistory.php?status=1").then(function(response) {
          $scope.confirmed_orders = response.data;
      }); 
    }


    $scope.showOrder = function(orderid){
      $scope.displayOrderID = orderid;       
      var i = 0;  
      //Find matching order 
      if($scope.isPendingDisplayed){
        while(i < $scope.pending_orders.length){
            if($scope.displayOrderID == $scope.pending_orders[i].orderID){
              $scope.displayOrderContent = $scope.pending_orders[i];
              break;
            }
            i++;
        }
      }
      else{
        while(i < $scope.confirmed_orders.length){
            if($scope.displayOrderID == $scope.confirmed_orders[i].orderID){
              $scope.displayOrderContent = $scope.confirmed_orders[i];
              break;
            }
            i++;
        }
      }
    }


    $scope.confirmOrder = function(orderid){
      $http.get("http://localhost/vega-web-app/online/confirmorder.php?id="+orderid).then(function(response) {
        $scope.initializePendingOrders();
        $scope.displayOrderID = "";
        $scope.displayOrderContent = "";
      });            
    }

    $scope.rejectOrder = function(orderid){
      $http.get("http://localhost/vega-web-app/online/rejectorder.php?id="+orderid).then(function(response) {
        $scope.initializePendingOrders();
        $scope.displayOrderID = "";
        $scope.displayOrderContent = "";
      });            
    }


    //Refresh Page every 15 seconds.
    $scope.Timer = $interval(function () {
        $scope.refreshPendingOrders();
    }, 10000);    




	})

  .controller('profileController', function($scope) {
       
  })
  ;

    