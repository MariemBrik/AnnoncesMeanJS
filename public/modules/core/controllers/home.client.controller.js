'use strict';

var myApp = angular.module('myApp', []);

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);

///////////  controlleur que j'ai ajouté /////////////////////////////////////
/*var shapes = angular.module('shapes', []);

shapes.controller('shapesController',['$scope','$http',function ctrl($scope,$http){
  	$http.get('core/directives/data/data.json').success(function(data){
  	  	

            }]);*/


//// j'ai ajouté le controlleur  'shapesController' 
/*var myApp = angular.module('myApp', ['shapesController']);*/


