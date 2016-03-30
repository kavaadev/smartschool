'use strict';

angular.module('smartschoolApp')
    .controller('EnseignantCoursController', function ($scope, $state, EnseignantCours, EnseignantCoursSearch, ParseLinks) {

        $scope.enseignantCourss = [];
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.page = 1;
        $scope.loadAll = function() {
            EnseignantCours.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.totalItems = headers('X-Total-Count');
                $scope.enseignantCourss = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.search = function () {
            EnseignantCoursSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.enseignantCourss = result;
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
            $scope.enseignantCours = {
                id: null
            };
        };
    });
