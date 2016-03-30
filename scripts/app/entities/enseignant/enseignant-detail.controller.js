'use strict';

angular.module('smartschoolApp')
    .controller('EnseignantDetailController', function ($scope, $rootScope, $stateParams, DataUtils, entity, Enseignant, Matiere, EnseignantCours, Pays) {
        $scope.enseignant = entity;
        $scope.load = function (id) {
            Enseignant.get({id: id}, function(result) {
                $scope.enseignant = result;
            });
        };
        var unsubscribe = $rootScope.$on('smartschoolApp:enseignantUpdate', function(event, result) {
            $scope.enseignant = result;
        });
        $scope.$on('$destroy', unsubscribe);

        $scope.byteSize = DataUtils.byteSize;
    });
