'use strict';

angular.module('smartschoolApp').controller('EmploiDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Emploi', 'EnseignantCours',
        function($scope, $stateParams, $uibModalInstance, entity, Emploi, EnseignantCours) {

        $scope.emploi = entity;
        $scope.enseignantcourss = EnseignantCours.query();
        $scope.load = function(id) {
            Emploi.get({id : id}, function(result) {
                $scope.emploi = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('smartschoolApp:emploiUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.emploi.id != null) {
                Emploi.update($scope.emploi, onSaveSuccess, onSaveError);
            } else {
                Emploi.save($scope.emploi, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
