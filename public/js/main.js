angular.module('transcota', ['ngRoute','transcotaServicos', 'transcotaDiretivas'])
	.config(function($routeProvider, $locationProvider) {

		$locationProvider.html5Mode(true);

		$routeProvider.when('/', {
			templateUrl: 'partials/login.html',
			controller: 'loginController'
		});

		$routeProvider.when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'loginController'
		});

		$routeProvider.otherwise({redirectTo: '/'});

	});