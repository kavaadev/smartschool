'use strict';

angular.module('smartschoolApp')
	.controller('TypeEnseignementDeleteController', function($scope, $uibModalInstance, entity, TypeEnseignement) {

        $scope.typeEnseignement = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            TypeEnseignement.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
