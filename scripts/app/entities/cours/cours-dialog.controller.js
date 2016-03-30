'use strict';

angular.module('smartschoolApp').controller('CoursDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Cours', 'ClasseType', 'EnseignantCours', 'Matiere','EcoleClassesType',
        function($scope, $stateParams, $uibModalInstance, entity, Cours, ClasseType, EnseignantCours, Matiere,EcoleClassesType) {

        $scope.cours = entity;
        $scope.classetypes = EcoleClassesType.query({id:$stateParams.idecole});
        $scope.enseignantcourss = EnseignantCours.query();
        $scope.matieres = Matiere.query();
        $scope.load = function(id) {
            Cours.get({id : id}, function(result) {
                $scope.cours = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('smartschoolApp:coursUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.cours.id !== null) {
                Cours.update($scope.cours, onSaveSuccess, onSaveError);
            } else {
                Cours.save($scope.cours, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
