angular.module('transcotaDiretivas')
    .directive('customers', function (customer, $http) {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;


        ddo.scope = {
            customers : "@",
            customerToExclude : "@",
            searchText : "@"
        };

        ddo.link = function(scope, elem, attrs){
            scope.clearScreen = function () {
                scope.customers = [];
                scope.customerToExclude = {};
                scope.searchText = "";
			}
			customer.get().then(function(data){
				scope.customers = data.data;
            });
            scope.desejaExcluir = function(customer){
                scope.customerToExclude = customer;
                $('#modal-exclusao').modal('open');
            }

            scope.excluirSelecionado = function(){
                if(scope.customerToExclude){

                }
            }

            scope.clearScreen();
        }

        ddo.templateUrl = 'js/directives/customers/list/customers.html';

        return ddo;
    });