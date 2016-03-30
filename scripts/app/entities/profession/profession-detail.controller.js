'use strict';

angular.module('smartschoolApp')
    .controller('ProfessionDetailController', function ($scope, $rootScope, $stateParams, entity, Profession) {
        $scope.profession = entity;
        $scope.load = function (id) {
            Profession.get({id: id}, function(result) {
                $scope.profession = result;
            });
        };
        var unsubscribe = $rootScope.$on('smartschoolApp:professionUpdate', function(event, result) {
            $scope.profession = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
