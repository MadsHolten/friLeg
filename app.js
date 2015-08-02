//Modul defineres
var app = angular.module('geoCode', []);

//$scope.geoSearch = function() {
//	var adrString = $scope.addressText.split(' ').join('+');
//};

//Controller til ???
//Scopes bruges til at dele data mellem controllers og views (dependency injection)
app.controller('getGC', function($scope, $http){

	var googleAPIkey = 'AIzaSyDPmpy8aXArbc3gCXMjA3y-0g7OBJWzgOk';

	//$scope-variablen er bare et JS objekt. Der kan sættes variable uden at skulle kalde en funktion eller noget
    $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=' + googleAPIkey).
    	success(function(data) {
			// this callback will be called asynchronously
			// when the response is available
			$scope.lat = data.results[0].geometry.location.lat;
			$scope.lng = data.results[0].geometry.location.lng;
		});
});