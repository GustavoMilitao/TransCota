angular.module('transcotaDiretivas')
    .directive('icmsparams', function (icms) {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        
        ddo.scope = {
            icmsparams : "@",
            searchText : "@",
            icms : "@",
            positionInList : "@"
        };

        ddo.link = function(scope, elem, attrs){
            scope.clearScreen = function () {
                scope.icmsparams = [];
                scope.icms = {};
                scope.searchText = "";
                scope.icms = {};
			}
			icms.get().then(function(data){
				scope.icmsparams = data.data;
            });
            scope.wantToDelete = function(icms, position){
                scope.icms = icms;
                scope.positionInList = position;
                $('#modalExclusaoUser').modal('open');
            }

            scope.editUser = function(icms){
                scope.icms = icms;
                $('#modal-icms').modal('open');
            }

            scope.registerFinished = function(){
                $('.btn-load').button('loading');
                icms.get().then(function(data){
                    scope.icmsparams = data.data;
                    $('.btn-load').button('reset');
                    $('#modal-icms').modal('close');
                    M.toast({
                        html: 'Usuário registrado com sucesso!',
                        displayLength: 3000,
                        classes: 'green rounded',
                    });
                });
            }

            scope.editFinished = function(){
                $('.btn-load').button('loading');
                icms.get().then(function(data){
                    scope.icmsparams = data.data;
                    $('.btn-load').button('reset');
                    $('#modal-icms').modal('close');
                    M.toast({
                        html: 'Usuário alterado com sucesso!',
                        displayLength: 3000,
                        classes: 'green rounded',
                    });
                });
            }

            scope.createUser = function(){
                scope.icms = {};
                $('#modal-icms').modal('open');
            }

            scope.excluirSelecionado = function(){
                if(scope.icms){
                    icms.delete(scope.icms.id)
                    .then(function(data){
                        $('#modalExclusaoUser').modal('close');
                        if(data.data.success){
                            M.toast({
								html: 'Usuário excluído com sucesso!',
								displayLength: 3000,
								classes: 'green rounded',
								completeCallback: function () {
									// scope.clearScreen();
								}
                            });
                            scope.icmsparams.splice(scope.positionInList, 1);
                        } else {
                            M.toast({ html: data.data.message, displayLength: 3000, classes: 'red rounded' });
                        }
                    })
                }
            }

            scope.clearScreen();
        }

        ddo.templateUrl = 'js/directives/icmsparams/list/icmsparams.html';

        return ddo;
    });