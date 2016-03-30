'use strict';

angular.module('smartschoolApp').controller('EcoleDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Ecole', 'Directeur', 'Pays', 'Region', 'Ville', 'ClasseType',
        function($scope, $stateParams, $uibModalInstance, entity, Ecole, Directeur, Pays, Region, Ville, ClasseType) {

        $scope.ecole = entity;
        $scope.users = Directeur.query();
        $scope.payss = Pays.query({size:1000});
        $scope.regions = Region.query({size:1000});
        $scope.villes = Ville.query({size:1000});
        $scope.classetypes = ClasseType.query({size:1000});
        $scope.load = function(id) {
            Ecole.get({id : id}, function(result) {
                $scope.ecole = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('smartschoolApp:ecoleUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.ecole.id !== null) {
                Ecole.update($scope.ecole, onSaveSuccess, onSaveError);
            } else {
                Ecole.save($scope.ecole, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);

'use strict';

angular.module('smartschoolApp').controller('EcoleDialogConfigController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Ecole', 'Directeur', 'Pays', 'Region', 'Ville', 'ClasseType','AnneeScolaire',
        function($scope, $stateParams, $uibModalInstance, entity, Ecole, Directeur, Pays, Region, Ville, ClasseType,AnneeScolaire) {

        $scope.ecole = entity;
        $scope.users = Directeur.query();
        $scope.payss = Pays.query({size:1000});
        $scope.regions = Region.query({size:1000});
        $scope.villes = Ville.query({size:1000});
        $scope.anneescolaires = AnneeScolaire.query();
        $scope.classetypes = ClasseType.query({size:1000});
        $scope.load = function(id) {
            Ecole.get({id : id}, function(result) {
                $scope.ecole = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('smartschoolApp:ecoleUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.ecole.id != null) {
                Ecole.update($scope.ecole, onSaveSuccess, onSaveError);
            } else {
                Ecole.save($scope.ecole, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);

