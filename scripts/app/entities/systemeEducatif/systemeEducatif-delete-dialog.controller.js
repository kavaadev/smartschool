'use strict';

angular.module('smartschoolApp')
	.controller('SystemeEducatifDeleteController', function($scope, $uibModalInstance, entity, SystemeEducatif) {

        $scope.systemeEducatif = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            SystemeEducatif.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
