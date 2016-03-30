'use strict';

angular.module('smartschoolApp')
    .controller('SystemeEducatifDetailController', function ($scope, $rootScope, $stateParams, entity, SystemeEducatif, ClasseType) {
        $scope.systemeEducatif = entity;
        $scope.load = function (id) {
            SystemeEducatif.get({id: id}, function(result) {
                $scope.systemeEducatif = result;
            });
        };
        var unsubscribe = $rootScope.$on('smartschoolApp:systemeEducatifUpdate', function(event, result) {
            $scope.systemeEducatif = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
