angular.module('OrdersApp', [])

  .controller('completedOrdersController', function($scope, $http) {    

      // $http.get("http://localhost/vega-web-app/online/orderhistory.php?status=2&id=0").then(function(response) {
      //     $scope.completed_orders = response.data;  
      //     //Default ORDER to display:
      //     $scope.displayOrderID = $scope.completed_orders[0].orderID;
      //     $scope.displayOrderContent = $scope.completed_orders[0];      
      // }); 
      $scope.prevflag=false;
      $scope.limiter=0;
      $scope.nextflag=true;

      var data = {};
      data.token = "5pOUIJKuXNJ7hCs04udBRlBu5kpEXL5VjOGO67sUkuULClei8y1eyliYfsi1jF2K";
      data.status = 2;
      data.id = 0;
      $http({
        method  : 'POST',
        url     : 'http://zaitoon.online/services/fetchorders.php',
        data    : data, //forms user object
        headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
       })
       .then(function(response) {
            $scope.completed_orders = response.data.response;
            if($scope.completed_orders.length < 5){
              $scope.nextflag=false;
            }
            //console.log(response);
            $scope.displayOrderID = $scope.completed_orders[0].orderID;
            $scope.displayOrderContent = $scope.completed_orders[0];
        }); 

    
    $scope.showNext = function(){
      $scope.prevflag=true;
      $scope.limiter+=5;
      var data = {};
      data.token = "5pOUIJKuXNJ7hCs04udBRlBu5kpEXL5VjOGO67sUkuULClei8y1eyliYfsi1jF2K";
      data.status = 2;
      data.id = $scope.limiter;
      $http({
        method  : 'POST',
        url     : 'http://zaitoon.online/services/fetchorders.php',
        data    : data, //forms user object
        headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
       })
       .then(function(response) {
            $scope.completed_orders = response.data.response;
            if($scope.completed_orders.length < 5){
              $scope.nextflag=false;
            } 
        });

    }
    $scope.showPrev = function(){
      $scope.nextflag=true;
      $scope.limiter-=5;
      var data = {};
      data.token = "5pOUIJKuXNJ7hCs04udBRlBu5kpEXL5VjOGO67sUkuULClei8y1eyliYfsi1jF2K";
      data.status = 2;
      data.id = $scope.limiter;
      $http({
        method  : 'POST',
        url     : 'http://zaitoon.online/services/fetchorders.php',
        data    : data, //forms user object
        headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
       })
       .then(function(response) {
            $scope.completed_orders = response.data.response;
        });
      if($scope.limiter==0){
        $scope.prevflag=false;
      } 
    }

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
      var i = 0;  
      $http.get("http://localhost/vega-web-app/online/orderhistory.php?status=2&mobile="+$scope.searchID).then(function(response) {
          $scope.completed_orders = response.data; 
          if($scope.completed_orders.length == 0){
            $http.get("http://localhost/vega-web-app/online/orderinfo.php?orderID="+$scope.searchID).then(function(response) {
                
                if(response.data.length != 0){
                  var temp=[];
                  temp.push(response.data);
                  $scope.completed_orders = temp;

                  $scope.displayOrderID = $scope.completed_orders[0].orderID;
                  $scope.displayOrderContent = $scope.completed_orders[0];   
                }
                else{
                  $scope.completed_orders = [];
                  $scope.displayOrderID = 0 ;
                }  
            });
          }
          $scope.displayOrderID = $scope.completed_orders[0].orderID;
          $scope.displayOrderContent = $scope.completed_orders[0];      
      }); 
      }


  })
  
  .controller('ordersController', function($scope, $http, $interval) {  

    //Pending Flags
    $scope.prevflag_p=false;
    $scope.limiter_p=0;
    $scope.nextflag_p=true;

    //Confirmed Flags
    $scope.prevflag_c=false;
    $scope.limiter_c=0;
    $scope.nextflag_c=true;

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
      console.log('show pending_orders')
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
      
      var data = {}; 
      data.token = "5pOUIJKuXNJ7hCs04udBRlBu5kpEXL5VjOGO67sUkuULClei8y1eyliYfsi1jF2K";
      data.status = 0;
      data.id = 0;
      $http({
        method  : 'POST',
        url     : 'http://zaitoon.online/services/fetchorders.php',
        data    : data, //forms user object
        headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
       })
       .then(function(response) {
            $scope.pending_orders = response.data.response;
            $scope.pending_orders_length = response.data.count;
            //console.log($scope.pending_orders.length);
            if($scope.pending_orders.length < 5){
              $scope.nextflag_p=false;
            }
            //console.log($scope.pending_orders);  
            //Default ORDER to display:
            if($scope.isPendingDisplayed){
              $scope.displayOrderID = $scope.pending_orders[0].orderID;
              $scope.displayOrderContent = $scope.pending_orders[0];
            }

          }); 


      //Initialising Confimred

      var data = {};
      data.token = "5pOUIJKuXNJ7hCs04udBRlBu5kpEXL5VjOGO67sUkuULClei8y1eyliYfsi1jF2K";
      data.status = 1;
      data.id = 0;
      $http({
        method  : 'POST',
        url     : 'http://zaitoon.online/services/fetchorders.php',
        data    : data, //forms user object
        headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
      })
      .then(function(response) {
          $scope.confirmed_orders = response.data.response;
          $scope.confirmed_orders_length = response.data.count;
          if($scope.confirmed_orders.length < 5){
            $scope.nextflag_p=false;
          }
          if(!$scope.isPendingDisplayed){
            $scope.displayOrderID = $scope.confirmed_orders[0].orderID;
            $scope.displayOrderContent = $scope.confirmed_orders[0];
          }
      }); 

    }

    $scope.showNext_p = function(orderstatus){
      $scope.prevflag_p=true;
      $scope.limiter_p+=5;
      var data = {};
      data.token = "5pOUIJKuXNJ7hCs04udBRlBu5kpEXL5VjOGO67sUkuULClei8y1eyliYfsi1jF2K";
      data.status = orderstatus;
      data.id = $scope.limiter_p;
      $http({
        method  : 'POST',
        url     : 'http://zaitoon.online/services/fetchorders.php',
        data    : data, //forms user object
        headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
       })
       .then(function(response) {
            $scope.pending_orders = response.data.response;
            if($scope.pending_orders.length < 5){
              $scope.nextflag_p=false;
            } 
        });

    }


    $scope.showPrev_p = function(orderstatus){
      $scope.nextflag_p=true;
      $scope.limiter_p-=5;
      var data = {};
      data.token = "5pOUIJKuXNJ7hCs04udBRlBu5kpEXL5VjOGO67sUkuULClei8y1eyliYfsi1jF2K";
      data.status = orderstatus;
      data.id = $scope.limiter_p;
      $http({
        method  : 'POST',
        url     : 'http://zaitoon.online/services/fetchorders.php',
        data    : data, //forms user object
        headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
       })
       .then(function(response) {
            $scope.pending_orders = response.data.response;
        });
      if($scope.limiter_p==0){
        $scope.prevflag_p=false;
      } 
    }

    $scope.showNext_c = function(orderstatus){
      $scope.prevflag_c=true;
      $scope.limiter_c+=5;
      var data = {};
      data.token = "5pOUIJKuXNJ7hCs04udBRlBu5kpEXL5VjOGO67sUkuULClei8y1eyliYfsi1jF2K";
      data.status = orderstatus;
      data.id = $scope.limiter_c;
      $http({
        method  : 'POST',
        url     : 'http://zaitoon.online/services/fetchorders.php',
        data    : data, //forms user object
        headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
       })
       .then(function(response) {
            $scope.confirmed_orders = response.data.response;
            if($scope.confirmed_orders.length < 5){
              $scope.nextflag_c=false;
            } 
        });

    }


    $scope.showPrev_c = function(orderstatus){
      $scope.nextflag_c=true;
      $scope.limiter_c-=5;
      var data = {};
      data.token = "5pOUIJKuXNJ7hCs04udBRlBu5kpEXL5VjOGO67sUkuULClei8y1eyliYfsi1jF2K";
      data.status = orderstatus;
      data.id = $scope.limiter_p;
      $http({
        method  : 'POST',
        url     : 'http://zaitoon.online/services/fetchorders.php',
        data    : data, //forms user object
        headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
       })
       .then(function(response) {
            $scope.confirmed_orders = response.data.response;
        });
      if($scope.limiter_c==0){
        $scope.prevflag_c=false;
      } 
    }

    $scope.refreshPendingOrders = function(){
      var data = {}; 
      data.token = "5pOUIJKuXNJ7hCs04udBRlBu5kpEXL5VjOGO67sUkuULClei8y1eyliYfsi1jF2K";
      data.status = 0;
      data.id = 0; 
      $http({
        method  : 'POST',
        url     : 'http://zaitoon.online/services/fetchorders.php',
        data    : data, //forms user object
        headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
       })
       .then(function(response) {
            $scope.pending_orders = response.data.response;
  
            //Default ORDER to display:
            if($scope.isPendingDisplayed){
              $scope.displayOrderID = $scope.pending_orders[0].orderID;
              $scope.displayOrderContent = $scope.pending_orders[0];
            }

          });



      //For Confirmed
      // var data = {};
      // data.token = "5pOUIJKuXNJ7hCs04udBRlBu5kpEXL5VjOGO67sUkuULClei8y1eyliYfsi1jF2K";
      // data.status = 1;
      // data.id = 0;
      // $http({
      //   method  : 'POST',
      //   url     : 'http://zaitoon.online/services/fetchorders.php',
      //   data    : data, //forms user object
      //   headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
      //  })
      //  .then(function(response) {
      //       $scope.confirmed_orders = response.data.response;
      // });


    }


    $scope.showOrder = function(orderid, isTakeaway){
      $scope.showDeliveryAgents = false; // Hide choose agent option   
      $scope.displayOrderType = isTakeaway;
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
      var data = {};
      data.token = "5pOUIJKuXNJ7hCs04udBRlBu5kpEXL5VjOGO67sUkuULClei8y1eyliYfsi1jF2K";
      data.id = orderid;
      $http({
        method  : 'POST',
        url     : 'http://zaitoon.online/services/confirmorder.php',
        data    : data, //forms user object
        headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
       })
       .then(function(response) {
            $scope.initializePendingOrders();
            $scope.displayOrderID = "";
            $scope.displayOrderContent = "";
            });           
    }

    $scope.rejectOrder = function(orderid){
      var data = {};
      data.token = "5pOUIJKuXNJ7hCs04udBRlBu5kpEXL5VjOGO67sUkuULClei8y1eyliYfsi1jF2K";
      data.id = orderid;
      $http({
        method  : 'POST',
        url     : 'http://zaitoon.online/services/rejectorder.php',
        data    : data, //forms user object
        headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
       })
       .then(function(response) {
            $scope.initializePendingOrders();
            $scope.displayOrderID = "";
            $scope.displayOrderContent = "";
            });           
    }


    $scope.assignAgent = function(orderid){
      $scope.showDeliveryAgents = true;
      $http.get("http://zaitoon.online/services/fetchroles.php?branch=VELACHERY&role=AGENT").then(function(response) {
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

      var data = {};
      data.token = "5pOUIJKuXNJ7hCs04udBRlBu5kpEXL5VjOGO67sUkuULClei8y1eyliYfsi1jF2K";
      data.id = orderid;
      data.agent = agentcode;
      $http({
        method  : 'POST',
        url     : 'http://zaitoon.online/services/dispatchorder.php',
        data    : data, //forms user object
        headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
       })
       .then(function(response) {
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

    