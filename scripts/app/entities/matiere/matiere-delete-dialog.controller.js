'use strict';

angular.module('smartschoolApp')
	.controller('MatiereDeleteController', function($scope, $uibModalInstance, entity, Matiere) {

        $scope.matiere = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Matiere.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
