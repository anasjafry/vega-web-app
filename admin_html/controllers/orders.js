angular.module('OrdersApp', [])

  .controller('completedOrdersController', function($scope, $http) {    

      $http.get("http://localhost/vega-web-app/online/orderhistory.php?status=2&id=0").then(function(response) {
          $scope.completed_orders = response.data;  
          //Default ORDER to display:
          $scope.displayOrderID = $scope.completed_orders[0].orderID;
          $scope.displayOrderContent = $scope.completed_orders[0];      
      }); 

      $scope.showOrder = function(orderid){
      $scope.displayOrderID = orderid;       
      var i = 0;  
      while(i < $scope.completed_orders.length){
          if($scope.displayOrderID == $scope.completed_orders[i].orderID){
            $scope.displayOrderContent = $scope.completed_orders[i];
            break;
          }
          i++;
      }
      }
      $scope.searchID='';
      $scope.search = function(id){
      console.log($scope.searchID);      
      var i = 0;  
      $http.get("http://localhost/vega-web-app/online/orderhistory.php?status=2&mobile="+$scope.searchID).then(function(response) {
          $scope.completed_orders = response.data; 
          if($scope.completed_orders.length == 0){
            $http.get("http://localhost/vega-web-app/online/orderinfo.php?orderID="+$scope.searchID).then(function(response) {
                console.log("This Shit Works");
                var temp=[];
                temp.push(response.data);
                $scope.completed_orders = temp;  
                console.log($scope.completed_orders);
                if($scope.completed_orders.length == 0){
                  $scope.completed_orders="Sorry no items match your search";
                }
                else{
                  $scope.displayOrderID = $scope.completed_orders[0].orderID;
                  $scope.displayOrderContent = $scope.completed_orders[0]; 
                }  
            });
          }
          $scope.displayOrderID = $scope.completed_orders[0].orderID;
          $scope.displayOrderContent = $scope.completed_orders[0];      
      }); 
      }


  })
  
  .controller('ordersController', function($scope, $http, $interval) {  

    //Show only when "dispatch order" is clicked.
    $scope.showDeliveryAgents = false;  

    //Default styling
    document.getElementById("confirmedTab").style.display="none";
    document.getElementById("confirmedTabButton").style.background="#F1F1F1";
    document.getElementById("pendingTabButton").style.background="#FFF";
    $scope.isPendingDisplayed = true;


    $scope.showConfirmed = function(){
      $scope.showDeliveryAgents = false; // Hide choose agent option   

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
      $scope.showDeliveryAgents = false; // Hide choose agent option   

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
      $scope.showDeliveryAgents = false; // Hide choose agent option   

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


    $scope.assignAgent = function(orderid){
      $scope.showDeliveryAgents = true;
      $http.get("http://localhost/vega-web-app/online/fetchroles.php?branch=VELACHERY&role=AGENT").then(function(response) {
        $scope.all_agents = response.data.results;
        $scope.delivery_agents = [];
        var i = 0;
        while(i < $scope.all_agents.length){
          $scope.delivery_agents.push(
            {
              value: $scope.all_agents[i].code , 
              label: $scope.all_agents[i].name
            }
          );          
          i++;
        }
        
      });            
    }


    $scope.dispatchOrder = function(orderid, agentcode){
      //WHAT IS LEFT -- PUT THE agent code in DB (against ORDER ID) for future reference.
      $http.get("http://localhost/vega-web-app/online/dispatchorder.php?id="+orderid+"&agent="+agentcode).then(function(response) {
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

    