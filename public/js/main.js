angular.module('transcota', ['ngSanitize', 'ngCookies','ngRoute','transcotaServicos', 'transcotaDiretivas', 'ngMask'])
	.config(function($routeProvider, $locationProvider) {

		$locationProvider.html5Mode(true);

		$routeProvider.when('/', {
			templateUrl: 'partials/login.html',
			controller: 'loginController',
			resolve:{
				'check':function($location, $cookies){   
					if($cookies.get('idUser')){ 
						$location.path('/home');
					}
				}
			}
		});

		$routeProvider.when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'loginController',
			resolve:{
				'check':function($location, $cookies){   
					if($cookies.get('idUser')){ 
						$location.path('/home');
					}
				}
			}
		});

		$routeProvider.when('/home', {
			templateUrl: 'partials/home.html',
			controller: 'homeController',
			resolve:{
				'check':function($location,$cookies, user){   
					if(!$cookies.get('idUser')){ 
						$location.path('/');
					}else {
						return user.get($cookies.get('idUser'));
					}
				}
			}
		});

		$routeProvider.otherwise({redirectTo: '/'});

	});