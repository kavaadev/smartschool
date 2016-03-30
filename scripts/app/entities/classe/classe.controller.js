'use strict';

angular.module('smartschoolApp')
    .controller('ClasseController', function ($scope, $state, Classe, ClasseSearch, ParseLinks,ClasseRecherche) {

        $scope.classes = [];
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.page = 1;
        $scope.loadAll = function() {
            Classe.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.totalItems = headers('X-Total-Count');
                $scope.classes = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.search = function () {
            ClasseSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.classes = result;
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
            $scope.classe = {
                intitule: null,
                nombreMax: null,
                id: null
            };
        };
    });

angular.module('smartschoolApp')
    .controller('EcoleClassesController', function ($scope,$stateParams,$state, Classe, ClasseSearch, ParseLinks,entity,Ecole,ClasseRecherche,ClasseEcole) {

        $scope.classes = [];
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.page = 1;
        $scope.ecole=entity;
        $scope.loadAll = function() {
            ClasseEcole.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id'],id:$stateParams.idecole}, function(result,headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.totalItems = headers('X-Total-Count');
                $scope.classes = result;

            });
        };

        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.search = function () {
            ClasseSearch.query({query: $scope.searchQuery}, function(result) {

                $scope.classes = result;
            }, function(response) {
                if(response.status === 404) {
                    $scope.loadAll();
                }
            });
        };

        $scope.recherche = function (id) {
                            if(!$scope.searchQuery){
                                $scope.page = 1;
                                ClasseEcole.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id'],id:id}, function(result,headers) {
                                    $scope.links = ParseLinks.parse(headers('link'));
                                    $scope.totalItems = headers('X-Total-Count');
                                    $scope.classes = result;
                                });
                            };
                            if($scope.searchQuery){
                                $scope.page = 1;
                                ClasseRecherche.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id'],id:id,intitule:$scope.searchQuery}, function(result,headers) {
                                       $scope.links = ParseLinks.parse(headers('link'));
                                       $scope.totalItems = headers('X-Total-Count');
                                       $scope.classes = result;
                                }, function(response) {
                                       if(response.status === 404) {
                                       $scope.loadAll();
                                }
                                });
                            };

        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.classe = {
                intitule: null,
                nombreMax: null,
                id: null
            };
        };
    });
