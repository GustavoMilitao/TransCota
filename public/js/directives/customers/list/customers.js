angular.module('transcotaDiretivas')
    .directive('customers', function (customer) {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.transclude = true;


        ddo.scope = {
            customers : "@",
            searchText : "@",
            customer : "@",
            positionInList : "@"
        };

        ddo.link = function(scope, elem, attrs){
            scope.clearScreen = function () {
                scope.customers = [];
                scope.customer = {};
                scope.searchText = "";
                scope.customer = {};
			}
			customer.get().then(function(data, position){
                scope.customers = data.data;
                scope.positionInList = position;
            });
            scope.wantToDelete = function(customer){
                scope.customer = customer;
                $('#modal-exclusao').modal('open');
            }

            scope.editCustomer = function(customer){
                scope.customer = customer;
                $('#modal-customer').modal('open');
            }

            scope.registerFinished = function(){
                $('.btn-load').button('loading');
                customer.get().then(function(data){
                    scope.customers = data.data;
                    $('.btn-load').button('reset');
                    $('#modal-customer').modal('close');
                    M.toast({
                        html: 'Cliente registrado com sucesso!',
                        displayLength: 3000,
                        classes: 'green rounded',
                    });
                });
            }

            scope.onEditEnd = function(){
                $('.btn-load').button('loading');
                customer.get().then(function(data){
                    scope.customers = data.data;
                    $('.btn-load').button('reset');
                    $('#modal-customer').modal('close');
                    M.toast({
                        html: 'Cliente alterado com sucesso!',
                        displayLength: 3000,
                        classes: 'green rounded',
                    });
                });
            }

            scope.createCustomer = function(){
                scope.customer = {};
                $('#modal-customer').modal('open');
            }

            scope.excluirSelecionado = function(){
                if(scope.customer){
                    customer.delete(scope.customer.id)
                    .then(function(data){
                        $('#modal-exclusao').modal('close');
                        if(data.data.success){
                            M.toast({
								html: 'Cliente excluído com sucesso!',
								displayLength: 3000,
								classes: 'green rounded',
								completeCallback: function () {
									// scope.clearScreen();
								}
                            });
                            scope.customers.splice(scope.positionInList, 1);
                        } else {
                            M.toast({ html: data.data.message, displayLength: 3000, classes: 'red rounded' });
                        }
                    })
                }
            }

            scope.clearScreen();
        }

        ddo.templateUrl = 'js/directives/customers/list/customers.html';

        return ddo;
    });