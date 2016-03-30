'use strict';

angular.module('smartschoolApp')
	.controller('AnneeScolaireDeleteController', function($scope, $uibModalInstance, entity, AnneeScolaire) {

        $scope.anneeScolaire = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            AnneeScolaire.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
