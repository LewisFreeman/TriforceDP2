<!DOCTYPE html>
<html lang="en" data-ng-app="myApp">
  <head>
    <title>POS</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <!-- Custom stylesheet -->
    <link href="css/styles.css" rel="stylesheet" />
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
    <!-- Custom controller -->
    <script src="js/POSController.js"></script>
  </head>
  <body>
    <div class="container" data-ng-controller="myCtrl">
      <nav class="navbar navbar-default">
        <div class="contianer navbar-container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1">
              <span class="sr-only">Toggle Navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <!-- Banner item (may replace with logo at later point) -->
            <a class="navbar-brand" href="#">PHP-SRePS</a>
          </div>
        </div>
        <div class="collapse navbar-collapse" id="navbar-collapse-1">
          <!-- Nav bar items list -->
          <ul class="nav navbar-nav">
            <li><a href="Home.html">Home </a></li>
            <li><a href="Reports.html">Reports</a></li>
            <li class="active"><a href="POS.html">POS</a></li>
            <li><a href="Sales.html">Sales Records</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#">Log In</a></li>
          </ul>
        </div>
      </nav>
      <div class="row">
        <h1>Checkout</h1>
      </div>
      <div class="row well">
        <div class="col-lg-6">
          <div class="row">
            <div class="col-lg-12">
              <!-- Border-bottom is a custom style class -->
              <h3 class="border-bottom">Cart</h3>
              <br>
              <!-- "Nothing here yet" will only display if the cart is empty -->
              <div class="text-center" ng-show="Cart.length == 0">
                <p>Nothing here yet</p>
              </div>
              <!-- Add a row foreach object in the cart array -->
              <!-- Display the name, amount and price of each -->
              <div class="row" ng-repeat="c in Cart">
                <div class="col-xs-5 col-sm-3 col-lg-3 border-right text-center">
                  <p>{{c.name}}</p>
                </div>
                <div class="col-xs-2 col-sm-2 col-lg-2 border-right text-center">
                  <p>x{{c.amount}}</p>
                </div>
                <div class="col-xs-5 col-sm-2 col-lg-2 border-right text-center">
                  <p>${{c.price}}</p>
                </div>
                <div class="col-xs-offset-6 col-sm-offset-8 col-lg-offset-8">
                  <p>
                    <!-- Delete button to remove items from the cart -->
                    <button type="button" class="btn btn-danger" ng-click="Delete(c)">Delete</button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="row row well">
            <div class="col-lg-12">
              <div class="row">
                <div class="col-lg-12">
                  <h3 class="border-bottom">Add Cart Items</h3>
                  <br>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <!-- Drop down list of items -->
                  <!-- Loaded from the Items array in the controller -->
                  <label for="Item">Select Item:</label>
                  <select class="form-control" id="Item" data-ng-model="Item">
                    <option ng-repeat="i in Items" value="{{i.name}}">{{i.name}}</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <!-- Number input for the amount of items required -->
                  <label for="Number" class="col-2 col-form-label">Number</label>
                  <input class="form-control" type="number" value="1" id="Number" data-ng-model="Number">
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <br>
                  <!-- Error message output (will only show if error has a value, default is null) -->
                  <p class="text-danger">{{error}}</p>
                  <!-- Add button will put the selected values into the cart array to be displayed and checkedout -->
                  <!-- Discard will clear the input fields -->
                  <button type="button" class="btn btn-danger btn-md" ng-click="Item = null; Number = null">Discard</button>
                  <button type="button" class="btn btn-success btn-md" ng-click="Add(Item, Number)">Add</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row row well">
        <div class="col-sm-4 col-lg-4 text-center">
          <!-- Outputs the total amount by calling the GetTotal function in the controller -->
          <p class="total">Total Amount = ${{GetTotal()}}</p>
        </div>
        <div class="col-sm-4 col-lg-4 text-center border-right border-left">
          <!-- Clear button will clear all fields and use the ClearAll function in the controller to empty the cart-->
          <button type="button" class="btn btn-danger btn-lg" ng-click="Item = null; Number = null; ClearAll()">Clear All</button>
        </div>
        <div class="col-sm-4 col-lg-4 text-center">
          <!-- Checkout button will add the cart items to the database -->
          <button type="button" class="btn btn-success btn-lg" ng-click="Checkout()">Checkout</button>
        </div>
      </div>
    </div>
    <!-- Scripts used -->
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/angular.min.js"></script>
    <script src="js/POSController.js"></script>
  </body>
</html>

