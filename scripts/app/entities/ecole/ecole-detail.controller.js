'use strict';

angular.module('smartschoolApp')
    .controller('EcoleDetailController', function ($scope,$state, $rootScope, $stateParams, entity, Ecole, User, Pays, Region, Ville, ClasseType,Principal) {

            $scope.ecole = entity;

            Principal.identity().then(function(account) {
                        $scope.account = account;
                        $scope.isAuthenticated = Principal.isAuthenticated;


                        $scope.load = function (id) {
                            Ecole.get({id: id}, function(result) {
                                $scope.ecole = result;
                            });
                        };
                        $scope.ecole.$promise.then(function(data) {
                            if(data.user){
                               if(data.user.login !=$scope.account.login && $.inArray('ADMIN_DIRECTEUR', $scope.account.authorities) > -1){
                                    $state.go("home");
                               }
                               }
                           });


            });






        var unsubscribe = $rootScope.$on('smartschoolApp:ecoleUpdate', function(event, result) {
            $scope.ecole = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
