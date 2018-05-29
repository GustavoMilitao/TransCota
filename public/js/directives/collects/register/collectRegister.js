angular.module('transcotaDiretivas')
	.directive('collectRegister', function (collect) {

		var ddo = {};

		ddo.restrict = "AE";
		ddo.transclude = true;


		ddo.scope = {
			collectModel: "=",
			onRegisterEnd: "&",
			onEditEnd: "&"
		};

		ddo.link = function (scope, elem, attrs) {
			scope.clearScreen = function () {
				scope.collectModel = {};
			}
			scope.clearScreen();

			scope.editCollect = function () {
				collect.edit(scope.collectModel)
					.then(function (data) {
						$('.btn-load').button('reset');
						if (data.data.success) {
							if (scope.onEditEnd) {
								// scope.onEditEnd();
								scope.collects = data.data;
								$('.btn-load').button('reset');
								$('#modal-collect').modal('close');
								M.toast({
									html: 'Local de coleta editado com sucesso!',
									displayLength: 3000,
									classes: 'green rounded',
								});								
							}
						} else {
							M.toast({ html: data.data.message, displayLength: 3000, classes: 'red rounded' })
						}
					})
					.catch(function (data) {
						M.toast({ html: 'Um erro ocorreu ao alterar um local de coleta', displayLength: 3000, classes: 'red rounded' });
					});
			}

			scope.registerCollect = function () {
				collect.register(scope.collectModel)
					.then(function (data) {
						$('.btn-load').button('reset');
						if (data.data.success) {
							if (scope.onRegisterEnd) {
								// scope.onRegisterEnd();
								scope.collects = data.data;
								$('.btn-load').button('reset');
								$('#modal-collect').modal('close');
								M.toast({
									html: 'Local de coleta registrado com sucesso!',
									displayLength: 3000,
									classes: 'green rounded',
								});								
							}
						} else {
							M.toast({ html: data.data.message, displayLength: 3000, classes: 'red rounded' })
						}
					})
					.catch(function (data) {
						M.toast({ html: 'Um erro ocorreu ao cadastrar um local de coleta', displayLength: 3000, classes: 'red rounded' });
					});
			}

			scope.submit = function () {
				$('.btn-load').button('loading');
				if (scope.collectModel.id && scope.collectModel.id != '') {
					scope.editCollect();
				} else {
					scope.registerCollect();
				}
			}
		}

		ddo.templateUrl = 'js/directives/collects/register/collectRegister.html';

		return ddo;
	});