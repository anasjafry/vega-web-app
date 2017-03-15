angular.module('ResourcesApp', [])

  .controller('deliveryagentController', function($scope, $http) {    
      $http.get("http://zaitoon.online/services/fetchroles.php?branch=VELACHERY&role=AGENT").then(function(response) {
          $scope.delivery_agent = response.data.results;  
      });
      $scope.errorflag =  false;
      $scope.agentcode = '';
      $scope.agentname = '';
      $scope.addAgent = function(){
        var data = {};
        data.token = "5pOUIJKuXNJ7hCs04udBRlBu5kpEXL5VjOGO67sUkuULClei8y1eyliYfsi1jF2K";
        data.code = $scope.agentcode ;
        data.name = $scope.agentname ;
        if(data.code == "" || data.name == ""){
          $scope.errorflag =  true;
    
        }
        else{  
          $http({
            method  : 'POST',
            url     : 'http://zaitoon.online/services/addagent.php',
            data    : data, //forms user object
            headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
           })
           .then(function(response) {
              window.location.reload();
            });
        }
        //
      }

      $scope.removeAgent = function(code){
        var data = {};
        data.token = "5pOUIJKuXNJ7hCs04udBRlBu5kpEXL5VjOGO67sUkuULClei8y1eyliYfsi1jF2K";
        data.code = code;
        $http({
          method  : 'POST',
          url     : 'http://zaitoon.online/services/removeagent.php',
          data    : data, //forms user object
          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
         })
         .then(function(response) {
          window.location.reload();
          });

      }
	})

  ;

    