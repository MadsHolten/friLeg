//Det er en god idé at ramme JS-koden ind
(function(){
	'use strict';
	//Modul defineres
	angular
		//Moduler er beholdere for forskellige dele af appen – controllere, services, filtre, directives, etc.
		.module('geoCode', ['uiGmapgoogle-maps'])

		//Konfigurer google Maps API
		.config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
		  GoogleMapApi.configure({
			key: 'AIzaSyDPmpy8aXArbc3gCXMjA3y-0g7OBJWzgOk',
		    v: '3.17',
		    libraries: 'weather,geometry,visualization'
		  });
		}])

		//CONTROLLER TIL AT HENTE GEOCODE DATA VIA GOOGLES API

		//Scopes bruges til at dele data mellem controllers og views (dependency injection)
		.controller('GetGeoCode', ['$scope','$http', 'uiGmapGoogleMapApi', function($scope, $http, uiGmapGoogleMapApi){
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

							//Google kort
							$scope.map = {
								center: {
									latitude: lat,
									longitude: lng
								},
									zoom: 12,
									bounds: {}
							};
							$scope.marker = {
								id: 0,
								coords: {
									latitude: lat,
									longitude: lng									
								},
								options: { draggable: true }
							};
							// uiGmapGoogleMapApi is a promise.
						    // The "then" callback function provides the google.maps object.
						    uiGmapGoogleMapApi.then(function(maps) {

			    });
						}
						else {$scope.coordinates = 'Ingen resultater'}
					});
			};
		}])

		/*
		.controller('map', ['$scope','uiGmapGoogleMapApi', function($scope, uiGmapGoogleMapApi) {
			$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
		    // Do stuff with your $scope.
		    // Note: Some of the directives require at least something to be defined originally!
		    // e.g. $scope.markers = []
		    	$scope.markers = [];

		    // uiGmapGoogleMapApi is a promise.
		    // The "then" callback function provides the google.maps object.
		    uiGmapGoogleMapApi.then(function(maps) {

		    });
		}]);
*/

	/*
		app.factory('fbCRUD', ['$firebase', function($firebase) {
			//Opret forbindelse til firebase
			var ref = new Firebase("https://rdtrp.firebaseio.com");

			var addPOI = function(POI) {
				POIs.$add(data);
			};
		}]);*/

})();