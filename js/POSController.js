var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $window, $http) {

  //Function to pull info from the db to populate the items list
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

  //Initialize data
  $scope.Cart = [];
  $scope.Items = [];
  $scope.FillItems();
  $scope.Number = 1;
  $scope.Price = 0;
  $scope.CartPanel = false;

  //Function called to add items to the cart
  $scope.Add = function (Item, Number, Price) {
    //Validation of input
    $scope.error = "";
    $scope.error = $scope.Validate($scope.error, Item, Number, Price);
    if (!($scope.error == ""))
      {
        $scope.error = "Error: " + $scope.error;
      }
    else
      {
        var price = Price * Number;
        //Find the index of the item in the cart (if it does not exist in cart already index will be -1)
        var index = $scope.Cart.findIndex(x=>x.name === Item);
        if (index == -1)
          {
            //Not in cart, add it to card if number is positive
            if (Number > 0)
              {
                $scope.Cart.push({name: Item, amount: Number, price: price});
              }
            else
              {
                $scope.error = "Error: Negative purchase being applied to non-existent cart item";
              }
          }
        else
          {
            //already in cart, update cart item or remove from cart if a negative is requested
            if ($scope.Cart[index].amount + Number < 1)
              {
                $scope.Cart.splice(index, 1);
              }
            else
              {
                $scope.Cart[index].amount += Number;
                $scope.Cart[index].price += price;
              }
          }
      }
    $scope.CartPanel = false;
  };

  //Validation function
  $scope.Validate = function (Message, Item, Number, Price) {
    //Check that an item has been selected
    if (Item == null)
      {
        Message += "You must select an item"
      }
    //Check that price is positive
    if (Price < 0)
      {
        if (Message != "")
          {
            Message += " & "
          }
        Message += "Price must be a positive number"
      }
    //Check that quantity is not 0
    if (Number == 0)
      {
        if (Message != "")
          {
            Message += " & "
          }
        Message += "Quantity must not be 0"
      }
    //Check that quantity is a whole number
    if (Number % 1 != 0)
      {
        if (Message != "")
          {
            Message += " & "
          }
        Message += "Quantity must be a whole number"
      }
    return Message;
  };

  //Get the total price of all cart items
  $scope.GetTotal = function () {
    var totalprice = 0;
    //Loop through the cart and add the cost of each item
    for (i = 0; i < $scope.Cart.length; i++)
      {
        totalprice += $scope.Cart[i].price;
      }
    return totalprice;
  };

  //Delete an item from the cart
  $scope.Delete = function (Item) {
    $scope.Cart.splice($scope.Cart.indexOf(Item), 1);
  };

  //Autofill the price box
  $scope.FillPrice = function (Item) {
    var index = $scope.Items.findIndex(x=>x.ItemName === $scope.Item);
    $scope.Price = parseInt($scope.Items[index].Price);
  };

  //Clear the cart
  $scope.ClearAll = function () {
    $scope.Cart = [];
    $scope.error = "";
  };

  $scope.Window = function () {
    if ($window.innerWidth <= 768)
      {
        return true;
      }
    return false;
  };

  $scope.OpenCartPanel = function () {
    $scope.CartPanel = true;
  };

  //Add cart items to the db
  $scope.Checkout = function(){
    console.log("Checkout clicked");
    for(i = 0; i < $scope.Cart.length; i++)
    {
      $http.post(
        "php/insert.php",
        {'cartSize':$scope.Cart.length, 'item':$scope.Cart[i].name, 'amount':$scope.Cart[i].amount, 'price':$scope.Cart[i].price }
      )
    }
    alert("Checkout Success");
    $scope.ClearAll();
  };
});
