angular.module('transcota', ['ngRoute','transcotaServicos', 'transcotaDiretivas', 'ngMask'])
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

		$routeProvider.when('/register', {
			templateUrl: 'partials/userRegister.html',
			controller: 'userRegisterController'
		});

		$routeProvider.when('/customerRegister', {
			templateUrl: 'partials/customerRegister.html',
			controller: 'customerRegisterController'
		});

		$routeProvider.when('/home', {
			templateUrl: 'partials/home.html',
			controller: 'homeController'
		});

		$routeProvider.otherwise({redirectTo: '/'});

	});