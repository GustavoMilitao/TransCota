angular.module('transcotaDiretivas')
	.directive('customerRegister', function (customer) {

		var ddo = {};

		ddo.restrict = "AE";
		ddo.transclude = true;


		ddo.scope = {
			customerModel: "=",
			tipoCliente: "@",
			onRegisterEnd: "&",
			onEditEnd: "&"
		};

		ddo.link = function (scope, elem, attrs) {
			scope.clearScreen = function () {
				scope.customerModel = {};
				scope.tipoCliente = "0";
			}
			scope.clearScreen();

			scope.editCustomer = function () {
				customer.edit(scope.customerModel)
					.then(function (data) {
						$('.btn-load').button('reset');
						if (data.data.success) {
							if (scope.onEditEnd) {
								scope.onEditEnd();
							}
						} else {
							M.toast({ html: data.data.message, displayLength: 3000, classes: 'red rounded' })
						}
					})
					.catch(function (data) {
						M.toast({ html: 'Um erro ocorreu ao alterar um cliente', displayLength: 3000, classes: 'red rounded' });
					});
			}

			scope.registerCustomer = function () {
				customer.register(scope.customerModel)
					.then(function (data) {
						$('.btn-load').button('reset');
						if (data.data.success) {
							if (scope.onRegisterEnd) {
								scope.onRegisterEnd();
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
				if (scope.customerModel.id && scope.customerModel.id != '') {
					scope.editCustomer();
				} else {
					scope.registerCustomer();
				}
			}
		}

		ddo.templateUrl = 'js/directives/customers/register/customerRegister.html';

		return ddo;
	});