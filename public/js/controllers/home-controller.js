angular.module('transcota')
	.controller('homeController',

		function ($scope, check, $cookies, $location) {
			$scope.user = check.data;
			
			$scope.logout = function(){
				$cookies.remove('idUser');
				$location.path('/');
			}

            var ctx = document.getElementById("statusCotacoes").getContext('2d');
            var statusCotacoes = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Aberto", "Em Andamento", "Pendente", "Faturado"],
                    datasets: [{
                        label: 'Status das Cotações',
                        data: [12, 19, 3, 5],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)'
                        ],
                        borderWidth: 1
                    }]
				},
				options: {
				  legend: { display: false },
				  title: {
					display: true,
					text: 'Status das Cotações'
				  }
				}
				
				

            });			
		});