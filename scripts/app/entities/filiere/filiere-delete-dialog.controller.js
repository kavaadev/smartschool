'use strict';

angular.module('smartschoolApp')
	.controller('FiliereDeleteController', function($scope, $uibModalInstance, entity, Filiere) {

        $scope.filiere = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Filiere.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
