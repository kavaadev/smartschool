'use strict';

angular.module('smartschoolApp')
    .controller('CoursController', function ($scope, $state, Cours, CoursSearch, ParseLinks) {

        $scope.courss = [];
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.page = 1;
        $scope.loadAll = function() {
            Cours.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.totalItems = headers('X-Total-Count');
                $scope.courss = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.search = function () {
            CoursSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.courss = result;
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
            $scope.cours = {
                intitule: null,
                coefficient: null,
                optionnel: null,
                id: null
            };
        };
    })
    .controller('EcoleCoursController', function ($scope, $state, Cours, CoursSearch, ParseLinks,entity,Ecole) {
            $scope.ecole = entity;
            $scope.mescours=[];
            $scope.courss = [];
            $scope.predicate = 'id';
            $scope.reverse = true;
            $scope.page = 1;

            $scope.load = function (id) {
                        Ecole.get({id: id}, function(result) {
                            Cours.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                                            $scope.links = ParseLinks.parse(headers('link'));
                                            $scope.totalItems = headers('X-Total-Count');
                                            $scope.mescours = result;
                                            angular.forEach($scope.mescours, function (item) {
                                                   if(item.ecole){
                                                          if(item.ecole.id == $scope.ecole.id){
                                                                 $scope.courss.push(item);
                                                          }
                                                   }

                                            });
                            });

                        });
                    };
            $scope.loadAll = function() {
                Cours.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                    $scope.links = ParseLinks.parse(headers('link'));
                    $scope.totalItems = headers('X-Total-Count');
                    $scope.mescours = result;
                    angular.forEach($scope.mescours, function (item) {
                                                                               if(item.ecole){
                                                                                      if(item.ecole.id == $scope.ecole.id){
                                                                                             $scope.courss.push(item);
                                                                                      }
                                                                               }

                                        });
                });
            };
            $scope.loadPage = function(page) {
                $scope.page = page;
                $scope.loadAll();
            };
            $scope.loadAll();


            $scope.search = function () {
                CoursSearch.query({query: $scope.searchQuery}, function(result) {
                    $scope.courss = result;
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
                $scope.cours = {
                    intitule: null,
                    coefficient: null,
                    optionnel: null,
                    id: null
                };
            };
        });
