var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {

  //Initialize the cart array on page startup
  $scope.Cart = [];
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

  //Function called to add items from the input fields to the cart
  $scope.Add = function (Item, Number) {

    //Initialize error to a null value
    $scope.error = "";
    //Check that the input fields are not empty/valid
    if (Item == null || Number == 0 || Number == null || Number % 1 != 0)
      {
        //If invalid then set error
        $scope.error = "Error: Invalid input, please check that fields contain values & values must be whole numbers!";
      }
    else
      {
        //If valid then retrieve the price of the requested item from the items array
        var price = $scope.GetPrice(Item, Number);

        var id = $scope.GetId(Item);

        //Check to see if the cart already contains an entry for the item requested
        var index = $scope.Cart.findIndex(x=>x.name === Item);

        //If the index is -1 then it was not found, if any other value then the cart already contains and entry for the item
        if (index == -1)
          {
            //Users must request a positive number of items
            if (Number > 0)
              {
                //Add the item to the cart
                $scope.Cart.push({id: id, name: Item, amount: Number, price: price});
              }
            else
              {
                //If a negative or 0 is requested spit back an error
                $scope.error = "Error: Negative purchase being applied to non-existent cart item";
              }
          }
        else
          {
            //The cart already contains an entry for this item
            if ($scope.Cart[index].amount + Number < 1)
              {
                //If the new value of the item would make the total requested item number 0 or less
                //Remove the entry from the cart
                $scope.Cart.splice(index, 1);
              }
            else
              {
                //If the request amount would not put the entry to 0 or negative then update it
                $scope.Cart[index].amount += Number;
                $scope.Cart[index].price += price;
              }
          }
      }
  };

  //Called from the html to display the total price of all cart items
  $scope.GetTotal = function () {
    //Initialize price to 0
    var totalprice = 0;

    //For each item, add it's price to the total
    for (i = 0; i < $scope.Cart.length; i++)
      {
        totalprice += $scope.Cart[i].price;
      }

    //Return the total
    return totalprice;
  };

  //Utility function to return the price of a item in the items array
  $scope.GetPrice = function (Item, Number) {
    var index = $scope.Items.findIndex(x=>x.ItemName === Item);

    //Multiplies the price found by the number of item requested
    var price = $scope.Items[index].Price * Number;
    return price;
  };

  $scope.GetId = function (Item) {
    var index = $scope.Items.findIndex(x=>x.ItemName === Item);
    var id = $scope.Items[index].id;
    return id;
  };

  //Called from the html to remove an item from the cart array
  $scope.Delete = function (Item) {
    $scope.Cart.splice($scope.Cart.indexOf(Item), 1);
  };

  //Called from the html to clear the cart
  $scope.ClearAll = function () {
    $scope.Cart = [];
    $scope.error = "";
  };

  $scope.Checkout = function(){
    console.log("Checkout clicked");

      for(i = 0; i < $scope.Cart.length; i++)
      {
        $http.post(
          "php/insert.php",
          {'cartSize':$scope.Cart.length, 'item':$scope.Cart[i].name, 'amount':$scope.Cart[i].amount, 'price':$scope.Cart[i].price }
        )
      }
  };
});
