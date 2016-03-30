'use strict';

angular.module('smartschoolApp')
    .controller('ClasseTypeDetailController', function ($scope, $rootScope, $stateParams, entity, ClasseType, TypeEnseignement, Cycle, Niveau, Filiere, Serie, Optionn) {
        $scope.classeType = entity;
        $scope.load = function (id) {
            ClasseType.get({id: id}, function(result) {
                $scope.classeType = result;
            });
        };
        var unsubscribe = $rootScope.$on('smartschoolApp:classeTypeUpdate', function(event, result) {
            $scope.classeType = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
