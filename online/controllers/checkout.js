angular.module('CheckOut', [])

.controller('CheckoutController', ['$scope','$http', function($scope, $http) {
      $scope.checkout = function(){ 
        var info = JSON.parse(localStorage.getItem("itemsInfo"));
        var i = 0;
        var items=[];
        var cart;
        var sub_total=0;
        while(i<info.length)   {
            sub_total += (info[i].itemQuantity*info[i].itemPrice);
            items.push({
                "itemCode": info[i].itemCode,
                "itemName": info[i].itemName,
                "itemQuantity": info[i].itemQuantity,
                "itemPrice": info[i].itemPrice,
                "itemVariety": info[i].itemVariety
            });
            i++;
        }
        cart = {
            "cartTotal": sub_total,
            "cartCoupon": 0,
            "items": items
        };


        var data = {}; 
        data.user = "9043960876";
        data.cart = JSON.stringify(cart);

        $http({
          method  : 'POST',
          url     : 'http://localhost/vega-web-app/online/createorder.php',
          data    : data, //forms user object
          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
         })
          .then(function(response) {
            if(response.data.status){
              console.log("Success");
              console.log(response.data.orderid);
            }
            else{
              console.log("Error");
            }          
          });        


        }
    }]);