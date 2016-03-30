'use strict';

angular.module('smartschoolApp')
    .controller('SystemeEducatifController', function ($scope, $state, SystemeEducatif, SystemeEducatifSearch, ParseLinks) {

        $scope.systemeEducatifs = [];
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.page = 1;
        $scope.loadAll = function() {
            SystemeEducatif.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.totalItems = headers('X-Total-Count');
                $scope.systemeEducatifs = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.search = function () {
            SystemeEducatifSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.systemeEducatifs = result;
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
            $scope.systemeEducatif = {
                intitule: null,
                abreviation: null,
                description: null,
                id: null
            };
        };
    });
