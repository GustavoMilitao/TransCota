angular.module('transcotaDiretivas')
    .directive('routes', function (route) {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.scope = {
            routes : "@",
            searchText : "@",
            route : "@",
            positionInList : "@"
        };

        ddo.link = function(scope, elem, attrs){
            scope.clearScreen = function () {
                scope.routes = [];
                scope.route = {};
                scope.searchText = "";
                scope.route = {};
			}
			route.get().then(function(data){
				scope.routes = data.data;
            });
            scope.wantToDelete = function(route, position){
                scope.route = route;
                scope.positionInList = position;
                $('#modalExclusaoRoute').modal('open');
            }

            scope.editRoute = function(route){
                scope.route = route;
                $('#modal-route').modal('open');
            }

            scope.registerFinished = function(){
                $('.btn-load').button('loading');
                route.get().then(function(data){
                    scope.routes = data.data;
                    $('.btn-load').button('reset');
                    $('#modal-route').modal('close');
                    M.toast({
                        html: 'Rota registrado com sucesso!',
                        displayLength: 3000,
                        classes: 'green rounded',
                    });
                });
            }

            scope.editFinished = function(){
                $('.btn-load').button('loading');
                route.get().then(function(data){
                    scope.routes = data.data;
                    $('.btn-load').button('reset');
                    $('#modal-route').modal('close');
                    M.toast({
                        html: 'Rota alterado com sucesso!',
                        displayLength: 3000,
                        classes: 'green rounded',
                    });
                });
            }

            scope.createRoute = function(){
                scope.route = {};
                $('#modal-route').modal('open');
            }

            scope.excluirSelecionado = function(){
                if(scope.route){
                    route.delete(scope.route.id)
                    .then(function(data){
                        $('#modalExclusaoRoute').modal('close');
                        if(data.data.success){
                            M.toast({
								html: 'Rota excluído com sucesso!',
								displayLength: 3000,
								classes: 'green rounded',
								completeCallback: function () {
									// scope.clearScreen();
								}
                            });
                            scope.routes.splice(scope.positionInList, 1);
                        } else {
                            M.toast({ html: data.data.message, displayLength: 3000, classes: 'red rounded' });
                        }
                    })
                }
            }

            scope.clearScreen();
        }

        ddo.templateUrl = 'js/directives/routes/list/routes.html';

        return ddo;
    });