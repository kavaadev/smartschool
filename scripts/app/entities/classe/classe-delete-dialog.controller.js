'use strict';

angular.module('smartschoolApp')
	.controller('ClasseDeleteController', function($scope, $uibModalInstance, entity, Classe) {

        $scope.classe = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Classe.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
