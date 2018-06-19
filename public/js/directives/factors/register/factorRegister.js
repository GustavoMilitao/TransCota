angular.module('transcotaDiretivas')
	.directive('factorRegister', function (factor) {

		var ddo = {};

		ddo.restrict = "AE";
		ddo.transclude = true;

		ddo.scope = {
			factorModel: "=",
			onRegisterEnd: "&",
			onEditEnd: "&"
		};

		ddo.link = function (scope, elem, attrs) {
			scope.clearScreen = function () {
				scope.factorModel = {};
			}
			scope.clearScreen();

			scope.editFactor = function () {
				factor.edit(scope.factorModel)
					.then(function (data) {
						$('.btn-load').button('reset');
						if (data.data.success) {
							if (scope.onEditEnd) {
								// scope.onEditEnd();
								scope.factors = data.data;
								$('.btn-load').button('reset');
								$('#modal-factor').modal('close');
								M.toast({
									html: 'Local de coleta editado com sucesso!',
									displayLength: 3000,
									classes: 'green rounded',
								});								
							}
						} else {
							M.toast({ html: data.data.message, displayLength: 3000, classes: 'red rounded' });
							$('#modal-factor').modal('close');
						}
					})
					.catch(function (data) {
						M.toast({ html: 'Um erro ocorreu ao alterar um fator para a rota', displayLength: 3000, classes: 'red rounded' });
						$('#modal-factor').modal('close');
					});
			}

			scope.registerFactor = function () {
				factor.register(scope.factorModel)
					.then(function (data) {
						$('.btn-load').button('reset');
						if (data.data.success) {
							if (scope.onRegisterEnd) {
								// scope.onRegisterEnd();
								scope.factors = data.data;
								$('.btn-load').button('reset');
								$('#modal-factor').modal('close');
								M.toast({
									html: 'Local de coleta registrado com sucesso!',
									displayLength: 3000,
									classes: 'green rounded',
								});								
							}
						} else {
							M.toast({ html: data.data.message, displayLength: 3000, classes: 'red rounded' });
							$('#modal-factor').modal('close');
						}
					})
					.catch(function (data) {
						M.toast({ html: 'Um erro ocorreu ao cadastrar um fator para a rota', displayLength: 3000, classes: 'red rounded' });
						$('#modal-factor').modal('close');
					});
			}

			scope.submit = function () {
				$('.btn-load').button('loading');
				if (scope.factorModel.id && scope.factorModel.id != '') {
					scope.editFactor();
				} else {
					scope.registerFactor();
				}
			}
		}

		ddo.templateUrl = 'js/directives/factors/register/factorRegister.html';

		return ddo;
	});