'use strict';

angular.module('vboxes', [])
  .config(function ($routeProvider,$locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/partials/main',
        controller: 'MainCtrl'
      })
      .when('/boxes', {
	  	templateUrl: '/partials/boxes',
		controller: 'BoxlistCtrl'
	  })
	  .when('/boxes/:boxname', {
	  	templateUrl: '/partials/specificbox',
		controller: 'BoxCtrl'
	  })
	  .otherwise({
        redirectTo: '/'
      });
	  $locationProvider.html5Mode(true);
	});
