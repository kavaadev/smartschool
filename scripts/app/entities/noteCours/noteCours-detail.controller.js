'use strict';

angular.module('smartschoolApp')
    .controller('NoteCoursDetailController', function ($scope, $rootScope, $stateParams, entity, NoteCours, Cours, Inscription) {
        $scope.noteCours = entity;
        $scope.load = function (id) {
            NoteCours.get({id: id}, function(result) {
                $scope.noteCours = result;
            });
        };
        var unsubscribe = $rootScope.$on('smartschoolApp:noteCoursUpdate', function(event, result) {
            $scope.noteCours = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
