angular.module('transcotaServicos')
    .factory("icms", function ($http) {

        var service = {};

        service.register = function(icms){
            return $http({
                url: "http://142.44.246.7:8080/CotacaoWebApp/parameterICMS/",
                method: 'POST',
                data: icms
            });
        }

        service.get = function (id) {
            var urlGet = "http://142.44.246.7:8080/CotacaoWebApp/parameterICMS/";
            if (id) {
                urlGet += id
            }
            return $http({
                url: urlGet,
                method: 'GET'
            });
        }

        service.edit = function (icms) {
            if (icms.id) {
                var urlEdit = "http://142.44.246.7:8080/CotacaoWebApp/parameterICMS/" + icms.id;
                delete icms.id;
                return $http({
                    url: urlEdit,
                    method: 'PUT',
                    data: icms
                });
            }
        }

        service.delete = function (id) {
            if (id) {
                var urlDelete = "http://142.44.246.7:8080/CotacaoWebApp/parameterICMS/"+id;
                return $http({
                    url: urlDelete,
                    method: 'DELETE'
                });
            }
        }

        return service;
    });