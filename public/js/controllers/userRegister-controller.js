angular.module('transcota')
	.controller('userRegisterController',

		function ($scope, user) {

			$scope.userModel = {
				name: "",
				login: "",
				password: "",
				idProfile: "",
				active: false,
				cpf: "",
				rg: "",
				email: "",
				observacao: ""
			};

			$scope.clearScreen = function () {
				$scope.userModel.name = "";
				$scope.userModel.login = "";
				$scope.userModel.password = "";
				$scope.userModel.idProfile = "";
				$scope.userModel.active = false;
				$scope.userModel.cpf = "";
				$scope.userModel.rg = "";
				$scope.userModel.email = "";
				$scope.userModel.observacao = "";
			}

			$scope.submit = function () {
				$('.btn-load').button('loading');
				user.register($scope.userModel)
					.then(function (data) {
						if (data.data.success) {
							M.toast({
								html: 'Usuário cadastrado com sucesso!',
								displayLength: 3000,
								classes: 'green rounded',
								completeCallback: function () {
									$scope.clearScreen();
								}
							});
						} else {
							M.toast(data.data.message, 3000, 'red rounded')
						}
					})
					.catch(function (data) {
						M.toast('Um erro ocorreu ao cadastrar um usuário', 3000, 'red rounded');
					});;
			}
		});