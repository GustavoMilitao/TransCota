angular.module('transcota')
	.controller('loginController',

		function ($scope) {
			$scope.usuario = "";
			$scope.senha = "";

			$scope.submit = function(){
				$('.btn-load').button('loading');
			}
		});