angular.module('transcotaDiretivas')
	.directive('icmsRegister', function (icms) {

		var ddo = {};

		ddo.restrict = "AE";
		ddo.transclude = true;


		ddo.scope = {
			icmsparamModel: "=",
			onRegisterEnd: "&",
			onEditEnd: "&"
		};

		ddo.link = function (scope, elem, attrs) {
			scope.clearScreen = function () {
				scope.icmsparamModel = {};
			}
			scope.clearScreen();

			scope.editIcms = function () {
				icms.edit(scope.icmsparamModel)
					.then(function (data) {
						$('.btn-load').button('reset');
						if (data.data.success) {
							if (scope.onEditEnd) {
								// scope.onEditEnd();
								$('.btn-load').button('reset');
								$('#modal-icms').modal('close');
								M.toast({
									html: 'Configuração de ICMS alterado com sucesso!',
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

			scope.registerIcms = function () {
				icms.register(scope.icmsparamModel)
					.then(function (data) {
						$('.btn-load').button('reset');
						if (data.data.success) {
							if (scope.onRegisterEnd) {
								// scope.onRegisterEnd();
								$('.btn-load').button('reset');
								$('#modal-icms').modal('close');
								M.toast({
									html: 'Configuração de ICMS criada com sucesso!',
									displayLength: 3000,
									classes: 'green rounded',
								});								
							}
						} else {
							M.toast({ html: data.data.message, displayLength: 3000, classes: 'red rounded' })
						}
					})
					.catch(function (data) {
						M.toast({ html: 'Um erro ocorreu ao cadastrar um parâmetro de ICMS', displayLength: 3000, classes: 'red rounded' });
					});
			}

			scope.submit = function () {
				$('.btn-load').button('loading');
				if (scope.icmsparamModel.id && scope.icmsparamModel.id != '') {
					scope.editIcms();
				} else {
					scope.registerIcms();
				}
			}
		}

		ddo.templateUrl = 'js/directives/icmsparams/register/icmsRegister.html';

		return ddo;
	});