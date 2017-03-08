angular.module('FullMenu', ['siyfion.sfTypeahead'])

.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}])






    .controller('MenuController', function($scope, $http) {

      //Check if the user is Logged In
      if(localStorage.getItem("user")){
        $scope.isLoggedIn = true;
      }
      else{
        $scope.isLoggedIn = false;
      }

      //Check if the location is set
      if(localStorage.getItem("location") === null){
        $scope.isLocationSet = false;
      }
      else{
        $scope.locationData = JSON.parse(localStorage.getItem("location"));
        if($scope.locationData.city != null && $scope.locationData.location != null ){
          $scope.isLocationSet = true;
        }
        else{
          $scope.isLocationSet = false;
        }
      }


      //console.log($scope.isLoggedIn);

      // var data = {};
      // data.cuisine = "ARABIAN";
      // data.isFilter = false;
      //
      // $http({
      //   method  : 'POST',
      //   url     : 'http://localhost/vega-web-app/online/services/fetchmenuweb.php',
      //   data    : data, //forms user object
      //   headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      //  })
      // .then(function(response) {
      //   $scope.menu = response.data;
      //   console.log($scope.menu)
      //   if($scope.menu.length == 0)
      //     $scope.isEmpty = true;
      //   else
      //     $scope.isEmpty = false;
      // });

      // For Search
      $scope.searchKeyword  = "";



    $http.get("http://localhost/vega-web-app/online/services/fetchmenuweb.php").then(function(response) {
        $scope.menu = response.data;
    });

    $scope.addToCart = function(item){

            var code = item.itemCode;

            if(localStorage.getItem("itemsInfo") === null){
                var temp = [];
                localStorage.setItem("itemsInfo", JSON.stringify(temp));
            }
            var info = JSON.parse(localStorage.getItem("itemsInfo")); //getting items from localStorage
            var i = 0;
            var flag = -1;

            while(i<info.length)
            {
                //checks if item aldready in cart and returns the position of that object if exists
                if(info[i].itemCode==code)
                {
                    flag = i;
                    break;
                }
                i++;
            }
            if(flag != -1){
                var item = JSON.parse(localStorage.itemsInfo);
                //var info = JSON.parse(localStorage.getItem("itemsInfo"))[x];
                item[flag].itemQuantity +=1;
                localStorage.setItem("itemsInfo", JSON.stringify(item));
                //console.log(info.itemQuantity);
                console.log((JSON.parse(localStorage.getItem("itemsInfo")))[0]);
            }
            else if(flag == -1){
                var oldItems = JSON.parse(localStorage.getItem('itemsInfo')) || [];
                var newItem = item;
                newItem.qty = 1;
                oldItems.push(newItem);
                var x = JSON.parse(localStorage.getItem("itemsInfo")) ;
                //console.log(x.itemQuantity);
                localStorage.setItem('itemsInfo', JSON.stringify(oldItems));

            }

            renderCart();
    }

  })

    .controller('CartController', function($scope) {
       $scope.cartNotEmpty = true;
       $scope.cartCount = 10;
	});
