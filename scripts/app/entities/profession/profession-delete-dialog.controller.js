'use strict';

angular.module('smartschoolApp')
	.controller('ProfessionDeleteController', function($scope, $uibModalInstance, entity, Profession) {

        $scope.profession = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Profession.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
