'use strict';

angular.module('smartschoolApp').controller('ClasseDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Classe', 'ClasseType', 'Inscription', 'EnseignantCours','Ecole','EcoleClassesType',
        function($scope, $stateParams, $uibModalInstance, entity, Classe, ClasseType, Inscription, EnseignantCours,Ecole,EcoleClassesType) {


        $scope.ecole = Ecole.get({id:$stateParams.idecole});
        $scope.classe = entity;
        $scope.classetypes = EcoleClassesType.query({id:$stateParams.idecole});
        $scope.inscriptions = Inscription.query({size:1000});
        $scope.enseignantcourss = EnseignantCours.query({size:1000});
        $scope.load = function(id) {
            Classe.get({id : id}, function(result) {
                $scope.classe = result;
            });
        };



        var onSaveSuccess = function (result) {
            $scope.$emit('smartschoolApp:classeUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.classe.id != null) {
                Classe.update($scope.classe, onSaveSuccess, onSaveError);
            } else {
                Classe.save($scope.classe, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };


}]);
