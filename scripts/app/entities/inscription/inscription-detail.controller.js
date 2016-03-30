'use strict';

angular.module('smartschoolApp')
    .controller('InscriptionDetailController', function ($scope, $rootScope, $stateParams, entity, Inscription, Classe, AnneeScolaire, Eleve) {
        $scope.inscription = entity;
        $scope.load = function (id) {
            Inscription.get({id: id}, function(result) {
                $scope.inscription = result;
            });
        };
        var unsubscribe = $rootScope.$on('smartschoolApp:inscriptionUpdate', function(event, result) {
            $scope.inscription = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
