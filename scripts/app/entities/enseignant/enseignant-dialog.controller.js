'use strict';

angular.module('smartschoolApp').controller('EnseignantDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Enseignant', 'Matiere', 'EnseignantCours', 'Pays',
        function($scope, $stateParams, $uibModalInstance, DataUtils, entity, Enseignant, Matiere, EnseignantCours, Pays) {

        $scope.enseignant = entity;
        $scope.matieres = Matiere.query();
        $scope.enseignantcourss = EnseignantCours.query();
        $scope.payss = Pays.query({size:1000});
        $scope.load = function(id) {
            Enseignant.get({id : id}, function(result) {
                $scope.enseignant = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('smartschoolApp:enseignantUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if($scope.enseignant.vacataire == null){
                $scope.enseignant.vacataire = false;
            }
            if ($scope.enseignant.id !== null) {
                Enseignant.update($scope.enseignant, onSaveSuccess, onSaveError);
            } else {
                Enseignant.save($scope.enseignant, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.abbreviate = DataUtils.abbreviate;

        $scope.byteSize = DataUtils.byteSize;
        $scope.datePickerForDateNaissance = {};

        $scope.datePickerForDateNaissance.status = {
            opened: false
        };

        $scope.datePickerForDateNaissanceOpen = function($event) {
            $scope.datePickerForDateNaissance.status.opened = true;
        };
        $scope.datePickerForDateEntree = {};

        $scope.datePickerForDateEntree.status = {
            opened: false
        };

        $scope.datePickerForDateEntreeOpen = function($event) {
            $scope.datePickerForDateEntree.status.opened = true;
        };

        $scope.setPhoto = function ($file, enseignant) {
            if ($file && $file.$error == 'pattern') {
                return;
            }
            if ($file) {
                var fileReader = new FileReader();
                fileReader.readAsDataURL($file);
                fileReader.onload = function (e) {
                    var base64Data = e.target.result.substr(e.target.result.indexOf('base64,') + 'base64,'.length);
                    $scope.$apply(function() {
                        enseignant.photo = base64Data;
                        enseignant.photoContentType = $file.type;
                    });
                };
            }
        };
}]);
