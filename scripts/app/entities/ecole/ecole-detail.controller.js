'use strict';

angular.module('smartschoolApp')
    .controller('EcoleDetailController', function ($scope,$state, $rootScope, $stateParams) {

            $scope.ecole = {
                id:"1",
                intitule : "ecole de test"
            };
    });
