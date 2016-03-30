'use strict';

angular.module('smartschoolApp').controller('EleveDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Eleve', 'Inscription', 'Pays', 'Profession',
        function($scope, $stateParams, $uibModalInstance, DataUtils, entity, Eleve, Inscription, Pays, Profession) {

        $scope.eleve = entity;
        $scope.inscriptions = Inscription.query();
        $scope.payss = Pays.query({size:1000});
        $scope.professions = Profession.query();
        $scope.load = function(id) {
            Eleve.get({id : id}, function(result) {
                $scope.eleve = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('smartschoolApp:eleveUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            console.log($scope.eleve);
            if ($scope.eleve.id !== null) {
                Eleve.update($scope.eleve, onSaveSuccess, onSaveError);
            } else {
                Eleve.save($scope.eleve, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.abbreviate = DataUtils.abbreviate;

        $scope.byteSize = DataUtils.byteSize;

        $scope.setPhoto = function ($file, eleve) {
            if ($file && $file.$error == 'pattern') {
                return;
            }
            if ($file) {
                var fileReader = new FileReader();
                fileReader.readAsDataURL($file);
                fileReader.onload = function (e) {
                    var base64Data = e.target.result.substr(e.target.result.indexOf('base64,') + 'base64,'.length);
                    $scope.$apply(function() {
                        eleve.photo = base64Data;
                        eleve.photoContentType = $file.type;
                    });
                };
            }
        };
        $scope.datePickerForDateNaissance = {};

        $scope.datePickerForDateNaissance.status = {
            opened: false
        };

        $scope.datePickerForDateNaissanceOpen = function($event) {
            $scope.datePickerForDateNaissance.status.opened = true;
        };
        $scope.datePickerForDatePremiereInscription = {};

        $scope.datePickerForDatePremiereInscription.status = {
            opened: false
        };

        $scope.datePickerForDatePremiereInscriptionOpen = function($event) {
            $scope.datePickerForDatePremiereInscription.status.opened = true;
        };
        $scope.datePickerForDateSortie = {};

        $scope.datePickerForDateSortie.status = {
            opened: false
        };

        $scope.datePickerForDateSortieOpen = function($event) {
            $scope.datePickerForDateSortie.status.opened = true;
        };
}]);
