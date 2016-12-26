angular.module('FullMenu', ['siyfion.sfTypeahead'])
  
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
               
            renderCart();
    }
 
  })

    .controller('CartController', function($scope) {
       $scope.cartNotEmpty = true;
       $scope.cartCount = 10;
	});

    