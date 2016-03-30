'use strict';

angular.module('smartschoolApp').controller('NoteCoursDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'NoteCours', 'Cours', 'Inscription',
        function($scope, $stateParams, $uibModalInstance, entity, NoteCours, Cours, Inscription) {

        $scope.noteCours = entity;
        $scope.courss = Cours.query();
        $scope.inscriptions = Inscription.query();
        $scope.load = function(id) {
            NoteCours.get({id : id}, function(result) {
                $scope.noteCours = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('smartschoolApp:noteCoursUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.noteCours.id != null) {
                NoteCours.update($scope.noteCours, onSaveSuccess, onSaveError);
            } else {
                NoteCours.save($scope.noteCours, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
