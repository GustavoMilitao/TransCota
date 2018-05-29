angular.module('transcotaDiretivas')
    .directive('collects', function (collect) {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.scope = {
            collects : "@",
            searchText : "@",
            collect : "@",
            positionInList : "@"
        };

        ddo.link = function(scope, elem, attrs){
            scope.clearScreen = function () {
                scope.collects = [];
                scope.collect = {};
                scope.searchText = "";
                scope.collect = {};
			}
			collect.get().then(function(data){
				scope.collects = data.data;
            });
            scope.wantToDelete = function(collect, position){
                scope.collect = collect;
                scope.positionInList = position;
                $('#modalExclusaoCollect').modal('open');
            }

            scope.editCollect = function(collect){
                scope.collect = collect;
                $('#modal-collect').modal('open');
            }

            scope.registerFinished = function(){
                $('.btn-load').button('loading');
                collect.get().then(function(data){
                    scope.collects = data.data;
                    $('.btn-load').button('reset');
                    $('#modal-collect').modal('close');
                    M.toast({
                        html: 'Local de coleta registrado com sucesso!',
                        displayLength: 3000,
                        classes: 'green rounded',
                    });
                });
            }

            scope.editFinished = function(){
                $('.btn-load').button('loading');
                collect.get().then(function(data){
                    scope.collects = data.data;
                    $('.btn-load').button('reset');
                    $('#modal-collect').modal('close');
                    M.toast({
                        html: 'Local de coleta alterado com sucesso!',
                        displayLength: 3000,
                        classes: 'green rounded',
                    });
                });
            }

            scope.createCollect = function(){
                scope.collect = {};
                $('#modal-collect').modal('open');
            }

            scope.excluirSelecionado = function(){
                if(scope.collect){
                    collect.delete(scope.collect.id)
                    .then(function(data){
                        $('#modalExclusaoCollect').modal('close');
                        if(data.data.success){
                            M.toast({
								html: 'Local de coleta excluído com sucesso!',
								displayLength: 3000,
								classes: 'green rounded',
								completeCallback: function () {
									// scope.clearScreen();
								}
                            });
                            scope.collects.splice(scope.positionInList, 1);
                        } else {
                            M.toast({ html: data.data.message, displayLength: 3000, classes: 'red rounded' });
                        }
                    })
                }
            }

            scope.clearScreen();
        }

        ddo.templateUrl = 'js/directives/collects/list/collects.html';

        return ddo;
    });