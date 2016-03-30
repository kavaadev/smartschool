'use strict';

angular.module('smartschoolApp')
    .controller('SerieDetailController', function ($scope, $rootScope, $stateParams, entity, Serie, ClasseType) {
        $scope.serie = entity;
        $scope.load = function (id) {
            Serie.get({id: id}, function(result) {
                $scope.serie = result;
            });
        };
        var unsubscribe = $rootScope.$on('smartschoolApp:serieUpdate', function(event, result) {
            $scope.serie = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
