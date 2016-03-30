'use strict';

angular.module('smartschoolApp').controller('ClasseTypeDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'ClasseType', 'TypeEnseignement', 'Cycle', 'Niveau', 'Filiere', 'Serie', 'Optionn','SystemeEducatif',
        function($scope, $stateParams, $uibModalInstance, entity, ClasseType, TypeEnseignement, Cycle, Niveau, Filiere, Serie, Optionn,SystemeEducatif) {

        $scope.classeType = entity;
        $scope.typeenseignements = TypeEnseignement.query({size:1000});
        $scope.cycles = Cycle.query({size:1000});
        $scope.systemes = SystemeEducatif.query({size:1000});
        $scope.niveaus = Niveau.query({size:1000});
        $scope.filieres = Filiere.query({size:1000});
        $scope.series = Serie.query({size:1000});
        $scope.optionns = Optionn.query({size:1000});
        $scope.load = function(id) {
            ClasseType.get({id : id}, function(result) {
                $scope.classeType = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('smartschoolApp:classeTypeUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.classeType.id !== null) {
                ClasseType.update($scope.classeType, onSaveSuccess, onSaveError);
            } else {
                ClasseType.save($scope.classeType, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.datePickerForDateCreation = {};

        $scope.datePickerForDateCreation.status = {
            opened: false
        };

        $scope.datePickerForDateCreationOpen = function($event) {
            $scope.datePickerForDateCreation.status.opened = true;
        };
}]);
