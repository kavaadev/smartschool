'use strict';

angular.module('smartschoolApp').controller('EnseignantCoursDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'EnseignantCours', 'Cours', 'Enseignant', 'Classe', 'AnneeScolaire',
        function($scope, $stateParams, $uibModalInstance, entity, EnseignantCours, Cours, Enseignant, Classe, AnneeScolaire) {

        $scope.enseignantCours = entity;
        $scope.courss = Cours.query();
        $scope.enseignants = Enseignant.query();
        $scope.classes = Classe.query();
        $scope.anneescolaires = AnneeScolaire.query();
        $scope.load = function(id) {
            EnseignantCours.get({id : id}, function(result) {
                $scope.enseignantCours = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('smartschoolApp:enseignantCoursUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.enseignantCours.id !== null) {
                EnseignantCours.update($scope.enseignantCours, onSaveSuccess, onSaveError);
            } else {
                EnseignantCours.save($scope.enseignantCours, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
