angular.module('transcotaDiretivas')
	.directive('userRegister', function (user) {

		var ddo = {};

		ddo.restrict = "AE";
		ddo.transclude = true;


		ddo.scope = {
			userModel: "=",
			// tipoCliente: "@",
			onRegisterEnd: "&",
			onEditEnd: "&"
		};

		ddo.link = function (scope, elem, attrs) {
			scope.clearScreen = function () {
				scope.userModel = {};
			}
			scope.clearScreen();

			scope.editUser = function () {
				user.edit(scope.userModel)
					.then(function (data) {
						$('.btn-load').button('reset');
						if (data.data.success) {
							if (scope.onEditEnd) {
								// scope.onEditEnd();
								$('.btn-load').button('reset');
								$('#modal-user').modal('close');
								M.toast({
									html: 'Usuário alterado com sucesso!',
									displayLength: 3000,
									classes: 'green rounded',
								});
							}
						} else {
							M.toast({ html: data.data.message, displayLength: 3000, classes: 'red rounded' });
							$('#modal-user').modal('close');
						}
					})
					.catch(function (data) {
						M.toast({ html: 'Um erro ocorreu ao alterar um cliente', displayLength: 3000, classes: 'red rounded' });
						$('#modal-user').modal('close');
					});
			}

			scope.registerUser = function () {
				user.register(scope.userModel)
					.then(function (data) {
						$('.btn-load').button('reset');
						if (data.data.success) {
							if (scope.onRegisterEnd) {
								// scope.onRegisterEnd();
								$('.btn-load').button('reset');
								$('#modal-user').modal('close');
								M.toast({
									html: 'Usuário criado com sucesso!',
									displayLength: 3000,
									classes: 'green rounded',
								});								
							}
						} else {
							M.toast({ html: data.data.message, displayLength: 3000, classes: 'red rounded' })
							$('#modal-user').modal('close');
						}
					})
					.catch(function (data) {
						M.toast({ html: 'Um erro ocorreu ao cadastrar um cliente', displayLength: 3000, classes: 'red rounded' });
						$('#modal-user').modal('close');
					});
			}

			scope.submit = function () {
				$('.btn-load').button('loading');
				if (scope.userModel.id && scope.userModel.id != '') {
					scope.editUser();
				} else {
					scope.registerUser();
				}
			}
		}

		ddo.templateUrl = 'js/directives/users/register/userRegister.html';

		return ddo;
	});