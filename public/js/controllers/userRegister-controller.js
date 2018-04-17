angular.module('transcota')
	.controller('userRegisterController',

		function ($scope, user) {
			$scope.userModel = {
				name : "",
				login : "",
				password : "",
				idProfile : "",
				active : false,
				cpf : "",
				rg : "",
				email : "",
				observacao : ""
			};


			$scope.submit = function () {
				$('.btn-load').button('loading');
				user.register($scope.userModel)
					.then(function (data) {
						if (data) {

						} else {

						}
					});
			}
		});