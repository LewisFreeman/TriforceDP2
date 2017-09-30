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

  $scope.salesRecords = [];
  $scope.GetRecords();
  $scope.Items = [];
  $scope.FillItems();
  $scope.info = "Enter filters to generate report";
  $scope.report = 0;

  $scope.GenerateReport = function (Month, Week, Item) {
    $scope.Error = "";
    $scope.Error = $scope.Validate($scope.Error, Month, Item);
    if ($scope.Error == "")
    {
      $scope.report = 1;
    }
    else
    {
      $scope.Error = "Error: " + $scope.Error;
    }
  };

  $scope.GetMonthPurchase = function (Month, Item) {
    Stock = 0;
    for (var i = 0; i < $scope.salesRecords.length; i++)
      {
        if (($scope.GetMonthNumber(Month) == $scope.GetMonthNumberForRecord($scope.salesRecords[i].Date))&& ($scope.salesRecords[i].ItemName == Item))
          {
            Stock += $scope.salesRecords[i].Quantity;
          }
      }
    return Stock;
  };

  $scope.GetMonthChange = function (Month, Item) {
    PrevStock = $scope.GetMonthPurchase($scope.GetPrevMonth(Month), Item);
    CurrStock = $scope.GetMonthPurchase(Month, Item);
    if (PrevStock != 0)
      {
        return (CurrStock - PrevStock)/Math.abs(PrevStock) * 100
      }
    else
      {
        return "-";
      }
  };

  $scope.MonthProfit = function (Month, Item) {
    Profit = 0;
    for (var i = 0; i < $scope.salesRecords.length; i++)
      {
        if (($scope.GetMonthNumber(Month) == $scope.GetMonthNumberForRecord($scope.salesRecords[i].Date))&& ($scope.salesRecords[i].ItemName == Item))
          {
            Profit += $scope.salesRecords[i].Price;
          }
      }
    return Profit;
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

