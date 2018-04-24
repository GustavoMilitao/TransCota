angular.module('transcota')
	.controller('homeController',

		function ($scope, check, $cookies, $location) {
			$scope.user = check.data;
			$scope.logout = function(){
				$cookies.remove('idUser');
				$location.path('/');
			}
		});