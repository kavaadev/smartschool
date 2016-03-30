'use strict';

angular.module('smartschoolApp').controller('AnneeScolaireDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'AnneeScolaire', 'EnseignantCours', 'Inscription',
        function($scope, $stateParams, $uibModalInstance, entity, AnneeScolaire, EnseignantCours, Inscription) {

        $scope.anneeScolaire = entity;
        $scope.enseignantcourss = EnseignantCours.query();
        $scope.inscriptions = Inscription.query();
        $scope.load = function(id) {
            AnneeScolaire.get({id : id}, function(result) {
                $scope.anneeScolaire = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('smartschoolApp:anneeScolaireUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.anneeScolaire.id !== null) {
                AnneeScolaire.update($scope.anneeScolaire, onSaveSuccess, onSaveError);
            } else {
                AnneeScolaire.save($scope.anneeScolaire, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.datePickerForDateDebut = {};

        $scope.datePickerForDateDebut.status = {
            opened: false
        };

        $scope.datePickerForDateDebutOpen = function($event) {
            $scope.datePickerForDateDebut.status.opened = true;
        };
        $scope.datePickerForDateFin = {};

        $scope.datePickerForDateFin.status = {
            opened: false
        };

        $scope.datePickerForDateFinOpen = function($event) {
            $scope.datePickerForDateFin.status.opened = true;
        };
}]);
