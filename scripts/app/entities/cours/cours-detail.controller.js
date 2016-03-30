'use strict';

angular.module('smartschoolApp')
    .controller('CoursDetailController', function ($scope, $rootScope, $stateParams, entity, Cours, ClasseType, EnseignantCours, Matiere) {
        $scope.cours = entity;
        $scope.load = function (id) {
            Cours.get({id: id}, function(result) {
                $scope.cours = result;
            });
        };
        var unsubscribe = $rootScope.$on('smartschoolApp:coursUpdate', function(event, result) {
            $scope.cours = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
