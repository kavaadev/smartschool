'use strict';

angular.module('smartschoolApp')
	.controller('EnseignantCoursDeleteController', function($scope, $uibModalInstance, entity, EnseignantCours) {

        $scope.enseignantCours = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            EnseignantCours.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
