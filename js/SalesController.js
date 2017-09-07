console.log("sales controller loaded");

var myApp = angular.module('PHPSRePS', []);

myApp.controller('salesRecordsController', function ($scope, $http) {
	console.log("controller scope start");
	$scope.salesRecords = [];

	$http({
		method: 'GET',
		url: 'http://localhost:80/TriforceDP2/php/getSalesRecords.php'
	}).then(function successCallback(response) {
		$scope.salesRecords = response.data;
		console.log("response recieved from getSalesRecords");

		//$scope.salesRecords = response.data;
		console.log("SR: "); 
		console.log($scope.salesRecords);

	}, function errorCallback(response) {
		// called asynchronously if an error occurs
		// or server returns response with an error status.
		console.log("no response recieved");

	});

	console.log("controller scope end");
});

console.log("sales controller end");
