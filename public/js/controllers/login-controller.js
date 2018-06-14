angular.module('transcota')
	.controller('loginController',

		function ($scope, user, $location, $cookies, $timeout) {
			$scope.usuario = "";
			$scope.senha = "";
			$scope.wrongUserOrPassword = false;
			
			$scope.submit = function(){
				$('.btn-load').button('loading');
				flag = 0;
				while (flag<10) {
					user.get(1).then(function(data){
						if (data.data) {
							flag = 10;
						} else {
							flag=flag+1;
						}
					});
					flag=flag+1;
				}

				user.login($scope.usuario, $scope.senha)
				.then(function(data){
					$('.btn-load').button('reset');
					if(data.data.success){
						$scope.wrongUserOrPassword = true;
						$location.path('/home');
						$cookies.put('idUser', data.data.idUser, {expires : $scope.getNextYear()});
					}else {
						$scope.wrongUserOrPassword = false;
						M.toast({ html: data.data.msg, displayLength: 3000, classes: 'red rounded' });
						$('#passLabel').prop("aria-invalid", "true");
						$('#userLabel').prop("aria-invalid", "true");
					}
				}).catch(function(data){
					M.toast({ html: 'Um erro ocorreu ao logar', displayLength: 3000, classes: 'red rounded' });
				});
			}

			$scope.getNextYear = function() {
				var d = new Date();
				var year = d.getFullYear();
				var month = d.getMonth();
				var day = d.getDate();
				var c = new Date(year + 1, month, day)
				return c;
			}
		});