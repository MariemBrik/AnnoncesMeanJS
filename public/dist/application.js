'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'mean';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('annonces');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';
(function(global){

var createshape=function(attributes){
		attributes        = attributes       || {};
		attributes._id    = attributes._id   || 0;
		attributes.name   = attributes.name  || 'Mariem';
		attributes.nodes  = attributes.nodes || [];
		var s = 'M ';
		var shape={};

		shape.toString=function (){
		return '(' + attributes._id + ', ' + attributes.name + ',' + attributes.nodes + ')';
		};


		shape.toSvgPath = function(){
			return 'M '+attributes.nodes.map(function(node){return node.x + ',' + node.y;}).join(' L ');

		};

		shape.getName = function(){
			return attributes.name;
		};

		shape.getId = function(){
			return attributes._id;
		};
		return shape;

 };

/////////

var createRoad=function(attributes){

		attributes = attributes       || {};
		attributes.classe   = attributes.classe || 'classe';
		attributes.highway = attributes.highway || 'nope'; 
		attributes.name = attributes.name || 'nope'; 
		var road= createshape(attributes);
		var superToString=road.toString();
		road.toString = function() {
       		 return superToString.apply(road) + ' ,'+attributes.classe;
   		 };


		 road.getClasse = function() {
       		 return attributes.classe;
    		};

		road.getType = function (){
		return attributes.highway;	
	};
		road.getName = function (){
		return attributes.name;	
	};
	return road;

};
/////////

var createBuilding=function(attributes){

		attributes = attributes       || {};
		attributes.area  = attributes.area || 0;
		
		var building= createshape(attributes);
		var superToString=building.toString();
		building.toString = function() {
       		 return superToString.apply(building) + ' ,'+attributes.area;
   		 };


		 building.getArea = function() {

		 	 var tab = [];
		 	 tab[12] = 'Décembre'; 
		 	 var tabJ= new Array('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');
		 	 var date = new Date();
		 	 var mois = date.getMonth()+1;
		 	 attributes.area = 'hi from getArea()';
       		 return attributes.area+' fait le '+tabJ[date.getDay()]+'/'+mois+'/'+date.getFullYear();
    		};

	return building;

};
////////_________


var createAmenity=function(attributes){

		attributes = attributes       || {};
		attributes.type   = attributes.type || 'type';
		
		var amenity= createshape(attributes);
		var superToString=amenity.toString();
		amenity.toString = function() {
       		 return superToString.apply(amenity) + ' ,'+attributes.classe;
   		 };


		 amenity.getClasse = function() {
       		 return attributes.type;
    		};
	return amenity;

};

////////


var createNatural=function(attributes){

		attributes = attributes       || {};
		attributes.type   = attributes.type || 'type';
		
		var natural= createshape(attributes);
		var superToString=natural.toString();
		natural.toString = function() {
       		 return superToString.apply(natural) + ' ,'+attributes.classe;
   		 };


		 natural.getClasse = function() {
       		 return attributes.type;
    		};
	return natural;

};

//////
if(window !=='undefined' && global === window)
{
	global.shapes = {};
    global.shapes.createRoad = createRoad;
	global.shapes.createBuilding = createBuilding;
	global.shapes.createNatural = createNatural;
	global.shapes.createAmenity = createAmenity;
}
else
{

	global.createRoad = createRoad;
	global.createBuilding = createBuilding;
	global.createNatural = createNatural;
	global.createAmenity = createAmenity;
	global.VERSION = '0.0.1';
}

})(this);





'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
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




'use strict';

angular.module('annonces').directive('map', ['$http','shapes','d3','$', function ($http,shapes,d3,$){
	
  	console.log('hi from directive');
	function drawShapes(scope,element) 
	{
		var response = $http.get('/modules/data/data.json');
		response.success(function(data) 
		{
			var buildings = [], roads = [], amenities = [], naturals = [];
				for(var i = data.length - 1; i > 0; i-- )
				{
					if(typeof data[i].building !== 'undefined' && data[i].building === true){
						buildings.push(shapes.createBuilding(data[i]));
					}
					if(typeof data[i].highway !== 'undefined'){
						roads.push(shapes.createRoad(data[i]) );
					}
					if(typeof data[i].natural !== 'undefined'){
						naturals.push(shapes.createNatural(data[i]) );
					}
					if(typeof data[i].amenity !== 'undefined'){
						amenities.push(shapes.createAmenity(data[i]));
					}
				}
		    $('#form :input').prop('disabled', true);

			 var svg = d3.select(element[0])
   						 .append('svg')
    					 .attr('width', 1000)
     					 .attr('height', 500);


    		 	svg.selectAll('.buildings')
				.data(buildings)
				.enter()
				.append('path')
					.classed('buildings',1)
					.attr('d', function(d){return d.toSvgPath();})
					.on('click', function(d, i){
		                scope.idmap = d.getId();
		                scope.$apply();
		                console.log(' Map id : '+d.getId());

		                $http.get('/annonces/building/'+d.getId()).
						  success(function(data) {
						    //alert('building s advert = '+data.name);
		                    $('#form :input').prop('disabled', true);
		                	var texte = 'Une annonce est déjà accordée à ce batiment, veuillez choisir un autre .. ';
        					$('#choixBuildg').html(texte);
        					$('#choixBuildg').css('color', '#B40404'); 
						  }).
						  error(function(err) {
						  	//alert('no advert here');
						    $('#form :input').prop('disabled', false);
       						var texte = 'Choix du batiment fait, veuillez remplir les informations requises ..';
        					$('#choixBuildg').html(texte);
        					$('#choixBuildg').css('color', 'green');
						  });
        			});

			 svg.selectAll('.roads')
    				.data(roads)
    				.enter()
    				.append('path')
        				.classed('roads',1)
        				.attr('d',function(d){
    					return d.toSvgPath();}
				);

		        svg.selectAll('.amenities')
    				.data(amenities)
    				.enter()
    				.append('path')
        				.classed('amenities',1)
        				.attr('d',function(d){
    					return d.toSvgPath();}
				);

		       svg.selectAll('.naturals')
    				.data(naturals)
    				.enter()
    				.append('path')
    				    .classed('naturals',1)
    				    .attr('d',function(d){
    					return d.toSvgPath();}
				);
    				    
		                
	    	//You have to add getId() in shapes object model( createShapes function)	
	    	//So you can use it to have the _id of the corresponding building
	        
	        //return d.count();
	           


		});
	}

	return {
		restrict : 'E',
		link: drawShapes
	};

}]);



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

'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
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



'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);