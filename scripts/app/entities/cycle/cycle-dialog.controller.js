'use strict';

angular.module('smartschoolApp').controller('CycleDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Cycle', 'ClasseType',
        function($scope, $stateParams, $uibModalInstance, entity, Cycle, ClasseType) {

        $scope.cycle = entity;
        $scope.classetypes = ClasseType.query();
        $scope.load = function(id) {
            Cycle.get({id : id}, function(result) {
                $scope.cycle = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('smartschoolApp:cycleUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.cycle.id !== null) {
                Cycle.update($scope.cycle, onSaveSuccess, onSaveError);
            } else {
                Cycle.save($scope.cycle, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
