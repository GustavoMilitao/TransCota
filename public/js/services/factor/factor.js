angular.module('transcotaServicos')
    .factory("factor", function ($http) {

        var service = {};

        service.register = function(factor){
            return $http({
                url: "http://142.44.246.7:8080/CotacaoWebApp/factorRoute/",
                method: 'POST',
                data: factor
            });
        }

        service.get = function (id) {
            var urlGet = "http://142.44.246.7:8080/CotacaoWebApp/factorRoute/";
            if (id) {
                urlGet += id
            }
            return $http({
                url: urlGet,
                method: 'GET'
            });
        }

        service.edit = function (factor) {
            if (factor.id) {
                var urlEdit = "http://142.44.246.7:8080/CotacaoWebApp/factorRoute/" + factor.id;
                delete factor.id;
                return $http({
                    url: urlEdit,
                    method: 'PUT',
                    data: factor
                });
            }
        }

        service.delete = function (id) {
            if (id) {
                var urlDelete = "http://142.44.246.7:8080/CotacaoWebApp/factorRoute/"+id;
                return $http({
                    url: urlDelete,
                    method: 'DELETE'
                });
            }
        }

        return service;
    });