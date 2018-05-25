angular.module('transcotaServicos')
    .factory("customer", function ($http) {

        var service = {};

        service.register = function (customer) {
            return $http({
                url: "http://142.44.246.7:8080/CotacaoWebApp/custumer/",
                method: 'POST',
                data: customer
            });
        }

        service.get = function (id) {
            var urlGet = "http://142.44.246.7:8080/CotacaoWebApp/custumer/";
            if (id) {
                urlGet += id
            }
            return $http({
                url: urlGet,
                method: 'GET'
            });
        }

        service.edit = function (customer) {
            if (customer.id) {
                var urlEdit = "http://142.44.246.7:8080/CotacaoWebApp/custumer/" + customer.id;
                delete customer.id;
                return $http({
                    url: urlEdit,
                    method: 'PUT',
                    data: customer
                });
            }
        }

        service.delete = function (id) {
            if (id) {
                var urlDelete = "http://142.44.246.7:8080/CotacaoWebApp/custumer/"+id;
                return $http({
                    url: urlDelete,
                    method: 'DELETE'
                });
            }
        }

        return service;
    });