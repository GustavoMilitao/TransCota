angular.module('transcotaDiretivas')
    .directive('customerRegister', function (customer) {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;


        ddo.scope = {
            customerModel : "@",
            tipoCliente : "@"
        };

        ddo.link = function(scope, elem, attrs){
            scope.clearScreen = function () {
                scope.customerModel = {};
				scope.customerModel.name = "";
				scope.customerModel.document = "";
				scope.customerModel.phone1 = "";
				scope.customerModel.phone2 = "";
				scope.customerModel.address = "";
				scope.customerModel.number = "";
				scope.customerModel.complement = "";
				scope.customerModel.zipCode = "";
				scope.customerModel.city = "";
				scope.customerModel.state = "";
				scope.customerModel.active = false;
				scope.customerModel.taxpayer = false;
				scope.customerModel.email = "";
                scope.customerModel.observation = "";
                scope.tipoCliente = "0";
            }
            scope.clearScreen();

            scope.submit = function () {
				$('.btn-load').button('loading');
				customer.register(scope.customerModel)
					.then(function (data) {
						if (data.data.success) {
							M.toast({
								html: 'Cliente cadastrado com sucesso!',
								displayLength: 3000,
								classes: 'green rounded',
								completeCallback: function () {
									scope.clearScreen();
								}
							});
						} else {
							M.toast({ html: data.data.message, displayLength: 3000, classes: 'red rounded' })
						}
					})
					.catch(function (data) {
						M.toast({ html: 'Um erro ocorreu ao cadastrar um cliente', displayLength: 3000, classes: 'red rounded' });
					});
			}
        }

        ddo.templateUrl = 'js/directives/customerRegister/customerRegister.html';

        return ddo;
    });