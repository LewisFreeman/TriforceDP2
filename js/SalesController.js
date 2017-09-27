console.log("sales controller loaded");
var myApp = angular.module('PHPSRePS', []);
myApp.controller('salesRecordsController', function ($scope, $http)
{
  console.log("controller scope start");

  $scope.Items = [];
  //Get the values to fill the drop down from the db
  $http({
    method: 'GET',
    url: 'php/getItems.php'
  }).then(function successCallback(response) {
    $scope.Items = response.data;
  }, function errorCallback(response) {
    console.log("ERROR: Could not find getItems.php");
  });

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
    $scope.UpdateError = "";
    if ($scope.Validate(Date))
      {
        $http.post(
          "php/updateRecords.php",
          {'ID':Number, 'Name':Name, 'Quantity':Quantity, 'Date':Date, 'Price':Price}
        )
      }
    else
      {
        $scope.UpdateError = "Error: Date not valid, ensure it matches a yyyy-mm-dd pattern";
      }
  };

  $scope.Validate = function (Date) {
    result = false;
    result = /(\d){4}(-(\d){2}){2}/.test(Date);
    return result;
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
