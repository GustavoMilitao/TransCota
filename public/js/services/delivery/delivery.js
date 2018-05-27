angular.module('transcotaServicos')
    .factory("delivery", function ($http) {

        var service = {};

        service.register = function(delivery){
            return $http({
                url: "http://142.44.246.7:8080/CotacaoWebApp/delivery/",
                method: 'POST',
                data: delivery
            });
        }

        service.get = function (id) {
            var urlGet = "http://142.44.246.7:8080/CotacaoWebApp/delivery/";
            if (id) {
                urlGet += id
            }
            return $http({
                url: urlGet,
                method: 'GET'
            });
        }

        service.edit = function (delivery) {
            if (delivery.id) {
                var urlEdit = "http://142.44.246.7:8080/CotacaoWebApp/delivery/" + delivery.id;
                delete delivery.id;
                return $http({
                    url: urlEdit,
                    method: 'PUT',
                    data: delivery
                });
            }
        }

        service.delete = function (id) {
            if (id) {
                var urlDelete = "http://142.44.246.7:8080/CotacaoWebApp/delivery/"+id;
                return $http({
                    url: urlDelete,
                    method: 'DELETE'
                });
            }
        }

        return service;
    });