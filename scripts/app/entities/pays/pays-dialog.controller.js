'use strict';

angular.module('smartschoolApp').controller('PaysDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Pays', 'Ecole', 'Region',
        function($scope, $stateParams, $uibModalInstance, entity, Pays, Ecole, Region) {

        $scope.pays = entity;
        $scope.ecoles = Ecole.query();
        $scope.regions = Region.query();
        $scope.load = function(id) {
            Pays.get({id : id}, function(result) {
                $scope.pays = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('smartschoolApp:paysUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.pays.id !== null) {
                Pays.update($scope.pays, onSaveSuccess, onSaveError);
            } else {
                Pays.save($scope.pays, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
