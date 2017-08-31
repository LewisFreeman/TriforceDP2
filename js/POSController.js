var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
  $scope.Cart = [];
  $scope.total = 0;
  $http.get("data/item.json")
  .then(function(response) {
      $scope.Items = response.data;
  });

  $scope.Add = function (Item, Number) {
    for (i = 0; i < $scope.Items.length; i++)
      {
        if ($scope.Items[i].name == Item)
          {
            $scope.price = $scope.Items[i].price * Number;
          }
      }
    $scope.Cart.push({name: Item, amount: Number, price: $scope.price});
    $scope.total += $scope.price;
  };

  $scope.GetName = function (Item) {
    return Item.name;
  };
});
