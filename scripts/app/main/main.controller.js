'use strict';

angular.module('smartschoolApp')
    .controller('MainController', function ($scope,$state,$location, Principal,Ecole) {



       $scope.mesecoles = [{
               id : "1",
               intitule : "Ecole de test"
       }];

       $scope.isAuthenticated = false;
       $scope.account = { username : "directeur",
                          password : "directeur"
       };

    });
