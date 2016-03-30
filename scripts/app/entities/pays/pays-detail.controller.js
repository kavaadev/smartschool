'use strict';

angular.module('smartschoolApp')
    .controller('PaysDetailController', function ($scope, $rootScope, $stateParams, entity, Pays, Ecole, Region) {
        $scope.pays = entity;
        $scope.load = function (id) {
            Pays.get({id: id}, function(result) {
                $scope.pays = result;
            });
        };
        var unsubscribe = $rootScope.$on('smartschoolApp:paysUpdate', function(event, result) {
            $scope.pays = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
