'use strict';

angular.module('smartschoolApp')
    .controller('NoteCoursController', function ($scope, $state, NoteCours, NoteCoursSearch, ParseLinks) {

        $scope.noteCourss = [];
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.page = 1;
        $scope.loadAll = function() {
            NoteCours.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.totalItems = headers('X-Total-Count');
                $scope.noteCourss = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.search = function () {
            NoteCoursSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.noteCourss = result;
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
            $scope.noteCours = {
                note: null,
                commentaire: null,
                id: null
            };
        };
    });
