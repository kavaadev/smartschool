'use strict';

angular.module('smartschoolApp')
	.controller('CoursDeleteController', function($scope, $uibModalInstance, entity, Cours) {

        $scope.cours = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Cours.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
