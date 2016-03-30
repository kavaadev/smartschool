'use strict';

angular.module('smartschoolApp')
    .controller('CycleDetailController', function ($scope, $rootScope, $stateParams, entity, Cycle, ClasseType) {
        $scope.cycle = entity;
        $scope.load = function (id) {
            Cycle.get({id: id}, function(result) {
                $scope.cycle = result;
            });
        };
        var unsubscribe = $rootScope.$on('smartschoolApp:cycleUpdate', function(event, result) {
            $scope.cycle = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
