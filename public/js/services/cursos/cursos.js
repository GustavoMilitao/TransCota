angular.module('transcotaServicos')
    .factory("cursos", function ($http) {

        var service = {};
        service.listarCursos = function () {
            return $http({
                // domínio do crossorigin.me utilizado para 
                //solucionar o erro de CORS quando chamado o recurso.
                url: 'https://crossorigin.me/https://git.sebraemg.com.br/publico/test-frontend/raw/master/api/courses.json',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            });
        }

        return service;
    });