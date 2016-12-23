angular.module('FullMenu', [])
  
  //var urlroot="http://localhost/zaitoononline/";


    .controller('SideMenuController', function($scope, $http) {
		$http.get("http://localhost:3001/test").then(function(response) {
        $scope.title = response.data.name;
       	console.log($scope.title);
    });    	
      	
	})

    .controller('MenuTypeController', function($scope, $http) {

    $http.get("http://localhost:3001/menutype").then(function(response) {
        $scope.menulist = response.data;
    }); 
 
  })

    .controller('MenuController', function($scope, $http) {

    $http.get("http://localhost/vega-web-app/online/getmenu.php").then(function(response) {
        $scope.menu = response.data;
        console.log(response.data);

    }); 

    $scope.addToCart = function(code, name, price, variety){

            if(localStorage.getItem("itemsInfo") === null){
                var temp = [];
                localStorage.setItem("itemsInfo", JSON.stringify(temp));
            }
            var info = JSON.parse(localStorage.getItem("itemsInfo")); //getting items from localStorage
            var i = 0;
            var flag = -1;

            console.log(info.length) ;
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
                var newItem = {"itemCode":code,"itemName":name,"itemQuantity": 1,"itemPrice":price,"itemVariety":variety};
                oldItems.push(newItem);
                var x = JSON.parse(localStorage.getItem("itemsInfo")) ;
                //console.log(x.itemQuantity);
                localStorage.setItem('itemsInfo', JSON.stringify(oldItems));
                console.log((JSON.parse(localStorage.getItem("itemsInfo")))[3]);
                
            }
               
                //var l = JSON.parse(localStorage.getItem("itemsInfo"))
                //localStorage.setItem('itemsInfo', JSON.stringify(items));
                //var j =0;
                //console.log(l);
                
                renderCart();
    }
 
  })

    .controller('CartController', function($scope) {
       $scope.title = "My Cart";
	})

    .controller('CheckoutController', ['$scope','$http', function($scope, $http) {
      $scope.checkout = function(){ 
        var info = JSON.parse(localStorage.getItem("itemsInfo"));
        var i = 0;
        var items=[];
        var cart=[];
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
        cart.push({
            "cartTotal": sub_total,
            "cartCoupon": 0,
            "items": items
        });

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

    