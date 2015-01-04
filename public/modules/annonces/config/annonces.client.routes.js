'use strict';

//Setting up route
angular.module('annonces').config(['$stateProvider',
	function($stateProvider) {
		// Annonces state routing
		$stateProvider.
		state('listAnnonces', {
			url: '/annonces',
			templateUrl: 'modules/annonces/views/list-annonces.client.view.html'
		}).
		state('createAnnonce', {
			url: '/annonces/create',
			templateUrl: 'modules/annonces/views/create-annonce.client.view.html'
		}).
		state('viewAnnonce', {
			url: '/annonces/:annonceId',
			templateUrl: 'modules/annonces/views/view-annonce.client.view.html'
		}).
		state('editAnnonce', {
			url: '/annonces/:annonceId/edit',
			templateUrl: 'modules/annonces/views/edit-annonce.client.view.html'
		});
	}
]);