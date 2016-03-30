'use strict';

angular.module('smartschoolApp')
    .controller('EmploiDetailController', function ($scope, $rootScope, $stateParams, entity, Emploi, EnseignantCours) {
        $scope.emploi = entity;
        $scope.load = function (id) {
            Emploi.get({id: id}, function(result) {
                $scope.emploi = result;
            });
        };
        var unsubscribe = $rootScope.$on('smartschoolApp:emploiUpdate', function(event, result) {
            $scope.emploi = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
