angular.module('transcotaDiretivas')
	.directive('routeRegister', function (route) {

		var ddo = {};

		ddo.restrict = "AE";
		ddo.transclude = true;

		ddo.scope = {
			routeModel: "=",
			onRegisterEnd: "&",
			onEditEnd: "&"
		};

		ddo.link = function (scope, elem, attrs) {
			scope.clearScreen = function () {
				scope.routeModel = {};
			}
			scope.clearScreen();

			scope.editDelivery = function () {
				route.edit(scope.routeModel)
					.then(function (data) {
						$('.btn-load').button('reset');
						if (data.data.success) {
							if (scope.onEditEnd) {
								// scope.onEditEnd();
								route.get().then(function(data){
									scope.routes = data.data;
									$('.btn-load').button('reset');
									$('#modal-route').modal('close');
									M.toast({
										html: 'Local de entrega editado com sucesso!',
										displayLength: 3000,
										classes: 'green rounded',
									});
								});									
							}
						} else {
							M.toast({ html: data.data.message, displayLength: 3000, classes: 'red rounded' })
						}
					})
					.catch(function (data) {
						M.toast({ html: 'Um erro ocorreu ao alterar um rota', displayLength: 3000, classes: 'red rounded' });
					});
			}

			scope.registerDelivery = function () {
				route.register(scope.routeModel)
					.then(function (data) {
						$('.btn-load').button('reset');
						if (data.data.success) {
							if (scope.onRegisterEnd) {
								// scope.onRegisterEnd();
								route.get().then(function(data){
									scope.routes = data.data;
									$('.btn-load').button('reset');
									$('#modal-route').modal('close');
									M.toast({
										html: 'Local de entrega registrado com sucesso!',
										displayLength: 3000,
										classes: 'green rounded',
									});
								});								
							}
						} else {
							M.toast({ html: data.data.message, displayLength: 3000, classes: 'red rounded' })
						}
					})
					.catch(function (data) {
						M.toast({ html: 'Um erro ocorreu ao cadastrar um rota', displayLength: 3000, classes: 'red rounded' });
					});
			}

			scope.submit = function () {
				$('.btn-load').button('loading');
				if (scope.routeModel.id && scope.routeModel.id != '') {
					scope.editDelivery();
				} else {
					scope.registerDelivery();
				}
			}
		}

		ddo.templateUrl = 'js/directives/routes/register/routeRegister.html';

		return ddo;
	});