'use strict';

angular.module('smartschoolApp').controller('SystemeEducatifDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'SystemeEducatif', 'ClasseType',
        function($scope, $stateParams, $uibModalInstance, entity, SystemeEducatif, ClasseType) {

        $scope.systemeEducatif = entity;
        $scope.classetypes = ClasseType.query();
        $scope.load = function(id) {
            SystemeEducatif.get({id : id}, function(result) {
                $scope.systemeEducatif = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('smartschoolApp:systemeEducatifUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.systemeEducatif.id !== null) {
                SystemeEducatif.update($scope.systemeEducatif, onSaveSuccess, onSaveError);
            } else {
                SystemeEducatif.save($scope.systemeEducatif, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
