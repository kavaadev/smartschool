'use strict';

angular.module('smartschoolApp').controller('FiliereDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Filiere', 'ClasseType',
        function($scope, $stateParams, $uibModalInstance, entity, Filiere, ClasseType) {

        $scope.filiere = entity;
        $scope.classetypes = ClasseType.query();
        $scope.load = function(id) {
            Filiere.get({id : id}, function(result) {
                $scope.filiere = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('smartschoolApp:filiereUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.filiere.id != null) {
                Filiere.update($scope.filiere, onSaveSuccess, onSaveError);
            } else {
                Filiere.save($scope.filiere, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
