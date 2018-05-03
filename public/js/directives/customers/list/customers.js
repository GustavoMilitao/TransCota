angular.module('transcotaDiretivas')
    .directive('customers', function (customer) {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;


        ddo.scope = {
            customers : "@",
        };

        ddo.link = function(scope, elem, attrs){
            scope.clearScreen = function () {
				scope.customers = [];
			}
			customer.get().then(function(data){
				scope.customers = data.data;
			});
            scope.clearScreen();
        }

        ddo.templateUrl = 'js/directives/customers/list/customers.html';

        return ddo;
    });