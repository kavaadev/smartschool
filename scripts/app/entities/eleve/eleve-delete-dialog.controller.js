'use strict';

angular.module('smartschoolApp')
	.controller('EleveDeleteController', function($scope, $uibModalInstance, entity, Eleve) {

        $scope.eleve = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Eleve.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
