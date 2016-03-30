'use strict';

angular.module('smartschoolApp')
	.controller('ClasseTypeDeleteController', function($scope, $uibModalInstance, entity, ClasseType) {

        $scope.classeType = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            ClasseType.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
