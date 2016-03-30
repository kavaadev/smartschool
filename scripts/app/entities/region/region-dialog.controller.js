'use strict';

angular.module('smartschoolApp').controller('RegionDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Region', 'Pays', 'Ville', 'Ecole',
        function($scope, $stateParams, $uibModalInstance, entity, Region, Pays, Ville, Ecole) {

        $scope.region = entity;
        $scope.payss = Pays.query();
        $scope.villes = Ville.query();
        $scope.ecoles = Ecole.query();
        $scope.load = function(id) {
            Region.get({id : id}, function(result) {
                $scope.region = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('smartschoolApp:regionUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.region.id !== null) {
                Region.update($scope.region, onSaveSuccess, onSaveError);
            } else {
                Region.save($scope.region, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
