'use strict';

angular.module('smartschoolApp')
    .controller('MainController', function ($scope,$state,$location, Principal,Ecole) {



        $scope.mesecoles = [];
        $scope.ecoles = Ecole.query({size:1000});

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
