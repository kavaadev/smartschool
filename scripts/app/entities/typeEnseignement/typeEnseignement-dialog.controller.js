'use strict';

angular.module('smartschoolApp').controller('TypeEnseignementDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'TypeEnseignement', 'ClasseType',
        function($scope, $stateParams, $uibModalInstance, entity, TypeEnseignement, ClasseType) {

        $scope.typeEnseignement = entity;
        $scope.classetypes = ClasseType.query();
        $scope.load = function(id) {
            TypeEnseignement.get({id : id}, function(result) {
                $scope.typeEnseignement = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('smartschoolApp:typeEnseignementUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.typeEnseignement.id != null) {
                TypeEnseignement.update($scope.typeEnseignement, onSaveSuccess, onSaveError);
            } else {
                TypeEnseignement.save($scope.typeEnseignement, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
