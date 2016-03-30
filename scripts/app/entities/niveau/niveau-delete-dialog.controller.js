'use strict';

angular.module('smartschoolApp')
	.controller('NiveauDeleteController', function($scope, $uibModalInstance, entity, Niveau) {

        $scope.niveau = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Niveau.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
