'use strict';

angular.module('smartschoolApp')
    .controller('VilleDetailController', function ($scope, $rootScope, $stateParams, entity, Ville, Region, Ecole) {
        $scope.ville = entity;
        $scope.load = function (id) {
            Ville.get({id: id}, function(result) {
                $scope.ville = result;
            });
        };
        var unsubscribe = $rootScope.$on('smartschoolApp:villeUpdate', function(event, result) {
            $scope.ville = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
