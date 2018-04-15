angular.module('transcota')
	.controller('customerRegisterController',

	function ($scope, user) {
		$scope.nome = "";
		$scope.ativo = false;
		$scope.documento = "";
		$scope.rg = "";
		$scope.perfil = "";
		$scope.login = "";
		$scope.senha = "";
		$scope.email = "";
		$scope.observacao = "";

		$scope.submit = function () {
			$('.btn-load').button('loading');
			user.register($scope.usuario, $scope.senha)
				.then(function (data) {
					if (data) {

					} else {

					}
				});
		}
	});