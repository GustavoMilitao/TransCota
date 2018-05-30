angular.module('transcotaDiretivas')
	.directive('icmsRegister', function (icmsparam) {

		var ddo = {};

		ddo.restrict = "AE";
		ddo.transclude = true;


		ddo.scope = {
			icmsparamModel: "=",
			// tipoCliente: "@",
			onRegisterEnd: "&",
			onEditEnd: "&"
		};

		ddo.link = function (scope, elem, attrs) {
			scope.clearScreen = function () {
				scope.icmsparamModel = {};
			}
			scope.clearScreen();

			scope.editUser = function () {
				icmsparam.edit(scope.icmsparamModel)
					.then(function (data) {
						$('.btn-load').button('reset');
						if (data.data.success) {
							if (scope.onEditEnd) {
								// scope.onEditEnd();
								$('.btn-load').button('reset');
								$('#modal-icms').modal('close');
								M.toast({
									html: 'Usuário alterado com sucesso!',
									displayLength: 3000,
									classes: 'green rounded',
								});
							}
						} else {
							M.toast({ html: data.data.message, displayLength: 3000, classes: 'red rounded' })
						}
					})
					.catch(function (data) {
						M.toast({ html: 'Um erro ocorreu ao alterar um cliente', displayLength: 3000, classes: 'red rounded' });
					});
			}

			scope.registerUser = function () {
				icmsparam.register(scope.icmsparamModel)
					.then(function (data) {
						$('.btn-load').button('reset');
						if (data.data.success) {
							if (scope.onRegisterEnd) {
								// scope.onRegisterEnd();
								$('.btn-load').button('reset');
								$('#modal-icms').modal('close');
								M.toast({
									html: 'Usuário criado com sucesso!',
									displayLength: 3000,
									classes: 'green rounded',
								});								
							}
						} else {
							M.toast({ html: data.data.message, displayLength: 3000, classes: 'red rounded' })
						}
					})
					.catch(function (data) {
						M.toast({ html: 'Um erro ocorreu ao cadastrar um cliente', displayLength: 3000, classes: 'red rounded' });
					});
			}

			scope.submit = function () {
				$('.btn-load').button('loading');
				if (scope.icmsparamModel.id && scope.icmsparamModel.id != '') {
					scope.editUser();
				} else {
					scope.registerUser();
				}
			}
		}

		ddo.templateUrl = 'js/directives/icmsparams/register/icmsRegister.html';

		return ddo;
	});