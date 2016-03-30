'use strict';

angular.module('smartschoolApp').controller('VilleDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Ville', 'Region', 'Ecole',
        function($scope, $stateParams, $uibModalInstance, entity, Ville, Region, Ecole) {

        $scope.ville = entity;
        $scope.regions = Region.query();
        $scope.ecoles = Ecole.query();
        $scope.load = function(id) {
            Ville.get({id : id}, function(result) {
                $scope.ville = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('smartschoolApp:villeUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.ville.id != null) {
                Ville.update($scope.ville, onSaveSuccess, onSaveError);
            } else {
                Ville.save($scope.ville, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
