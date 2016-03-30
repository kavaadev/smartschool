'use strict';

angular.module('smartschoolApp').controller('MatiereDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Matiere', 'Cours', 'Enseignant',
        function($scope, $stateParams, $uibModalInstance, entity, Matiere, Cours, Enseignant) {

        $scope.matiere = entity;
        $scope.courss = Cours.query();
        $scope.enseignants = Enseignant.query();
        $scope.load = function(id) {
            Matiere.get({id : id}, function(result) {
                $scope.matiere = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('smartschoolApp:matiereUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.matiere.id !== null) {
                Matiere.update($scope.matiere, onSaveSuccess, onSaveError);
            } else {
                Matiere.save($scope.matiere, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
