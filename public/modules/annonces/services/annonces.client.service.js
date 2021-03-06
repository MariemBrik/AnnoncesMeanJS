'use strict';

//Annonces service used to communicate Annonces REST endpoints
angular.module('annonces')
	.factory('Annonces', ['$resource',
		function($resource) {
			return $resource('annonces/:annonceId', { annonceId: '@_id'
			}, {
				update: {
					method: 'PUT'
				}
			});
		}
])
.factory('d3', ['$window',
    function($window) {
        return $window.d3;
    }
])
.factory('shapes', ['$window',
    function($window) {
        return $window.shapes;
    }
])
.factory('$', ['$window',
    function($window) {
        return $window.$;
    }
]);
