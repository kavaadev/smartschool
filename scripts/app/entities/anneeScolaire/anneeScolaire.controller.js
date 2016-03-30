'use strict';

angular.module('smartschoolApp')
    .controller('AnneeScolaireController', function ($scope, $state, AnneeScolaire, AnneeScolaireSearch, ParseLinks) {

        $scope.anneeScolaires = [];
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.page = 1;
        $scope.loadAll = function() {
            AnneeScolaire.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.totalItems = headers('X-Total-Count');
                $scope.anneeScolaires = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.search = function () {
            AnneeScolaireSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.anneeScolaires = result;
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
            $scope.anneeScolaire = {
                intitule: null,
                dateDebut: null,
                dateFin: null,
                id: null
            };
        };
    });
