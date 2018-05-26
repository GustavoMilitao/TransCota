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
			
            var ctx = document.getElementById("faturamento").getContext('2d');
            var faturamento = new Chart(ctx, {
                type: 'pie',
				data: {
					labels: ["João", "Maria", "José", "Carla", "Pedro"],
					datasets: [{
					  label: "Faturamento",
					  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
					  data: [2478,5267,734,784,433]
					}]
				  },
				  options: {
					title: {
					  display: true,
					  text: 'Faturamento'
					}
				  }
			});
			
            var ctx = document.getElementById("tarifasOfertadas").getContext('2d');
            var tarifasOfertadas = new Chart(ctx, {
				type: 'bar',
				data: {
				  labels: ["João", "Maria", "José", "Carla", "Pedro"],
				  datasets: [
					{
						label: "Tarifa 1",
						backgroundColor: "#3e95cd",
						data: [133,221,783,478,544]
					}, {
						label: "Tarifa 2",
						backgroundColor: "#8e5ea2",
						data: [408,547,675,734,587]
					}, {
						label: "Tarifa 3",
						backgroundColor: "#e8c3b9",
						data: [98,347,475,634,584]
					}, {
						label: "Tarifa 4",
						backgroundColor: "#c45850",
						data: [308,517,475,534,557]
					}
				  ]
				},
				options: {
				  title: {
					display: true,
					text: 'Tarifas ofertadas aos cllientes'
				  }
				}
            });				
		});