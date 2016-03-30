'use strict';

angular.module('smartschoolApp')
    .controller('TypeEnseignementDetailController', function ($scope, $rootScope, $stateParams, entity, TypeEnseignement, ClasseType) {
        $scope.typeEnseignement = entity;
        $scope.load = function (id) {
            TypeEnseignement.get({id: id}, function(result) {
                $scope.typeEnseignement = result;
            });
        };
        var unsubscribe = $rootScope.$on('smartschoolApp:typeEnseignementUpdate', function(event, result) {
            $scope.typeEnseignement = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
