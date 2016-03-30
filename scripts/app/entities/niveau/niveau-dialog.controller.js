'use strict';

angular.module('smartschoolApp').controller('NiveauDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Niveau', 'ClasseType',
        function($scope, $stateParams, $uibModalInstance, entity, Niveau, ClasseType) {

        $scope.niveau = entity;
        $scope.classetypes = ClasseType.query();
        $scope.load = function(id) {
            Niveau.get({id : id}, function(result) {
                $scope.niveau = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('smartschoolApp:niveauUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.niveau.id !== null) {
                Niveau.update($scope.niveau, onSaveSuccess, onSaveError);
            } else {
                Niveau.save($scope.niveau, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
