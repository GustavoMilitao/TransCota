angular.module('transcota')
	.controller('loginController',

		function ($scope, user) {
			$scope.usuario = "";
			$scope.senha = "";
			$scope.wrongUserOrPassword = false;
			
			$scope.submit = function(){
				$('.btn-load').button('loading');
				user.login($scope.usuario, $scope.senha)
				.then(function(data){
					$('.btn-load').button('reset');
					if(data){
						$scope.wrongUserOrPassword = false;
						$('#passLabel').prop("aria-invalid", "true");
						$('#userLabel').prop("aria-invalid", "true");
					}else {
						$scope.wrongUserOrPassword = true;
					}
				});
			}
		});