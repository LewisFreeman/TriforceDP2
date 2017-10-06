console.log("sales controller loaded");
var myApp = angular.module('PHPSRePS', []);
myApp.controller('salesRecordsController', function ($scope, $window, $http)
{
  $scope.FillItems = function () {
    $http({
      method: 'GET',
      url: 'php/getItems.php'
    }).then(function successCallback(response) {
      $scope.Items = response.data;
    }, function errorCallback(response) {
      console.log("ERROR: Could not find getItems.php");
    });
  }

  $scope.FillTable = function () {
    $http({
      method: 'GET',
      url: 'php/getSalesRecords.php'
    }).then(function successCallback(response) {
      $scope.salesRecords = response.data;
    }, function errorCallback(response) {
      console.log("ERROR: no response recieved");
    });
  }

  $scope.Items = [];
  $scope.FillItems();
  $scope.salesRecords = [];
  $scope.FillTable();
  $scope.sortAttri = "saleNumber";
  $scope.sortReverse = false;
  $scope.Edit = false;

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
    $scope.UpdateError = $scope.Validate($scope.UpdateError, Date, Price, Quantity);
    if ($scope.UpdateError == "")
      {
        $http.post(
          "php/updateRecords.php",
          {'ID':Number, 'Name':Name, 'Quantity':Quantity, 'Date':Date, 'Price':Price}
        )
        //This does not update the table, possible that it is to fast and the mySQL is not updated yet?
        $scope.FillTable();
        $scope.Edit = false;
      }
    else
      {
        $scope.UpdateError = "Error: " + $scope.UpdateError;
      }
  };

  $scope.Window = function () {
    if ($window.innerWidth <= 768)
      {
        return true;
      }
    return false;
  };

  $scope.SetEdit = function () {
    $scope.Edit = true;
  };

  $scope.Validate = function (Message, Date, Price, Quantity) {
    if (!(/(\d){4}(-(\d){2}){2}/.test(Date)))
      {
        Message += "Date is not in correct format (yyyy-mm-dd)"
      }
    if (Price < 0)
      {
        if (Message != "")
          {
            Message += " & "
          }
        Message += "Price must be a positive number"
      }
    if (Quantity < 0)
      {
        if (Message != "")
          {
            Message += " & "
          }
        Message += "Quantity must be a positive number"
      }
    if (Quantity % 1 != 0)
      {
        if (Message != "")
          {
            Message += " & "
          }
        Message += "Quantity must be a whole number"
      }
    return Message;
  }
});
