angular.module('transcotaServicos')
    .factory("customer", function ($http) {

        var service = {};

        service.register = function(customer){
            return $http({
                url: "http://142.44.246.7:8080/CotacaoWebApp/custumer/",
                method: 'POST',
                data: customer
            });
        }

        return service;
    });