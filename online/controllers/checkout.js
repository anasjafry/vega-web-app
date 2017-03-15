angular.module('CheckOut', ['ngRoute'])

.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}])



.controller('CheckoutController', ['$scope','$http', function($scope, $http) {

    // Check if already logged in
    // var cname = "token", cvalue = "tokenavlaflafe3r5RTWF", exdays = "5";
    // var d = new Date();
    // d.setTime(d.getTime() + (exdays*24*60*60*1000));
    // var expires = "expires="+ d.toUTCString();
    // document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    //
    // var decodedCookie = decodeURIComponent(document.cookie);
    // console.log(decodedCookie)

    //Check if the user is Logged In
    if(localStorage.getItem("user")){
      $scope.isLoggedIn = true;

      //Checkout address details
      if(JSON.parse(localStorage.getItem("user")).savedAddresses[0]){
        $scope.name = JSON.parse(localStorage.getItem("user")).savedAddresses[0].name;
        $scope.flatNo = JSON.parse(localStorage.getItem("user")).savedAddresses[0].flatNo;
        $scope.flatName = JSON.parse(localStorage.getItem("user")).savedAddresses[0].flatName;
        $scope.landmark = JSON.parse(localStorage.getItem("user")).savedAddresses[0].landmark;
        $scope.area = JSON.parse(localStorage.getItem("user")).savedAddresses[0].area;
        $scope.contact = JSON.parse(localStorage.getItem("user")).savedAddresses[0].contact;
      }
      else{
        $scope.name = "";
        $scope.flatNo = "";
        $scope.flatName = "";
        $scope.landmark = "";
        $scope.area = "";
        $scope.contact = "";
      }
    }
    else{
      $scope.isLoggedIn = false;

      //Checkout address details
      $scope.name = "";
      $scope.flatNo = "";
      $scope.flatName = "";
      $scope.landmark = "";
      $scope.area = "";
      $scope.contact = "";
    }

    //Default payment mode
    $scope.isCOD = false;

    $scope.setMode = function(mode){
      if(mode == 'COD')
        $scope.isCOD = true;
      else
        $scope.isCOD = false;
    }

    //comments
    $scope.comments = "";


    //Coupon Stuff
    $scope.isCouponApplied = false;
    $scope.isCouponFailed = false;
    $scope.couponDiscount = 0;

    $scope.invalidateCoupon = function(){
      document.getElementById("couponCode").disabled = false;

      if($scope.isCouponApplied && !$scope.isCouponFailed){
        $scope.isCouponApplied = false;
        $scope.isCouponFailed = false;
        document.getElementById("discountTab").innerHTML = ' 0';
        document.getElementById("grandTotal").innerHTML = Number(document.getElementById("grandTotal").innerHTML) + $scope.couponDiscount;
      }

      if($scope.isCouponApplied && $scope.isCouponFailed){
        $scope.isCouponApplied = false;
        $scope.isCouponFailed = false;
      }
    }

    $scope.applyCoupon = function(){
      var data = {};
      data.token = JSON.parse(localStorage.getItem("user")).token;
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
          "cartCoupon": $scope.coupon,
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

            document.getElementById("couponCode").disabled = true;
            document.getElementById("discountTab").innerHTML = ' '+$scope.couponDiscount;
            document.getElementById("grandTotal").innerHTML = Number(document.getElementById("grandTotal").innerHTML) - $scope.couponDiscount;
          }
          else{
            $scope.isCouponApplied = true;
            $scope.isCouponFailed = true;
            $scope.couponError = response.data.error;
          }
        });


    }


      $scope.checkout = function(){
        var coupon_applied = 0;

        if($scope.isCouponApplied && !$scope.isCouponFailed){
          var coupon_applied = $scope.coupon;
        }

        var info = JSON.parse(localStorage.getItem("itemsInfo"));
        var i = 0;
        var sub_total=0;
        while(i<info.length)   {
            sub_total += (info[i].qty*info[i].itemPrice);
            i++;
        }
        var cart = {
            "cartTotal": sub_total,
            "cartCoupon": coupon_applied,
            "items": info
        };

        var address = {};
        address.name = $scope.name;
        address.flatNo = $scope.flatNo;
        address.flatName = $scope.flatName;
        address.landmark = $scope.landmark;
        address.area = $scope.area;
        address.contact = $scope.contact;

        var data = {};
        data.token = JSON.parse(localStorage.getItem("user")).token;
        data.cart = cart;
        data.address = address;
        data.comments = $scope.comments;

        $http({
          method  : 'POST',
          url     : 'http://www.zaitoon.online/services/createorder.php',
          data    : data, //forms user object
          headers : {'Content-Type': 'application/x-www-form-urlencoded'}
         })
          .then(function(response) {
            if(response.data.status){
              console.log("Success");
            }
            else{
              console.log(response.data.error);
            }
          });
        }


    }]);
