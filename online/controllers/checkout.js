angular.module('CheckOut', ['ngRoute'])

.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}])



.controller('CheckoutController', ['$scope','$http', function($scope, $http) {

    //Default payment mode
    $scope.isCOD = false;

    $scope.setMode = function(mode){
      if(mode == 'COD')
        $scope.isCOD = true;
      else
        $scope.isCOD = false;
    }


    //Checkout address details
    $scope.name = "";
    $scope.flatNo = "";
    $scope.flatName = "";
    $scope.landmark = "";
    $scope.area = "";
    $scope.contact = "";

    //comments
    $scope.comments = "";


    //Coupon Stuff
    $scope.isCouponApplied = false;
    $scope.isCouponFailed = false;
    $scope.couponDiscount = 0;

    $scope.applyCoupon = function(){
      var data = {};
      data.token = "QYrNZG20IzMwLFr4mU9UOjS+UozOrLquEQpqSPYETSN9fOVFjgZ5h34oxjMronZZ";
      data.coupon = $scope.coupon;

      //Making the cart object
      var info = JSON.parse(localStorage.getItem("itemsInfo"));
      var i = 0;
      var sub_total=0;
      while(i<info.length)   {
          sub_total += (info[i].qty*info[i].itemPrice);
          i++;
      }

      var cart = {
          "cartTotal": sub_total,
          "cartCoupon": 0,
          "items": info
      };

      data.cart = cart;

      //Calling Validate Coupon
      $http({
        method  : 'POST',
        url     : 'http://www.zaitoon.online/services/validatecoupon.php',
        data    : data, //forms user object
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
       })
        .then(function(response) {
          if(response.data.status){
            $scope.isCouponApplied = true;
            $scope.isCouponFailed = false;
            $scope.couponDiscount = response.data.discount;
          }
          else{
            $scope.isCouponApplied = true;
            $scope.isCouponFailed = true;
            $scope.couponError = response.data.error;
          }
        });


    }


      $scope.checkout = function(){
        var info = JSON.parse(localStorage.getItem("itemsInfo"));
        var i = 0;
        var sub_total=0;
        while(i<info.length)   {
            sub_total += (info[i].qty*info[i].itemPrice);
            i++;
        }
        var cart = {
            "cartTotal": sub_total,
            "cartCoupon": 0,
            "items": info
        };

        console.log(cart);

        var address = {};
        address.name = $scope.name;
        address.flatNo = $scope.flatNo;
        address.flatName = $scope.flatName;
        address.location = $scope.location;
        address.area = $scope.area;
        address.contact = $scope.contact;

        var data = {};
        data.user = "9043960876";
        data.cart = JSON.stringify(cart);
        data.address = address;
        data.comments = $scope.comments;


        $http({
          method  : 'POST',
          url     : 'http://localhost/vega-web-app/online/createorder.php',
          data    : data, //forms user object
          headers : {'Content-Type': 'application/x-www-form-urlencoded'}
         })
          .then(function(response) {
            if(response.data.status){
              console.log("Success");
            }
            else{
              console.log("Error");
            }
          });


        }
    }]);
