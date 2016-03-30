'use strict';

angular.module('smartschoolApp').controller('ProfessionDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Profession',
        function($scope, $stateParams, $uibModalInstance, entity, Profession) {

        $scope.profession = entity;
        $scope.load = function(id) {
            Profession.get({id : id}, function(result) {
                $scope.profession = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('smartschoolApp:professionUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.profession.id !== null) {
                Profession.update($scope.profession, onSaveSuccess, onSaveError);
            } else {
                Profession.save($scope.profession, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
