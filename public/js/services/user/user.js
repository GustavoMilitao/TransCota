angular.module('transcotaServicos')
    .factory("user", function ($http) {

        var service = {};
        service.login = function (user, password) {
            return $http({
                // domínio do crossorigin.me utilizado para 
                //solucionar o erro de CORS quando chamado o recurso.
                // url: 'https://crossorigin.me/https://git.sebraemg.com.br/publico/test-frontend/raw/master/api/courses.json',

                url: "http://142.44.246.7:8080/CotacaoWebApp/login/",
                method: 'POST',
                data: {
                    login: user,
                    password: password
                },
                // headers: {
                //     'Content-Type': 'application/json;'
                // }
            });
        }

        service.register = function(user){
            return $http({
                url: "http://142.44.246.7:8080/CotacaoWebApp/user/",
                method: 'POST',
                data: user
            });
        }

        service.get = function (id) {
            var urlGet = "http://142.44.246.7:8080/CotacaoWebApp/user/";
            if (id) {
                urlGet += id
            }
            return $http({
                url: urlGet,
                method: 'GET'
            });
        }

        service.edit = function (user) {
            if (user.id) {
                var urlEdit = "http://142.44.246.7:8080/CotacaoWebApp/user/" + user.id;
                delete user.id;
                return $http({
                    url: urlEdit,
                    method: 'PUT',
                    data: user
                });
            }
        }

        service.delete = function (id) {
            if (id) {
                var urlDelete = "http://142.44.246.7:8080/CotacaoWebApp/user/"+id;
                return $http({
                    url: urlDelete,
                    method: 'DELETE'
                });
            }
        }

        return service;
    });