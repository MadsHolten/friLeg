//Det er en god idé at ramme JS-koden ind
(function(){
	'use strict';
	//Modul defineres
	angular
		//Moduler er beholdere for forskellige dele af appen – controllere, services, filtre, directives, etc.
		.module('geoCode', ["firebase"])


		//CONTROLLER TIL AT HENTE GEOCODE DATA VIA GOOGLES API

		//Scopes bruges til at dele data mellem controllers og views (dependency injection)
		.controller('GetGeoCode', ['$scope','$http', function($scope, $http){
		//app.controller('GetGeoCode', ['$scope','$http', 'fbCRUD', function($scope, $http, fbCRUD){	

			$scope.coordinates = 'Indtast addresse eller sted';

			$scope.update = function(geo) {

				//Kode til Google develop
				var googleAPIkey = 'AIzaSyDPmpy8aXArbc3gCXMjA3y-0g7OBJWzgOk';

				//Addressefelt hentes
				var adr = $scope.geo.address.split(' ').join('+');

				//$scope-variablen er bare et JS objekt. Der kan sættes variable uden at skulle kalde en funktion eller noget
			    $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + adr + '&key=' + googleAPIkey)
			    	.success(function(data) {
			    		if(data.status == 'OK') {
							// this callback will be called asynchronously
							// when the response is available
							var adr = data.results[0].formatted_address;
							var lat = data.results[0].geometry.location.lat;
							var lng = data.results[0].geometry.location.lng;

							$scope.coordinates = adr + ' | ' + lat + ', ' + lng;

							//fbCRUD.addPOI(data);
						}
						else {$scope.coordinates = 'Ingen resultater'}
					});
			};
		}]);
	/*
		app.factory('fbCRUD', ['$firebase', function($firebase) {
			//Opret forbindelse til firebase
			var ref = new Firebase("https://rdtrp.firebaseio.com");

			var addPOI = function(POI) {
				POIs.$add(data);
			};
		}]);*/

})();