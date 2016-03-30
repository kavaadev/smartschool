'use strict';

angular.module('smartschoolApp')
    .controller('MatiereDetailController', function ($scope, $rootScope, $stateParams, entity, Matiere, Cours, Enseignant) {
        $scope.matiere = entity;
        $scope.load = function (id) {
            Matiere.get({id: id}, function(result) {
                $scope.matiere = result;
            });
        };
        var unsubscribe = $rootScope.$on('smartschoolApp:matiereUpdate', function(event, result) {
            $scope.matiere = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
