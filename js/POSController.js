var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
  $scope.Cart = [];
  $http.get("data/item.json")
  .then(function(response) {
      $scope.Items = response.data;
  });

  $scope.Add = function (Item, Number) {
      alert("Medicine added to Cart");
    $scope.error = "";
    if (Item == null || Number == 0 || Number == null)
      {
        $scope.error = "Error: Invalid input, please check that fields contain values";
      }
    else
      {
        var price = $scope.GetPrice(Item, Number);
        var index = $scope.Cart.findIndex(x=>x.name === Item);
        if (index == -1)
          {
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
  };

  $scope.GetTotal = function () {
    var totalprice = 0;
    for (i = 0; i < $scope.Cart.length; i++)
      {
        totalprice += $scope.Cart[i].price;
      }
    return totalprice;
  };

  $scope.GetPrice = function (Item, Number) {
    var index = $scope.Items.findIndex(x=>x.name === Item);
    var price = $scope.Items[index].price * Number;
    return price;
  };

  $scope.Delete = function (Item) {
    $scope.Cart.splice($scope.Cart.indexOf(Item), 1);
  };

  $scope.ClearAll = function () {
    $scope.Cart = [];
    $scope.error = "";
  };
    
         $scope.Checkout = function(){  
          alert("Checkout works");
         for(i = 0; i < $scope.Cart.length; i++)
             {
               $http.post(  
                    "insert.php",  
                    {'cartSize':$scope.Cart.length, 'item':$scope.Cart[i].name, 'amount':$scope.Cart[i].amount,
                    'price':$scope.Cart[i].price }  
               ).success(function(data){  
                    alert(data);  
               });  
             }
      } 
});