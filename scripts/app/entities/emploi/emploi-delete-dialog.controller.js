'use strict';

angular.module('smartschoolApp')
	.controller('EmploiDeleteController', function($scope, $uibModalInstance, entity, Emploi) {

        $scope.emploi = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Emploi.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
