'use strict';

angular.module('smartschoolApp')
    .controller('EcoleController', function ($scope, $state, Ecole, EcoleSearch, ParseLinks) {

        $scope.ecoles = [];
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.page = 1;
        $scope.loadAll = function() {
            Ecole.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.totalItems = headers('X-Total-Count');
                $scope.ecoles = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.search = function () {
            EcoleSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.ecoles = result;
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
            $scope.ecole = {
                intitule: null,
                adresse: null,
                siteWeb: null,
                categorie: null,
                gpsLatitude: null,
                gpsLongitude: null,
                id: null
            };
        };
    });
