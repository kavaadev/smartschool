'use strict';

angular.module('smartschoolApp')
	.controller('EcoleDeleteController', function($scope, $uibModalInstance, entity, Ecole) {

        $scope.ecole = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Ecole.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
