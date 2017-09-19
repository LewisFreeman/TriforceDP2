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

  $scope.Search = function (ID) {
    $scope.Error = "";
    var index = $scope.salesRecords.findIndex(x=>x.TransactionID === ID);
    if (index == -1)
      {
        $scope.Error = "ERROR: invalid transaction ID";
      }
    else
      {
        $scope.Quantity = $scope.salesRecords[index].Quantity;
        $scope.Name = $scope.salesRecords[index].ItemName;
        $scope.Date = $scope.salesRecords[index].Date;
        $scope.Price = $scope.salesRecords[index].Price;
      }
  };

  $scope.Update = function (Number, Name, Quantity, Date, Price) {
    $http.post(
        "php/updateRecords.php",
        {'ID':Number, 'Name':Name, 'Quantity':Quantity, 'Date':Date, 'Price':Price}
      )
  };

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
