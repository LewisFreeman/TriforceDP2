var myApp = angular.module('salesRecordsController', []);

myApp.controller("salesRecordsController",
    function ($scope, $http) {
        $scope.salesRecords = {};

        $scope.loadRecordsFromDB = function () {
            $http({
                method: 'GET',
                url: '../php/getSalesRecords.php'
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.salesRecords = response.data;
                console.log("response recieved from getSalesRecords");
                
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log("no response recieved");
                
            });
        };
    
        $scope.loadRecordsFromDB();
});
