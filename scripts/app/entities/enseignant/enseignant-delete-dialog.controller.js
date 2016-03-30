'use strict';

angular.module('smartschoolApp')
	.controller('EnseignantDeleteController', function($scope, $uibModalInstance, entity, Enseignant) {

        $scope.enseignant = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Enseignant.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
