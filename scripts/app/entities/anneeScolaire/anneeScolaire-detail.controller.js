'use strict';

angular.module('smartschoolApp')
    .controller('AnneeScolaireDetailController', function ($scope, $rootScope, $stateParams, entity, AnneeScolaire, EnseignantCours, Inscription) {
        $scope.anneeScolaire = entity;
        $scope.load = function (id) {
            AnneeScolaire.get({id: id}, function(result) {
                $scope.anneeScolaire = result;
            });
        };
        var unsubscribe = $rootScope.$on('smartschoolApp:anneeScolaireUpdate', function(event, result) {
            $scope.anneeScolaire = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
