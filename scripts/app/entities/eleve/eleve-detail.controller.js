'use strict';

angular.module('smartschoolApp')
    .controller('EleveDetailController', function ($scope, $rootScope, $stateParams, DataUtils, entity, Eleve, Inscription, Pays, Profession) {
        $scope.eleve = entity;
        $scope.load = function (id) {
            Eleve.get({id: id}, function(result) {
                $scope.eleve = result;
            });
        };
        var unsubscribe = $rootScope.$on('smartschoolApp:eleveUpdate', function(event, result) {
            $scope.eleve = result;
        });
        $scope.$on('$destroy', unsubscribe);

        $scope.byteSize = DataUtils.byteSize;
    });
