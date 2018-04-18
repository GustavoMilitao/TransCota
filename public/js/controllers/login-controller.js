angular.module('transcota')
	.controller('loginController',

		function ($scope, user, $location) {
			$scope.usuario = "";
			$scope.senha = "";
			$scope.wrongUserOrPassword = false;
			
			$scope.submit = function(){
				$('.btn-load').button('loading');
				user.login($scope.usuario, $scope.senha)
				.then(function(data){
					$('.btn-load').button('reset');
					if(data.data){
						$scope.wrongUserOrPassword = true;
						$location.path('/home');
					}else {
						$scope.wrongUserOrPassword = false;
						$('#passLabel').prop("aria-invalid", "true");
						$('#userLabel').prop("aria-invalid", "true");
					}
				}).catch(function(data){
					M.toast('Um erro ocorreu ao logar', 3000, 'red rounded');
				});
			}
		});