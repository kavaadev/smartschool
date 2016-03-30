'use strict';

angular.module('smartschoolApp')
    .controller('EmploiController', function ($scope, $state, Emploi, EmploiSearch) {

        $scope.emplois = [];
        $scope.loadAll = function() {
            Emploi.query(function(result) {
               $scope.emplois = result;
            });
        };
        $scope.loadAll();


        $scope.search = function () {
            EmploiSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.emplois = result;
            }, function(response) {
                if(response.status === 404) {
                    $scope.loadAll();
                }
            });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.emploi = {
                title: null,
                start: null,
                end: null,
                backgroundColor: null,
                id: null
            };
        };
    });
