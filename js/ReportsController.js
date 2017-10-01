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

  $scope.GetRecords = function () {
    $http({
      method: 'GET',
      url: 'php/getSalesRecords.php'
    }).then(function successCallback(response) {
      $scope.salesRecords = response.data;
    }, function errorCallback(response) {
      console.log("ERROR: no response recieved");
    });
  }

  $scope.Refresh = function () {
    $scope.report = 0;
    $scope.purchased = 0;
    $scope.diff = 0;
    $scope.profit = 0;
  };

  $scope.salesRecords = [];
  $scope.GetRecords();
  $scope.Items = [];
  $scope.FillItems();
  $scope.info = "Enter filters to generate report";
  $scope.Refresh();

  $scope.GenerateReport = function (Month, Week, Item) {
    $scope.Refresh();
    $scope.Error = "";
    $scope.Error = $scope.Validate($scope.Error, Month, Item);
    if ($scope.Error == "")
    {
      if (Week == null)
        {
          $scope.purchased = $scope.GetMonthPurchase(Month, Item);
          $scope.diff = $scope.GetMonthDiff(Month, Item);
          $scope.profit = $scope.MonthProfit(Month, Item);
        }
      else
        {

        }
      $scope.report = 1;
    }
    else
    {
      $scope.Error = "Error: " + $scope.Error;
    }
  };

  $scope.GetMonthPurchase = function (Month, Item) {
    var Stock = 0;
    for (var i = 0; i < $scope.salesRecords.length; i++)
      {
        if (($scope.GetMonthNumber(Month) == $scope.GetMonthNumberForRecord($scope.salesRecords[i].Date))&& ($scope.salesRecords[i].ItemName == Item))
          {
            Stock += $scope.salesRecords[i].Quantity;
          }
      }
    return Stock
  };

  $scope.GetMonthDiff = function (Month, Item) {
    PrevStock = $scope.GetMonthPurchase($scope.GetPrevMonth(Month), Item);
    CurrStock = $scope.GetMonthPurchase(Month, Item);
    if (PrevStock != 0)
      {
        return (CurrStock - PrevStock)/Math.abs(PrevStock) * 100
      }
    else
      {
        return 100;
      }
  };

  $scope.MonthProfit = function (Month, Item) {
    var Sales = 0;
    for (var i = 0; i < $scope.salesRecords.length; i++)
      {
        if (($scope.GetMonthNumber(Month) == $scope.GetMonthNumberForRecord($scope.salesRecords[i].Date))&& ($scope.salesRecords[i].ItemName == Item))
          {
            Sales += $scope.salesRecords[i].Price;
          }
      }
    return Sales;
  };

  $scope.GetPrevMonth = function (Month) {
    for (var i = 0; i < $scope.Months.length; i++)
      {
        if (Month == $scope.Months[i].name)
          {
            return $scope.Months[i-1].name;
          }
      }
    return null;
  };

  $scope.GetStock = function (Item) {
    var index = $scope.Items.findIndex(x=>x.ItemName === Item);
    return $scope.Items[index].Stock;
  };

  $scope.GetMonthNumber = function (Month) {
    for (var i = 0; i < $scope.Months.length; i++)
      {
        if (Month == $scope.Months[i].name)
          {
            return $scope.Months[i].number;
          }
      }
    return null;
  };

  $scope.GetMonthNumberForRecord = function (Date) {
    var parts = Date.split("-");
    return parts[1];
  };

  $scope.Validate = function (Message, Month, Item) {
    if (Month == null)
      {
        Message += "You must select a month"
      }
    if (Item == null)
      {
        if (Message != "")
          {
            Message += " & "
          }
        Message += "You must select an item"
      }
    return Message;
  };
});

