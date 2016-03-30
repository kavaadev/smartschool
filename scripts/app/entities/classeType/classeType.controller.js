'use strict';

angular.module('smartschoolApp')
    .controller('ClasseTypeController', function ($scope, $state, ClasseType, ClasseTypeSearch, ParseLinks) {

        $scope.classeTypes = [];
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.page = 1;
        $scope.loadAll = function() {
            ClasseType.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.totalItems = headers('X-Total-Count');
                $scope.classeTypes = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.search = function () {
            ClasseTypeSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.classeTypes = result;
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
            $scope.classeType = {
                intitule: null,
                dateCreation: null,
                id: null
            };
        };
    });
