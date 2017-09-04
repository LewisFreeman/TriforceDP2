console.log("sales controller loaded");

var myApp = angular.module('salesRecordsController', []);

myApp.controller('salesRecordsController', ['$scope', function ($scope) {
        console.log("controller scope start");
        $scope.salesRecords = null;

        $scope.loadRecordsFromDB = function () {
            console.log("begin requesting data");

            $http({
                method: 'GET',
                url: '../php/getSalesRecords.php'
            }).then(function successCallback(response) {
                console.log("response recieved from getSalesRecords");
                console.log(response);
                // this callback will be called asynchronously
                // when the response is available
                $scope.salesRecords = response.data;

            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log("no response recieved");

            });

            console.log("end requesting data");
            console.log($scope.salesRecords);
        };

        $scope.loadRecordsFromDB();
        console.log("controller scope end");
    }
]);

console.log("sales controller end");
