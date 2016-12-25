angular.module('FullMenu', ['siyfion.sfTypeahead'])
  
  //var urlroot="http://localhost/zaitoononline/";




  //Search Menu
  .controller('SearchMenuCtrl', function($scope, $http ) {

    $http.get("http://localhost/vega-web-app/online/getallitems.php").then(function(response) {
        $scope.menu = response.data;
        $scope.allList = [];
        var i = 0;
        while(i < 10){
          $scope.allList.push({name:'Test only',id:100,variety:'type',price:110});
          i++;
        }
        console.log($scope.allList);
    }); 
  
  

  $scope.selectedNumber = null;
  
  // instantiate the bloodhound suggestion engine
  var numbers = new Bloodhound({
    datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.name); },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: {
      url: "http://localhost/vega-web-app/online/getallitems.php",
      filter: function(response) {      
        return response;
      }
    },
    sufficient:10

    //local : $scope.allList
    // local: [
    //   { name: 'Alooo Porata Mixed Curry and Rice Combo', id:1001, variety:'Aloo items', price:100 },
    //   { name: 'Aloo Bonda Veg Mix', id:1002, variety:'Aloo items', price:80 },
    //   { name: 'Alternate Curry', id:1003, variety:'Curries', price:200 },
    //   { name: 'Aam Lessi', id: 1004, variety:'Juice', price:50 }
    // ]  
  });
   console.log(numbers);
  // initialize the bloodhound suggestion engine
  numbers.initialize();

  $scope.numbersDataset = {
    displayKey: 'name',
    source: numbers.ttAdapter(),
    templates: {
      empty: [
        '<div class="tt-error">',
        '<tag style="color: #e74c3c;">No results found.</tag>',
        '</div>'
      ].join('\n'),
    }
  };  

  // Typeahead options object
  $scope.exampleOptions = {
    displayKey: 'title'
  };

  //Replica of Add to Cart Function
  $scope.addToCart = function(code, name, price, variety){

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
                var newItem = {"itemCode":code,"itemName":name,"itemQuantity": 1,"itemPrice":price,"itemVariety":variety};
                oldItems.push(newItem);
                var x = JSON.parse(localStorage.getItem("itemsInfo")) ;
                //console.log(x.itemQuantity);
                localStorage.setItem('itemsInfo', JSON.stringify(oldItems));
                
            }
               
                //var l = JSON.parse(localStorage.getItem("itemsInfo"))
                //localStorage.setItem('itemsInfo', JSON.stringify(items));
                //var j =0;
                //console.log(l);
                
                renderCart();
    }  


  //User selects from the suggestions and this fires...
  $scope.$on('typeahead:select', function(evt, suggestion) {
    console.log('Found : '+suggestion.name);
    $scope.addToCart(suggestion.id, suggestion.name, suggestion.price, suggestion.variety);

    $scope.searchMsg = 'Recently added '+suggestion.name;
    $scope.selectedNumber = null;
  })

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

    