'use strict';

// Annonces controller
angular.module('annonces').controller('AnnoncesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Annonces',
	function($scope, $stateParams, $location, Authentication, Annonces) {
		$scope.authentication = Authentication;
		//$scope.photos = []; //will contain all uploaded files
		//$scope.photoName = []; //will contain all uploaded name files

		// Create new Annonce
		$scope.create = function() {
			var annonce = new Annonces ({
        			idbuilding: $scope.idmap,
        			name: this.name,
        			surface: this.surface,
        			prix: this.prix,
        			nombre: this.nombre,
        			email: this.email,
        			contact: this.contact,
        			info: this.info
           			});

			
	// Redirect after save
	annonce.$save(function(response) {
		$location.path('annonces/' + response._id);

		// Clear form fields
		$scope.name = '';
		}, function(errorResponse) {
		$scope.error = errorResponse.data.message;

	});
};

		// Remove existing Annonce
		$scope.remove = function(annonce) {
			if ( annonce ) { 
				annonce.$remove();

				for (var i in $scope.annonces) {
					if ($scope.annonces [i] === annonce) {
						$scope.annonces.splice(i, 1);
					}
				}
			} else {
				$scope.annonce.$remove(function() {
					$location.path('annonces');
				});
			}
		};

		
		// Update existing Annonce
		$scope.update = function() {
			var annonce = $scope.annonce;

			annonce.$update(function() {
				$location.path('annonces/' + annonce._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Annonces
		$scope.find = function() {
			$scope.annonces = Annonces.query();
		};


		
		// Find existing Annonce
		$scope.findOne = function() {
			$scope.annonce = Annonces.get({ 
				annonceId: $stateParams.annonceId
			});
		};
	}
]);



