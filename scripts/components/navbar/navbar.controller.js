'use strict';

angular.module('smartschoolApp')
    .controller('NavbarController', function ($scope, $location, $state, Auth, Principal, ENV) {

        $scope.mesecoles = [{
                                id : "1",
                                intitule : "Ecole de test"
                            }];

        $scope.isAuthenticated = false;
        $scope.$state = $state;
        $scope.inProduction = ENV === 'prod';

        $scope.logout = function () {
            $state.go('login');
        };

        $scope.account = { username : "directeur",
             password : "directeur"
        };

        $scope.isAuthenticated = false;









    });
