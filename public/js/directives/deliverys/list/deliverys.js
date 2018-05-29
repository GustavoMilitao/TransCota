angular.module('transcotaDiretivas')
    .directive('deliverys', function (delivery) {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;

        ddo.scope = {
            deliverys : "@",
            searchText : "@",
            delivery : "@",
            positionInList : "@"
        };

        ddo.link = function(scope, elem, attrs){
            scope.clearScreen = function () {
                scope.deliverys = [];
                scope.delivery = {};
                scope.searchText = "";
                scope.delivery = {};
			}
			delivery.get().then(function(data){
				scope.deliverys = data.data;
            });
            scope.wantToDelete = function(delivery, position){
                scope.delivery = delivery;
                scope.positionInList = position;
                $('#modalExclusaoDelivery').modal('open');
            }

            scope.editDelivery = function(delivery){
                scope.delivery = delivery;
                $('#modal-delivery').modal('open');
            }

            scope.registerFinished = function(){
                $('.btn-load').button('loading');
                delivery.get().then(function(data){
                    scope.deliverys = data.data;
                    $('.btn-load').button('reset');
                    $('#modal-delivery').modal('close');
                    M.toast({
                        html: 'Local de coleta registrado com sucesso!',
                        displayLength: 3000,
                        classes: 'green rounded',
                    });
                });
            }

            scope.editFinished = function(){
                $('.btn-load').button('loading');
                delivery.get().then(function(data){
                    scope.deliverys = data.data;
                    $('.btn-load').button('reset');
                    $('#modal-delivery').modal('close');
                    M.toast({
                        html: 'Local de coleta alterado com sucesso!',
                        displayLength: 3000,
                        classes: 'green rounded',
                    });
                });
            }

            scope.createDelivery = function(){
                scope.delivery = {};
                $('#modal-delivery').modal('open');
            }

            scope.excluirSelecionado = function(){
                if(scope.delivery){
                    delivery.delete(scope.delivery.id)
                    .then(function(data){
                        $('#modalExclusaoDelivery').modal('close');
                        if(data.data.success){
                            M.toast({
								html: 'Local de coleta excluído com sucesso!',
								displayLength: 3000,
								classes: 'green rounded',
								completeCallback: function () {
									// scope.clearScreen();
								}
                            });
                            scope.deliverys.splice(scope.positionInList, 1);
                        } else {
                            M.toast({ html: data.data.message, displayLength: 3000, classes: 'red rounded' });
                        }
                    })
                }
            }

            scope.clearScreen();
        }

        ddo.templateUrl = 'js/directives/deliverys/list/deliverys.html';

        return ddo;
    });