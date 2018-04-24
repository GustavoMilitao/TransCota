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

        service.getUser = function(idUser){
            return $http({
                url: "http://142.44.246.7:8080/CotacaoWebApp/user/"+idUser,
                method: 'GET'
            });
        }

        return service;
    });