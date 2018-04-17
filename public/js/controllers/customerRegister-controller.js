angular.module('transcota')
	.controller('customerRegisterController',

		function ($scope, customer) {
			$scope.customerModel = {
				name : "",
				document : "",
				phone1 : "",
				phone2 : "",
				address : "",
				number : "",
				complement : "",
				zipCode : "",
				city : "",
				state : "",
				active : false,
				taxpayer : false,
				email : "",
				observation : ""
			}

			$scope.tipoCliente = "0";
	

			$scope.submit = function () {
				$('.btn-load').button('loading');
				customer.register($scope.customerModel)
					.then(function (data) {
						if (data) {

						} else {

						}
					});
			}
		});