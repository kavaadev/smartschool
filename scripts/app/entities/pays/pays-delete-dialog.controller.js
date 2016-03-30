'use strict';

angular.module('smartschoolApp')
	.controller('PaysDeleteController', function($scope, $uibModalInstance, entity, Pays) {

        $scope.pays = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Pays.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
