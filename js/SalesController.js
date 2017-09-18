console.log("sales controller loaded");
var myApp = angular.module('PHPSRePS', []);


myApp.controller('salesRecordsController', function ($scope, $http) 
{
  console.log("controller scope start");
	
  $scope.salesRecords = [];

  $scope.sortAttri = "saleNumber";
  $scope.sortReverse = false;
  $scope.sortBy = function(btn)
  {
    $scope.sortReverse=($scope.sortAttri==btn)?!$scope.sortReverse:false;
	$scope.sortAttri=btn;
  }


  $http({
    method: 'GET',
    url: 'php/getSalesRecords.php'
  }).then(function successCallback(response) {
    $scope.salesRecords = response.data;
    console.log("response received from getSalesRecords");
    console.log($scope.salesRecords);
	  
  }, function errorCallback(response) {
    console.log("no response recieved");
	  
  });
	
  console.log("controller scope end");
});

console.log("sales controller end");
