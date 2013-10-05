'use strict';

angular.module('vboxes', [])
  .config(function ($routeProvider,$locationProvider) {
    $routeProvider
      .when('/allo', {
        templateUrl: '/partials/main',
        controller: 'MainCtrl'
      })
      .when('/', {
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
	});
