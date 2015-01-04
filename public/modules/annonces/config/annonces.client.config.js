'use strict';

// Configuring the Articles module
angular.module('annonces').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Annonces', 'annonces', 'dropdown', '/annonces(/create)?');
		Menus.addSubMenuItem('topbar', 'annonces', 'List Annonces', 'annonces');
		Menus.addSubMenuItem('topbar', 'annonces', 'New Annonce', 'annonces/create');
	}
]);