'use strict';

angular.module('smartschoolApp').controller('OptionnDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Optionn', 'ClasseType',
        function($scope, $stateParams, $uibModalInstance, entity, Optionn, ClasseType) {

        $scope.optionn = entity;
        $scope.classetypes = ClasseType.query();
        $scope.load = function(id) {
            Optionn.get({id : id}, function(result) {
                $scope.optionn = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('smartschoolApp:optionnUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.optionn.id !== null) {
                Optionn.update($scope.optionn, onSaveSuccess, onSaveError);
            } else {
                Optionn.save($scope.optionn, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
