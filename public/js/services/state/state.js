angular.module('transcotaServicos')
    .factory("state", function ($http) {

        var service = {};

        service.get = function (id) {
            var urlGet = "http://142.44.246.7:8080/CotacaoWebApp/state/";
            if (id) {
                urlGet += id
            }
            return $http({
                url: urlGet,
                method: 'GET'
            });
        }
        
        return service;
    });