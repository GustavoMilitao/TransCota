angular.module('transcotaServicos')
    .factory("route", function ($http) {

        var service = {};

        service.register = function(route){
            return $http({
                url: "http://142.44.246.7:8080/CotacaoWebApp/route/",
                method: 'POST',
                data: route
            });
        }

        service.get = function (id) {
            var urlGet = "http://142.44.246.7:8080/CotacaoWebApp/route/";
            if (id) {
                urlGet += id
            }
            return $http({
                url: urlGet,
                method: 'GET'
            });
        }

        service.edit = function (route) {
            if (route.id) {
                var urlEdit = "http://142.44.246.7:8080/CotacaoWebApp/route/" + route.id;
                delete route.id;
                return $http({
                    url: urlEdit,
                    method: 'PUT',
                    data: route
                });
            }
        }

        service.delete = function (id) {
            if (id) {
                var urlDelete = "http://142.44.246.7:8080/CotacaoWebApp/route/"+id;
                return $http({
                    url: urlDelete,
                    method: 'DELETE'
                });
            }
        }

        return service;
    });