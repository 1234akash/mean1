var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope,$http) {
    

    $scope.initialize=function(){
      $http.get('/contactList')
      .then(function(response){
       $scope.employees=response.data; 
      });
    }

    /*$scope.cleardata = function(){
      $scope.initialize();
    }*/

  $scope.initial = [{
    name:"",
    email:"",
    number:""
  }];
  $scope.cleardata = function () {
    $scope.employee = angular.copy($scope.initial);
  }  
    /*$scope.employees=$http.get('/contactList')
      .then(function(response){
       $scope.employees=response.data; 
      });*/

    /*$scope.remove = function(id){
      $http.delete('/contactList/' + id).success(function(response){

    });
  };*/

  $scope.remove = function(id){
    console.log(id);
    $http.delete('/contactList/'+id).then(function(response){
      console.log('deleted');
      $scope.initialize();
    });
  }

    
    $scope.addcontact = function(){ 
      $http.post('/contactList',$scope.employee).then(function(response){
       console.log('inside controller');
       $scope.initialize();
    })
  }

    $scope.updatedata = function(id){
    $http.get('/contactList/'+id).then(function(response){
       $scope.employee=response.data;
    });
  }
   
   $scope.updatedata1 = function(id){
    console.log($scope.employee);
     $http.post('/contactUpdate',$scope.employee).then(function(response){
       console.log(response);  
       $scope.initialize();
    }) 
   }

});
 