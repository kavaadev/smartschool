'use strict';

angular.module('smartschoolApp')
    .controller('NavbarController', function ($scope, $location, $state, Auth, Principal, ENV,Ecole) {

        $scope.mesecoles = [];
        $scope.ecoles = Ecole.query({size:1000});
        $scope.isAuthenticated = Principal.isAuthenticated;
        $scope.$state = $state;
        $scope.inProduction = ENV === 'prod';
        $scope.logout = function () {
            Auth.logout();
            $state.go('login');
        };

        Principal.identity().then(function(account) {
                    $scope.account = account;
                    $scope.isAuthenticated = Principal.isAuthenticated;


                    $scope.ecoles = Ecole.query(function (response) {
                                angular.forEach(response, function (item) {
                                        if(item.user){
                                        if(item.user.login == $scope.account.login){
                                            $scope.mesecoles.push(item);
                                        }}

                                });
                            });
                });









    });
