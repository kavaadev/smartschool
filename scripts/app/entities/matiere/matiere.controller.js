'use strict';

angular.module('smartschoolApp')
    .controller('MatiereController', function ($scope, $state, Matiere, MatiereSearch, ParseLinks) {

        $scope.matieres = [];
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.page = 1;
        $scope.loadAll = function() {
            Matiere.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.totalItems = headers('X-Total-Count');
                $scope.matieres = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.search = function () {
            MatiereSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.matieres = result;
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
            $scope.matiere = {
                intitule: null,
                abreviation: null,
                id: null
            };
        };
    });



angular.module('smartschoolApp')
    .controller('EcoleMatieresController', function ($scope, $state, Matiere, MatiereSearch, ParseLinks,entity,Ecole) {

        $scope.mesmatieres = [];
        $scope.matieres = [];
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.page = 1;
        $scope.ecole = entity;
        $scope.load = function (id) {
                                           Ecole.get({id: id}, function(result) {
                                           $scope.ecole = result;
                                           Matiere.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                                                             $scope.links = ParseLinks.parse(headers('link'));
                                                             $scope.totalItems = headers('X-Total-Count');
                                                             $scope.mesmatieres = result;
                                                             angular.forEach($scope.mesmatieres, function (item) {
                                                                   if(item.ecole){
                                                                          if(item.ecole.id == $scope.ecole.id){
                                                                                  $scope.matieres.push(item);
                                                                          }
                                                                   }

                                                             });

                                                         });

                                           });
        };
        $scope.loadAll = function() {
            Matiere.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.totalItems = headers('X-Total-Count');
                $scope.mesmatieres = result;
                angular.forEach($scope.mesmatieres, function (item) {
                          if(item.ecole){
                                                                                       if(item.ecole.id == $scope.ecole.id){
                                                                                               $scope.matieres.push(item);
                                                                                       }}
                                                                                });
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.search = function () {
            MatiereSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.matieres = result;
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
            $scope.matiere = {
                intitule: null,
                abreviation: null,
                id: null
            };
        };
    });
