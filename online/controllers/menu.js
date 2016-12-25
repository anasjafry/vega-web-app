angular.module('FullMenu', ['siyfion.sfTypeahead'])
  
  //var urlroot="http://localhost/zaitoononline/";




  //Search Menu
  .controller('SearchMenuCtrl', function($scope) {
  
  

  $scope.selectedNumber = null;
  
  // instantiate the bloodhound suggestion engine
  var numbers = new Bloodhound({
    datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.num); },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: [
      { num: 'Alooo Porata Mixed Curry and Rice Combo', id:1001 },
      { num: 'Aloo Bonda Veg Mix', id:1002 },
      { num: 'Alternate Curry', id:1003 },
      { num: 'Aam Lessi', id: 1004 }
    ]
  });
   
  // initialize the bloodhound suggestion engine
  numbers.initialize('hello');

  $scope.numbersDataset = {
    displayKey: 'num',
    source: numbers.ttAdapter(),
    templates: {
      empty: [
        '<div class="tt-error">',
        '<tag style="color: #e74c3c;">No results found.</tag>',
        '</div>'
      ].join('\n'),
    }
  };  
  
  //$scope.test();

  // Typeahead options object
  $scope.exampleOptions = {
    displayKey: 'title'
  };

  $scope.finds = '0 results';
  $scope.resultFound = true;//getStatus();
  console.log('Calling get status from Menu:');

  $scope.revertSearch = function(){
    $scope.resultFound = !($scope.resultFound);
  }


})



    .controller('MenuTypeController', function($scope, $http) {

    $http.get("http://localhost:3001/menutype").then(function(response) {
        $scope.menulist = response.data;
    }); 
 
  })

    .controller('MenuController', function($scope, $http) {

    $http.get("http://localhost/vega-web-app/online/getmenu.php").then(function(response) {
        $scope.menu = response.data;
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
       $scope.cartNotEmpty = true;
       $scope.cartCount = 10;
	})

    .controller('DetailsController', ['$scope','$http', function($scope, $http) {
      $scope.init = function(){ 
        $scope.item=null;
        $scope.cart=null;
        var data = {}; 
        data.orderID = "10013053";

        $http({
          method  : 'POST',
          url     : 'http://localhost/vega-web-app/online/orderinfo.php',
          data    : data, //forms user object
          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
         })
          .then(function(response) {
              $scope.item = response.data;
              $scope.cart = response.data.cart;
              console.log($scope.cart);   
          }); 

        }
        $scope.init();
    }])

    .controller('HistoryController', ['$scope','$http', function($scope, $http) {
      $scope.init = function(){ 
        $scope.item=null;
        $scope.cart=null;
        var data = {}; 
        data.user = "9043960876";

        $http({
          method  : 'POST',
          url     : 'http://localhost/vega-web-app/online/orderhistory.php',
          data    : data, //forms user object
          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
         })
          .then(function(response) {
              $scope.item = response.data;
              $scope.cart = response.data.cart;
              console.log(response);   
          }); 

        }
        $scope.init();
    }])

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

    