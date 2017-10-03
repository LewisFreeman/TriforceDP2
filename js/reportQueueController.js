
//var myApp = angular.module('PHPSRePS', []);
myApp.controller('reportQueueController', function ($scope, $http)
{
  $scope.itemReports = [];

  //get low stock reports
  $http({
    method: 'GET',
    url: 'php/getItemReports.php'
  }).then(function successCallback(response) {
    $scope.itemReports = response.data;

  }, function errorCallback(response) {
    console.log(response);
    console.log("ERROR: Could not find getItemReports.php");
  });

  $scope.itemReports = [];
});

