'use strict';

angular.module('smartschoolApp')
	.controller('VilleDeleteController', function($scope, $uibModalInstance, entity, Ville) {

        $scope.ville = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Ville.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
