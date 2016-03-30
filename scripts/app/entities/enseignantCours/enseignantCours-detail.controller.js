'use strict';

angular.module('smartschoolApp')
    .controller('EnseignantCoursDetailController', function ($scope, $rootScope, $stateParams, entity, EnseignantCours, Cours, Enseignant, Classe, AnneeScolaire) {
        $scope.enseignantCours = entity;
        $scope.load = function (id) {
            EnseignantCours.get({id: id}, function(result) {
                $scope.enseignantCours = result;
            });
        };
        var unsubscribe = $rootScope.$on('smartschoolApp:enseignantCoursUpdate', function(event, result) {
            $scope.enseignantCours = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
