angular.module('transcotaServicos')
    .factory("collect", function ($http) {

        var service = {};

        service.register = function(collect){
            return $http({
                url: "http://142.44.246.7:8080/CotacaoWebApp/collect/",
                method: 'POST',
                data: collect
            });
        }

        service.get = function (id) {
            var urlGet = "http://142.44.246.7:8080/CotacaoWebApp/collect/";
            if (id) {
                urlGet += id
            }
            return $http({
                url: urlGet,
                method: 'GET'
            });
        }

        service.edit = function (collect) {
            if (collect.id) {
                var urlEdit = "http://142.44.246.7:8080/CotacaoWebApp/collect/" + collect.id;
                delete collect.id;
                return $http({
                    url: urlEdit,
                    method: 'PUT',
                    data: collect
                });
            }
        }

        service.delete = function (id) {
            if (id) {
                var urlDelete = "http://142.44.246.7:8080/CotacaoWebApp/collect/"+id;
                return $http({
                    url: urlDelete,
                    method: 'DELETE'
                });
            }
        }

        return service;
    });