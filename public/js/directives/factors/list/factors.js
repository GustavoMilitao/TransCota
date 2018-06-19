angular.module('transcotaDiretivas')
    .directive('factors', function (factor) {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.scope = {
            factors : "@",
            searchText : "@",
            factor : "@",
            positionInList : "@"
        };

        ddo.link = function(scope, elem, attrs){
            scope.clearScreen = function () {
                scope.factors = [];
                scope.factor = {};
                scope.searchText = "";
                // scope.factor = {};
			}
			factor.get().then(function(data){
				scope.factors = data.data;
            });
            scope.wantToDelete = function(factor, position){
                scope.factor = factor;
                scope.positionInList = position;
                $('#modalExclusaoFactor').modal('open');
            }

            scope.editFactor = function(factor){
                scope.factor = factor;
                $('#modal-factor').modal('open');
            }

            scope.registerFinished = function(){
                $('.btn-load').button('loading');
                factor.get().then(function(data){
                    scope.factors = data.data;
                    $('.btn-load').button('reset');
                    $('#modal-factor').modal('close');
                    M.toast({
                        html: 'Fator para a rota registrado com sucesso!',
                        displayLength: 3000,
                        classes: 'green rounded',
                    });
                });
            }

            scope.editFinished = function(){
                $('.btn-load').button('loading');
                factor.get().then(function(data){
                    scope.factors = data.data;
                    $('.btn-load').button('reset');
                    $('#modal-factor').modal('close');
                    M.toast({
                        html: 'Fator para a rota alterado com sucesso!',
                        displayLength: 3000,
                        classes: 'green rounded',
                    });
                });
            }

            scope.createFactor = function(){
                scope.factor = {};
                $('#modal-factor').modal('open');
            }

            scope.excluirSelecionado = function(){
                if(scope.factor){
                    factor.delete(scope.factor.id)
                    .then(function(data){
                        $('#modalExclusaoFactor').modal('close');
                        if(data.data.success){
                            M.toast({
								html: 'Fator para a rota excluído com sucesso!',
								displayLength: 3000,
								classes: 'green rounded',
								completeCallback: function () {
									// scope.clearScreen();
								}
                            });
                            scope.factors.splice(scope.positionInList, 1);
                        } else {
                            M.toast({ html: data.data.message, displayLength: 3000, classes: 'red rounded' });
                        }
                    })
                }
            }

            scope.clearScreen();
        }

        ddo.templateUrl = 'js/directives/factors/list/factors.html';

        return ddo;
    });