angular.module('transcotaDiretivas')
	.directive('deliveryRegister', function (delivery) {

		var ddo = {};

		ddo.restrict = "AE";
		ddo.transclude = true;

		ddo.scope = {
			deliveryModel: "=",
			onRegisterEnd: "&",
			onEditEnd: "&"
		};

		ddo.link = function (scope, elem, attrs) {
			scope.clearScreen = function () {
				scope.deliveryModel = {};
			}
			scope.clearScreen();

			scope.editDelivery = function () {
				delivery.edit(scope.deliveryModel)
					.then(function (data) {
						$('.btn-load').button('reset');
						if (data.data.success) {
							if (scope.onEditEnd) {
								// scope.onEditEnd();
								delivery.get().then(function(data){
									scope.deliverys = data.data;
									$('.btn-load').button('reset');
									$('#modal-delivery').modal('close');
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
						M.toast({ html: 'Um erro ocorreu ao alterar um local de entrega', displayLength: 3000, classes: 'red rounded' });
					});
			}

			scope.registerDelivery = function () {
				delivery.register(scope.deliveryModel)
					.then(function (data) {
						$('.btn-load').button('reset');
						if (data.data.success) {
							if (scope.onRegisterEnd) {
								// scope.onRegisterEnd();
								delivery.get().then(function(data){
									scope.deliverys = data.data;
									$('.btn-load').button('reset');
									$('#modal-delivery').modal('close');
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
						M.toast({ html: 'Um erro ocorreu ao cadastrar um local de entrega', displayLength: 3000, classes: 'red rounded' });
					});
			}

			scope.submit = function () {
				$('.btn-load').button('loading');
				if (scope.deliveryModel.id && scope.deliveryModel.id != '') {
					scope.editDelivery();
				} else {
					scope.registerDelivery();
				}
			}
		}

		ddo.templateUrl = 'js/directives/deliverys/register/deliveryRegister.html';

		return ddo;
	});