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

        service.get = function(id){
            var urlGet = "http://142.44.246.7:8080/CotacaoWebApp/custumer/";
            if(id){
                urlGet += id
            }
            return $http({
                url: urlGet,
                method: 'GET'
            });
        }

        return service;
    });