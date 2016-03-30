'use strict';

angular.module('smartschoolApp')
    .controller('RegionDetailController', function ($scope, $rootScope, $stateParams, entity, Region, Pays, Ville, Ecole) {
        $scope.region = entity;
        $scope.load = function (id) {
            Region.get({id: id}, function(result) {
                $scope.region = result;
            });
        };
        var unsubscribe = $rootScope.$on('smartschoolApp:regionUpdate', function(event, result) {
            $scope.region = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
