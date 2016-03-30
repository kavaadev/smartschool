'use strict';

angular.module('smartschoolApp')
	.controller('NoteCoursDeleteController', function($scope, $uibModalInstance, entity, NoteCours) {

        $scope.noteCours = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            NoteCours.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
