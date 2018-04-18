angular.module('transcota')
	.controller('customerRegisterController',

		function ($scope, customer) {
			$scope.customerModel = {
				name: "",
				document: "",
				phone1: "",
				phone2: "",
				address: "",
				number: "",
				complement: "",
				zipCode: "",
				city: "",
				state: "",
				active: false,
				taxpayer: false,
				email: "",
				observation: ""
			}
			$scope.clearScreen = function () {
				$scope.customerModel.name = "";
				$scope.customerModel.document = "";
				$scope.customerModel.phone1 = "";
				$scope.customerModel.phone2 = "";
				$scope.customerModel.address = "";
				$scope.customerModel.number = "";
				$scope.customerModel.complement = "";
				$scope.customerModel.zipCode = "";
				$scope.customerModel.city = "";
				$scope.customerModel.state = "";
				$scope.customerModel.active = false;
				$scope.customerModel.taxpayer = false;
				$scope.customerModel.email = "";
				$scope.customerModel.observation = "";
			}

			$scope.tipoCliente = "0";


			$scope.submit = function () {
				$('.btn-load').button('loading');
				customer.register($scope.customerModel)
					.then(function (data) {
						if (data.data.success) {
							M.toast({
								html: 'Cliente cadastrado com sucesso!',
								displayLength: 3000,
								classes: 'green rounded',
								completeCallback: function () {
									$scope.clearScreen();
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
		});