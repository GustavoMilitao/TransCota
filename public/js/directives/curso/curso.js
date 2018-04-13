angular.module('transcotaDiretivas')
    .directive('curso', function () {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;


        ddo.scope = {
            categoria: '@',
            titulo: '@',
            cidade: '@',
            dtInicio: '@',
        };

        ddo.templateUrl = 'js/directives/curso/curso.html';

        return ddo;
    });