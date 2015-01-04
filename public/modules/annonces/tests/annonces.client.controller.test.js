'use strict';

(function() {
	// Annonces Controller Spec
	describe('Annonces Controller Tests', function() {
		// Initialize global variables
		var AnnoncesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Annonces controller.
			AnnoncesController = $controller('AnnoncesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Annonce object fetched from XHR', inject(function(Annonces) {
			// Create sample Annonce using the Annonces service
			var sampleAnnonce = new Annonces({
				name: 'New Annonce'
			});

			// Create a sample Annonces array that includes the new Annonce
			var sampleAnnonces = [sampleAnnonce];

			// Set GET response
			$httpBackend.expectGET('annonces').respond(sampleAnnonces);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.annonces).toEqualData(sampleAnnonces);
		}));

		it('$scope.findOne() should create an array with one Annonce object fetched from XHR using a annonceId URL parameter', inject(function(Annonces) {
			// Define a sample Annonce object
			var sampleAnnonce = new Annonces({
				name: 'New Annonce'
			});

			// Set the URL parameter
			$stateParams.annonceId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/annonces\/([0-9a-fA-F]{24})$/).respond(sampleAnnonce);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.annonce).toEqualData(sampleAnnonce);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Annonces) {
			// Create a sample Annonce object
			var sampleAnnoncePostData = new Annonces({
				name: 'New Annonce'
			});

			// Create a sample Annonce response
			var sampleAnnonceResponse = new Annonces({
				_id: '525cf20451979dea2c000001',
				name: 'New Annonce'
			});

			// Fixture mock form input values
			scope.name = 'New Annonce';

			// Set POST response
			$httpBackend.expectPOST('annonces', sampleAnnoncePostData).respond(sampleAnnonceResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Annonce was created
			expect($location.path()).toBe('/annonces/' + sampleAnnonceResponse._id);
		}));

		it('$scope.update() should update a valid Annonce', inject(function(Annonces) {
			// Define a sample Annonce put data
			var sampleAnnoncePutData = new Annonces({
				_id: '525cf20451979dea2c000001',
				name: 'New Annonce'
			});

			// Mock Annonce in scope
			scope.annonce = sampleAnnoncePutData;

			// Set PUT response
			$httpBackend.expectPUT(/annonces\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/annonces/' + sampleAnnoncePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid annonceId and remove the Annonce from the scope', inject(function(Annonces) {
			// Create new Annonce object
			var sampleAnnonce = new Annonces({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Annonces array and include the Annonce
			scope.annonces = [sampleAnnonce];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/annonces\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAnnonce);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.annonces.length).toBe(0);
		}));
	});
}());