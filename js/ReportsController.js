var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {
  $scope.Months = [];
  $http.get("data/Months.json")
  .then(function(response) {
      $scope.Months = response.data;
  });

  $scope.Weeks = [];
  $http.get("data/Weeks.json")
  .then(function(response) {
      $scope.Weeks = response.data;
  });

  $scope.FillItems = function () {
    $http({
      method: 'GET',
      url: 'php/getItems.php'
    }).then(function successCallback(response) {
      $scope.Items = response.data;
    }, function errorCallback(response) {
      console.log("ERROR: Could not find getItems.php");
    });
  };

  $scope.Items = [];
  $scope.FillItems();
  $scope.info = "Enter filters to generate report";
  $scope.report = 0;

  $scope.GenerateReport = function (Month, Week, Item) {
    $scope.report = 1;
  };
});

