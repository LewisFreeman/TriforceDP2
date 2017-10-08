var app = angular.module('myApp', []);


app.controller('myCtrl', function($scope, $window, $http) {

  //Get the months data from the file and fill the array
  $scope.Months = [];
  $http.get("data/Months.json")
    .then(function (response) {
      $scope.Months = response.data;
    });

  //Get the weeks data from the file and fill the array
  $scope.Weeks = [];
  $http.get("data/Weeks.json")
    .then(function (response) {
      $scope.Weeks = response.data;
    });

  //Get items data from db to fill the array
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

  //Get the sales records from the db and fill the array
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

  //Refresh the outputs
  $scope.Refresh = function () {
    $scope.report = 0;
    $scope.purchased = 0;
    $scope.diff = 0;
    $scope.profit = 0;
    $scope.stock = 0;
  };

  //Initialize values
  $scope.FilterPanel = false;
  var currentTime = new Date();
  $scope.Year = currentTime.getFullYear();
  $scope.salesRecords = [];
  $scope.GetRecords();
  $scope.Items = [];
  $scope.FillItems();
  $scope.info = "Enter filters to generate report";
  $scope.Refresh();
  $scope.itemsOut = "False";

  //Main report generation function
  $scope.GenerateReport = function (Month, Week, Year, Item) {
    //Refresh values from old report
    $scope.Refresh();
    //Validates input
    $scope.Error = "";
    $scope.Error = $scope.Validate($scope.Error, Month, Year, Item);
    if ($scope.Error == "") {
      $scope.calulateItemRunout(Month, Item);
      $scope.stock = $scope.GetStock(Item);
      //Branches based on week input to display monthly or weekly report
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
      //If validation failed, display error
      $scope.Error = "Error: " + $scope.Error;
    }
  };

  //Get the number of given item purchased in given month
  $scope.GetMonthPurchase = function (Month, Year, Item) {
    var Stock = 0;
    //Loop through the records
    for (var i = 0; i < $scope.salesRecords.length; i++) {
      //If months match, items match and year matches
      if (($scope.GetMonthNumber(Month) == $scope.GetMonthNumberForRecord($scope.salesRecords[i].Date)) && ($scope.salesRecords[i].ItemName == Item) && (Year.toString() == $scope.GetYearNumberForRecord($scope.salesRecords[i].Date))) {
        //Add the quantity
        Stock += $scope.salesRecords[i].Quantity;
      }
    }
    return Stock;
  };

  //Get the number of given item purchased in given week
  $scope.GetWeekPurchase = function (Month, Week, Year, Item) {
    var Stock = 0;
    //Loop through the records
    for (var i = 0; i < $scope.salesRecords.length; i++) {
      //If weeks match, months match, items match and year matches
      if (($scope.GetMonthNumber(Month) == $scope.GetMonthNumberForRecord($scope.salesRecords[i].Date)) && ($scope.salesRecords[i].ItemName == Item) && ($scope.CheckWeek(Week, $scope.GetDayNumberForRecord($scope.salesRecords[i].Date))) && (Year.toString() == $scope.GetYearNumberForRecord($scope.salesRecords[i].Date))) {
        //Add the quantity
        Stock += $scope.salesRecords[i].Quantity;
      }
    }
    return Stock;
  };

  //Get the difference in purchase number from last month
  $scope.GetMonthDiff = function (Month, Year, Item) {
    //Get previous months purchase amount
    PrevStock = $scope.GetMonthPurchase($scope.GetPrevMonth(Month), $scope.CheckPrevYear(Month, Year), Item);
    //Get this months purchase amount
    CurrStock = $scope.GetMonthPurchase(Month, Year, Item);
    //If previous month had 0 sales, then return 100 as it would cause a /0 error
    if (PrevStock != 0) {
      return (CurrStock - PrevStock) / Math.abs(PrevStock) * 100;
    } else {
      return 0;
    }
  };

  //Get the difference in purchase number from last week
  $scope.GetWeekDiff = function (Month, Week, Year, Item) {
    //Get previous weeks purchase amount
    PrevStock = $scope.GetWeekPurchase($scope.CheckPrevMonth(Month, Week), $scope.GetPrevWeek(Week), $scope.CheckPrevYearWeek(Week, Month, Year), Item);
    //Get this weeks purchase amount
    CurrStock = $scope.GetWeekPurchase(Month, Week, Year, Item);
    //If previous week had 0 sales, then return 100 as it would cause a /0 error
    if (PrevStock != 0) {
      return (CurrStock - PrevStock) / Math.abs(PrevStock) * 100;
    } else {
      return 0;
    }
  };

  //Get the months profit
  $scope.MonthProfit = function (Month, Year, Item) {
    var Sales = 0;
    //Loop through records
    for (var i = 0; i < $scope.salesRecords.length; i++) {
      //if months match, items match and years match
      if (($scope.GetMonthNumber(Month) == $scope.GetMonthNumberForRecord($scope.salesRecords[i].Date)) && ($scope.salesRecords[i].ItemName == Item) && (Year.toString() == $scope.GetYearNumberForRecord($scope.salesRecords[i].Date))) {
        //Add price
        Sales += $scope.salesRecords[i].Price;
      }
    }
    return Sales;
  };

  //Get the weeks profit
  $scope.WeekProfit = function (Month, Week, Year, Item) {
    var Sales = 0;
    //Loop through records
    for (var i = 0; i < $scope.salesRecords.length; i++) {
      //if weeks match, months match, items match and years match
      if (($scope.GetMonthNumber(Month) == $scope.GetMonthNumberForRecord($scope.salesRecords[i].Date)) && ($scope.salesRecords[i].ItemName == Item) && ($scope.CheckWeek(Week, $scope.GetDayNumberForRecord($scope.salesRecords[i].Date))) && (Year.toString() == $scope.GetYearNumberForRecord($scope.salesRecords[i].Date))) {
        //Add price
        Sales += $scope.salesRecords[i].Price;
      }
    }
    return Sales;
  };

  //Get the previous months name
  $scope.GetPrevMonth = function (Month) {
    //If january return december to avoid null pointer
    if (Month == "January") {
      return "December";
    }
    //Search the months array and return month with index-1
    for (var i = 0; i < $scope.Months.length; i++) {
      if (Month == $scope.Months[i].name) {
        return $scope.Months[i - 1].name;
      }
    }
    return null;
  };

  //Get the name of the previous week (week1->week4)
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

  //Check if previous year is necessary (e.g. if month = January then return previous year)
  $scope.CheckPrevYear = function (Month, Year) {
    if (Month == "January") {
      return Year - 1;
    }
    return Year;
  };

  //Same as above but takes week into the equation as well
  $scope.CheckPrevYearWeek = function (Week, Month, Year) {
    if ((Month == "January") && (Week == "Week1")) {
      return Year - 1;
    }
    return Year;
  };

  //Similar to prev year function, however checks the month based on week
  $scope.CheckPrevMonth = function (Month, Week) {
    if (Week == "Week1") {
      return $scope.GetPrevMonth(Month);
    }
    return Month;
  };

  //Return the current stock of an item
  $scope.GetStock = function (Item) {
    var index = $scope.Items.findIndex(x => x.ItemName === Item);
    return $scope.Items[index].Stock;
  };

  //Return the number (1-12) of a month
  $scope.GetMonthNumber = function (Month) {
    for (var i = 0; i < $scope.Months.length; i++) {
      if (Month == $scope.Months[i].name) {
        return $scope.Months[i].number;
      }
    }
    return null;
  };

  //The three following functions just return a value from the db records date
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

  //Return the days associated with a given week
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

  //Check if a given day falls within a given week
  $scope.CheckWeek = function (Week, RecordWeek) {
    var days = $scope.GetWeek(Week);
    for (var i = days[0]; i < days[1] + 1; i++) {
      if (RecordWeek == $scope.LeadingZero(i.toString())) {
        return true;
      }
    }
    return false;
  };

  //Add the leading 0 to a value
  $scope.LeadingZero = function (Value) {
    if (Value < 10) {
      Value = "0" + Value;
    }
    return Value;
  };

  //Validate filter inputs
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

  //Check the window size, if return true if mobile sized
  $scope.Window = function () {
    if ($window.innerWidth <= 768)
      {
        return true;
      }
    return false;
  };

  //Switch the active panel, only callable by buttons shown to mobile users
  $scope.Filter = function () {
    $scope.FilterPanel = true;
  };

  $scope.ExportCSV = function(Item,Year,Month,Week){
    var text;
    var MorW = Week;
    if(!Week)
    {
      Week = 'N/A';
      MorW = Month;
    }
    $scope.calulateItemRunout(Month, Item);
    $scope.Stock   = $scope.GetStock(Item);
    $scope.Sold    = $scope.GetMonthPurchase(MorW, Year, Item);
    $scope.Changes = $scope.GetMonthDiff(MorW, Year, Item).toFixed(2);
    $scope.Profit  = $scope.MonthProfit(MorW, Year, Item).toFixed(2);
    $scope.Predict = $scope.itemsOut.toFixed(2);
    text = Item + ',' + Year + ',' + Month + ',' + Week + ','
         + '$' + $scope.Profit + ',' + $scope.Stock + ' units' + ','
         + $scope.Sold + ' units' + ',' + $scope.Changes + '%' + ','
         + $scope.Predict + ' months\n';
    //window.alert(text);
    filename = 'SalesReport.csv';
    if(!text.match(/^data:text\/csv/i))
    {
        text = 'data:text/csv;charset=utf-8,'
             + 'Items,Year,Month,Week,Profit,Current Stock,Sold,Changes,Stockout Prediction\n'
             + text;
    }
    var data;
    data = encodeURI(text);
    link = document.createElement('a');
    link.setAttribute('href',data);
    link.setAttribute('download',filename);
    link.click();
  };

  $scope.ExportAllCSV = function(Year,Month,Week){
    if (Month == null)
    {
        $scope.Error = "Error: You must select a month";
    }
    else if((Year < 2000)||(Year > currentTime.getFullYear()))
    {
        $scope.Error = "Error: Invalid Year Input";
    }
    else
    {
        var text = "";
        var MorW = Week;
        if(!Week)
        {
            Week = 'N/A';
            MorW = Month;
        }
        angular.forEach($scope.Items,function(value,key)
        {
            var Item = value.ItemName;
            $scope.calulateItemRunout(Month, Item);
            $scope.Stock   = $scope.GetStock(Item);
            $scope.Sold    = $scope.GetMonthPurchase(MorW, Year, Item);
            $scope.Changes = $scope.GetMonthDiff(MorW, Year, Item).toFixed(2);
            $scope.Profit  = $scope.MonthProfit(MorW, Year, Item).toFixed(2);
            $scope.Predict = $scope.itemsOut.toFixed(2);
            text += Item           + ',' +  $scope.Profit  + ','
                 +  $scope.Stock   + ',' +  $scope.Sold    + ','
                 +  $scope.Changes + ',' +  $scope.Predict + '\n';
            filename = 'SalesReport.csv';
            if(!text.match(/^data:text\/csv/i))
            {
                text = 'data:text/csv;charset=utf-8,'
                     + 'PHP-SRePS Report\n'
                     + 'Year : ' + Year + '\n'
                     + 'Month: ' + Month + '\n'
                     + 'Week : ' + Week + '\n'
                     + 'Items,Profit ($),Current Stock (units),Sold (units),Changes (%),Stockout Prediction (months)\n'
                     + text;
            }
        });
        //window.alert(text);
        var data;
        data = encodeURI(text);
        link = document.createElement('a');
        link.setAttribute('href',data);
        link.setAttribute('download',filename);
        link.click();
    }
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
