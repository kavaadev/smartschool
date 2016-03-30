'use strict';

angular.module('smartschoolApp')
    .controller('TypeEnseignementController', function ($scope, $state, TypeEnseignement, TypeEnseignementSearch, ParseLinks) {

        $scope.typeEnseignements = [];
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.page = 1;
        $scope.loadAll = function() {
            TypeEnseignement.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.totalItems = headers('X-Total-Count');
                $scope.typeEnseignements = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.search = function () {
            TypeEnseignementSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.typeEnseignements = result;
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
            $scope.typeEnseignement = {
                intitule: null,
                id: null
            };
        };
    });
