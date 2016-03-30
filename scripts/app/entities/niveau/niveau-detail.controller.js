'use strict';

angular.module('smartschoolApp')
    .controller('NiveauDetailController', function ($scope, $rootScope, $stateParams, entity, Niveau, ClasseType) {
        $scope.niveau = entity;
        $scope.load = function (id) {
            Niveau.get({id: id}, function(result) {
                $scope.niveau = result;
            });
        };
        var unsubscribe = $rootScope.$on('smartschoolApp:niveauUpdate', function(event, result) {
            $scope.niveau = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
