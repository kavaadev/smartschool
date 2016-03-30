'use strict';

angular.module('smartschoolApp')
    .controller('OptionnDetailController', function ($scope, $rootScope, $stateParams, entity, Optionn, ClasseType) {
        $scope.optionn = entity;
        $scope.load = function (id) {
            Optionn.get({id: id}, function(result) {
                $scope.optionn = result;
            });
        };
        var unsubscribe = $rootScope.$on('smartschoolApp:optionnUpdate', function(event, result) {
            $scope.optionn = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
