'use strict';

angular.module('smartschoolApp').controller('InscriptionDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Inscription', 'Classe', 'AnneeScolaire', 'Eleve','ClasseEcole','EleveEcole',
        function($scope, $stateParams, $uibModalInstance, entity, Inscription, Classe, AnneeScolaire, Eleve,ClasseEcole,EleveEcole) {
        $scope.inscription = entity;
        $scope.classes = ClasseEcole.query({id:$stateParams.idecole});
        $scope.eleves = EleveEcole.query({id:$stateParams.idecole});
        $scope.anneescolaires = AnneeScolaire.query({size:5});
        $scope.load = function(id) {
            Inscription.get({id : id}, function(result) {
                $scope.inscription = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('smartschoolApp:inscriptionUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.inscription.id != null) {
                Inscription.update($scope.inscription, onSaveSuccess, onSaveError);
            } else {
                $scope.inscription.redoublant = false;
                Inscription.save($scope.inscription, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
