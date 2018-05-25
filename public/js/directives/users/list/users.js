angular.module('transcotaDiretivas')
    .directive('users', function (user) {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;


        ddo.scope = {
            users : "@",
            searchText : "@",
            user : "@",
            positionInList : "@"
        };

        ddo.link = function(scope, elem, attrs){
            scope.clearScreen = function () {
                scope.users = [];
                scope.user = {};
                scope.searchText = "";
                scope.user = {};
			}
			user.get().then(function(data){
				scope.users = data.data;
            });
            scope.wantToDelete = function(user, position){
                scope.user = user;
                scope.positionInList = position;
                $('#modalExclusaoUser').modal('open');
            }

            scope.editUser = function(user){
                scope.user = user;
                $('#modal-user').modal('open');
            }

            scope.registerFinished = function(){
                $('.btn-load').button('loading');
                user.get().then(function(data){
                    scope.users = data.data;
                    $('.btn-load').button('reset');
                    $('#modal-user').modal('close');
                    M.toast({
                        html: 'Cliente registrado com sucesso!',
                        displayLength: 3000,
                        classes: 'green rounded',
                    });
                });
            }

            scope.editFinished = function(){
                $('.btn-load').button('loading');
                user.get().then(function(data){
                    scope.users = data.data;
                    $('.btn-load').button('reset');
                    $('#modal-user').modal('close');
                    M.toast({
                        html: 'Cliente alterado com sucesso!',
                        displayLength: 3000,
                        classes: 'green rounded',
                    });
                });
            }

            scope.createUser = function(){
                scope.user = {};
                $('#modal-user').modal('open');
            }

            scope.excluirSelecionado = function(){
                if(scope.user){
                    user.delete(scope.user.id)
                    .then(function(data){
                        $('#modalExclusaoUser').modal('close');
                        if(data.data.success){
                            M.toast({
								html: 'Cliente cadastrado com sucesso!',
								displayLength: 3000,
								classes: 'green rounded',
								completeCallback: function () {
									// scope.clearScreen();
								}
                            });
                            scope.users.splice(scope.positionInList, 1);
                        } else {
                            M.toast({ html: data.data.message, displayLength: 3000, classes: 'red rounded' });
                        }
                    })
                }
            }

            scope.clearScreen();
        }

        ddo.templateUrl = 'js/directives/users/list/users.html';

        return ddo;
    });