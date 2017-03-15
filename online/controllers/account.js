angular.module('Account', ['ngRoute'])


.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}])

    .controller('HistoryController', ['$scope','$http', function($scope, $http) {

      //Check if the user is Logged In
      if(localStorage.getItem("user")){
        $scope.isLoggedIn = true;
      }
      else{
        $scope.isLoggedIn = false;
      }


      $scope.init = function(){
        var data = {};
        data.token = JSON.parse(localStorage.getItem("user")).token;

        $http({
          method  : 'POST',
          url     : 'http://www.zaitoon.online/services/orderhistory.php',
          data    : data, //forms user object
          headers : {'Content-Type': 'application/x-www-form-urlencoded'}
         })
          .then(function(response) {
              $scope.item = response.data.response;
              console.log($scope.item)
              if(!response.data.status){
                $scope.errorMsg = response.data.error;
                localStorage.removeItem("user"); //Login Again
              }
          });

        }
        $scope.init();
    }])



    .controller('UserProfileController', ['$scope','$http', function($scope, $http) {

        var data = {};
        data.token = JSON.parse(localStorage.getItem("user")).token;

        $http({
          method  : 'POST',
          url     : 'http://www.zaitoon.online/services/fetchusers.php',
          data    : data, //forms user object
          headers : {'Content-Type': 'application/x-www-form-urlencoded'}
         })
          .then(function(response) {
              $scope.user = response.data;
              $scope.profileName = $scope.user.name;
              $scope.profileEmail = $scope.user.email;
              console.log(response)
          });

        $scope.toggleFlag = 0;
        $scope.swapFlag = function(to){
          $scope.toggleFlag = to;
        }

        //To change profile changes
        $scope.saveProfile = function(name, email){
          if(name != ""){
            var data = {};
            data.name = name;
            data.email = email;
            data.token = JSON.parse(localStorage.getItem("user")).token;

            $http({
              method  : 'POST',
              url     : 'http://www.zaitoon.online/services/edituser.php',
              data    : data, //forms user object
              headers : {'Content-Type': 'application/x-www-form-urlencoded'}
             })
              .then(function(response) {
                if(response.data.status){
                  $scope.toggleFlag = 0;
                  $scope.ProfileEditMsg = "Changes saved successfully";
                }
                else {
                  $scope.ProfileEditMsg = response.data.error;
                }
              });
          }
        }

    }]);
