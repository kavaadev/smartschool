'use strict';

angular.module('smartschoolApp')
	.controller('InscriptionDeleteController', function($scope, $uibModalInstance, entity, Inscription) {

        $scope.inscription = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Inscription.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
