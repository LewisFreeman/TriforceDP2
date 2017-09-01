var myApp = angular.module('myApp',[]);

myApp.controller('SalesController', ['$scope', function($scope) {
    $scope.salesRecords = {};
    
    $scope.getSalesRecords = function() {
        console.log("TODO: Get records from database and assign to $scope.salesRecords");
        
        //
    }; 
}]);