'use strict';

angular.module('smartschoolApp')
	.controller('OptionnDeleteController', function($scope, $uibModalInstance, entity, Optionn) {

        $scope.optionn = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Optionn.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
