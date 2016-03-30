'use strict';

angular.module('smartschoolApp')
	.controller('CycleDeleteController', function($scope, $uibModalInstance, entity, Cycle) {

        $scope.cycle = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Cycle.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
