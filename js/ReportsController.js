var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope, $http) {

  $scope.Months = [];
  $http.get("data/Months.json")
    .then(function (response) {
      $scope.Months = response.data;
    });

  $scope.Weeks = [];
  $http.get("data/Weeks.json")
    .then(function (response) {
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
  };

  $scope.Refresh = function () {
    $scope.report = 0;
    $scope.purchased = 0;
    $scope.diff = 0;
    $scope.profit = 0;
    $scope.stock = 0;
  };

  var currentTime = new Date();
  $scope.Year = currentTime.getFullYear();
  $scope.salesRecords = [];
  $scope.GetRecords();
  $scope.Items = [];
  $scope.FillItems();
  $scope.info = "Enter filters to generate report";
  $scope.Refresh();
  $scope.itemsOut = "False";

  $scope.GenerateReport = function (Month, Week, Year, Item) {
    $scope.Refresh();
    $scope.Error = "";
    $scope.Error = $scope.Validate($scope.Error, Month, Year, Item);
    if ($scope.Error == "") {
      $scope.calulateItemRunout(Month, Item);
      $scope.stock = $scope.GetStock(Item);
      if (Week == null) {
        $scope.purchased = $scope.GetMonthPurchase(Month, Year, Item);
        $scope.diff = $scope.GetMonthDiff(Month, Year, Item);
        $scope.profit = $scope.MonthProfit(Month, Year, Item);
      } else {
        $scope.purchased = $scope.GetWeekPurchase(Month, Week, Year, Item);
        $scope.diff = $scope.GetWeekDiff(Month, Week, Year, Item);
        $scope.profit = $scope.WeekProfit(Month, Week, Year, Item);
      }
      if ($scope.stock < 500) {
        alert("Reminder, Low on stock please restock soon");
        document.getElementById('stock').style.color = 'red';
      }
      $scope.report = 1;
    } else {
      $scope.Error = "Error: " + $scope.Error;
    }
  };


  $scope.GetMonthPurchase = function (Month, Year, Item) {
    var Stock = 0;
    for (var i = 0; i < $scope.salesRecords.length; i++) {
      if (($scope.GetMonthNumber(Month) == $scope.GetMonthNumberForRecord($scope.salesRecords[i].Date)) && ($scope.salesRecords[i].ItemName == Item) && (Year.toString() == $scope.GetYearNumberForRecord($scope.salesRecords[i].Date))) {
        Stock += $scope.salesRecords[i].Quantity;
      }
    }
    return Stock;
  };

  $scope.GetWeekPurchase = function (Month, Week, Year, Item) {
    var Stock = 0;
    for (var i = 0; i < $scope.salesRecords.length; i++) {
      if (($scope.GetMonthNumber(Month) == $scope.GetMonthNumberForRecord($scope.salesRecords[i].Date)) && ($scope.salesRecords[i].ItemName == Item) && ($scope.CheckWeek(Week, $scope.GetDayNumberForRecord($scope.salesRecords[i].Date))) && (Year.toString() == $scope.GetYearNumberForRecord($scope.salesRecords[i].Date))) {
        Stock += $scope.salesRecords[i].Quantity;
      }
    }
    return Stock;
  };

  $scope.GetMonthDiff = function (Month, Year, Item) {
    PrevStock = $scope.GetMonthPurchase($scope.GetPrevMonth(Month), $scope.CheckPrevYear(Month, Year), Item);
    CurrStock = $scope.GetMonthPurchase(Month, Year, Item);
    if (PrevStock != 0) {
      return (CurrStock - PrevStock) / Math.abs(PrevStock) * 100;
    } else {
      return 0;
    }
  };

  $scope.GetWeekDiff = function (Month, Week, Year, Item) {
    PrevStock = $scope.GetWeekPurchase($scope.CheckPrevMonth(Month, Week), $scope.GetPrevWeek(Week), $scope.CheckPrevYearWeek(Week, Month, Year), Item);
    CurrStock = $scope.GetWeekPurchase(Month, Week, Year, Item);
    if (PrevStock != 0) {
      return (CurrStock - PrevStock) / Math.abs(PrevStock) * 100;
    } else {
      return 0;
    }
  };

  $scope.MonthProfit = function (Month, Year, Item) {
    var Sales = 0;
    for (var i = 0; i < $scope.salesRecords.length; i++) {
      if (($scope.GetMonthNumber(Month) == $scope.GetMonthNumberForRecord($scope.salesRecords[i].Date)) && ($scope.salesRecords[i].ItemName == Item) && (Year.toString() == $scope.GetYearNumberForRecord($scope.salesRecords[i].Date))) {
        Sales += $scope.salesRecords[i].Price;
      }
    }
    return Sales;
  };

  $scope.WeekProfit = function (Month, Week, Year, Item) {
    var Sales = 0;
    for (var i = 0; i < $scope.salesRecords.length; i++) {
      if (($scope.GetMonthNumber(Month) == $scope.GetMonthNumberForRecord($scope.salesRecords[i].Date)) && ($scope.salesRecords[i].ItemName == Item) && ($scope.CheckWeek(Week, $scope.GetDayNumberForRecord($scope.salesRecords[i].Date))) && (Year.toString() == $scope.GetYearNumberForRecord($scope.salesRecords[i].Date))) {
        Sales += $scope.salesRecords[i].Price;
      }
    }
    return Sales;
  };

  $scope.GetPrevMonth = function (Month) {
    if (Month == "January") {
      return "December";
    }
    for (var i = 0; i < $scope.Months.length; i++) {
      if (Month == $scope.Months[i].name) {
        return $scope.Months[i - 1].name;
      }
    }
    return null;
  };

  $scope.GetPrevWeek = function (Week) {
    var PrevWeek = "";
    switch (Week) {
      case "Week1":
        PrevWeek = "Week4";
        break;
      case "Week2":
        PrevWeek = "Week1";
        break;
      case "Week3":
        PrevWeek = "Week2";
        break;
      case "Week4":
        PrevWeek = "Week3";
        break;
    }
    return PrevWeek;
  };

  $scope.CheckPrevYear = function (Month, Year) {
    if (Month == "January") {
      return Year - 1;
    }
    return Year;
  };

  $scope.CheckPrevYearWeek = function (Week, Month, Year) {
    if ((Month == "January") && (Week == "Week1")) {
      return Year - 1;
    }
    return Year;
  };

  $scope.CheckPrevMonth = function (Month, Week) {
    if (Week == "Week1") {
      return $scope.GetPrevMonth(Month);
    }
    return Month;
  };

  $scope.GetStock = function (Item) {
    var index = $scope.Items.findIndex(x => x.ItemName === Item);
    return $scope.Items[index].Stock;
  };

  $scope.GetMonthNumber = function (Month) {
    for (var i = 0; i < $scope.Months.length; i++) {
      if (Month == $scope.Months[i].name) {
        return $scope.Months[i].number;
      }
    }
    return null;
  };

  $scope.GetMonthNumberForRecord = function (Date) {
    var parts = Date.split("-");
    return parts[1];
  };

  $scope.GetDayNumberForRecord = function (Date) {
    var parts = Date.split("-");
    return parts[2];
  };

  $scope.GetYearNumberForRecord = function (Date) {
    var parts = Date.split("-");
    return parts[0];
  };

  $scope.GetWeek = function (Week) {
    var days = [];
    switch (Week) {
      case "Week1":
        days = [1, 7];
        break;
      case "Week2":
        days = [8, 14];
        break;
      case "Week3":
        days = [15, 21];
        break;
      case "Week4":
        days = [22, 31];
        break;
    }
    return days;
  };

  $scope.CheckWeek = function (Week, RecordWeek) {
    var days = $scope.GetWeek(Week);
    for (var i = days[0]; i < days[1] + 1; i++) {
      if (RecordWeek == $scope.LeadingZero(i.toString())) {
        return true;
      }
    }
    return false;
  };

  $scope.LeadingZero = function (Value) {
    if (Value < 10) {
      Value = "0" + Value;
    }
    return Value;
  };

  $scope.Validate = function (Message, Month, Year, Item) {
    if (Month == null) {
      Message += "You must select a month";
    }
    if (Item == null) {
      if (Message != "") {
        Message += " & ";
      }
      Message += "You must select an item";
    }
    if (Year == null) {
      if (Message != "") {
        Message += " & ";
      }
      Message += "You must select a year";
    }
    if ((Year < 2000) || (Year > currentTime.getFullYear())) {
      if (Message != "") {
        Message += " & ";
      }
      Message += "You must select a valid year";
    }
    return Message;
  };

  //calculates the estimated point stock will run out based on 
  //  the three month average num purchases
  $scope.calulateItemRunout = function (month, item) {
    var monthNames = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"];

    var currentDate = new Date();

    var currentMonth = currentDate.getMonth();
    var currentStock = $scope.GetStock(item);
    var monthsToCount = 3;

    //total sales over period
    var totalOverTimePeriod = 0;
    for (var i = currentMonth; i > (currentMonth - monthsToCount); i--) {
      totalOverTimePeriod += $scope.GetMonthPurchase(monthNames[i], $scope.Year, item);
    }

    //item count does not deplete, but if more purchased made than item stock...
    if (currentStock <= 0 || (currentStock - $scope.purchased) <= 0) {
      $scope.itemsOut = "Out of Stock!";
      return;
    }
    
    //otherwise if no records over period or months not set
    if (monthsToCount === 0 || totalOverTimePeriod === 0)
      $scope.itemsOut = "Unknown";

    //else estiamte
    $scope.itemsOut = (currentStock / (totalOverTimePeriod / monthsToCount));
  };
});
