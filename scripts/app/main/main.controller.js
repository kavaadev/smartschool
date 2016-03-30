'use strict';

angular.module('smartschoolApp')
    .controller('MainController', function ($scope,$state,$location) {



       $scope.mesecoles = [{
               id : "1",
               intitule : "Ecole de test"
       }];

       $scope.isAuthenticated = function(){
                   return true;
       };
       
       $scope.account = { username : "directeur",
                          password : "directeur"
       };

    });
