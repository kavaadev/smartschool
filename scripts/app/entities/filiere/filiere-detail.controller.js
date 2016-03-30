'use strict';

angular.module('smartschoolApp')
    .controller('FiliereDetailController', function ($scope, $rootScope, $stateParams, entity, Filiere, ClasseType) {
        $scope.filiere = entity;
        $scope.load = function (id) {
            Filiere.get({id: id}, function(result) {
                $scope.filiere = result;
            });
        };
        var unsubscribe = $rootScope.$on('smartschoolApp:filiereUpdate', function(event, result) {
            $scope.filiere = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
