'use strict';

angular.module('smartschoolApp')
    .controller('InscriptionController', function ($scope, $state, Inscription, InscriptionSearch, ParseLinks, InscriptionRecherche) {

        $scope.inscriptions = [];
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.page = 1;
        $scope.loadAll = function() {
            Inscription.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.totalItems = headers('X-Total-Count');
                $scope.inscriptions = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.search = function () {
            InscriptionSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.inscriptions = result;
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
            $scope.inscription = {
                situation: null,
                id: null
            };
        };
    });

angular.module('smartschoolApp')
    .controller('EcoleInscriptionsController', function ($scope, $state, $stateParams,Inscription,AnneeScolaireFromEcole, AnneeScolaire,InscriptionSearch, ParseLinks,entity,Ecole,InscriptionRecherche,InscriptionByEcoleAndAnneeScolaire) {

        $scope.mesinscriptions = [];
        $scope.ecole = entity;
        $scope.anneescolaires = AnneeScolaire.query({size:5});

        $scope.inscriptions = [];
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.page = 1;




        $scope.filterByAS = function(){
            $scope.anneescolaireCourante = $scope.anneeScolaireC.id;
            $scope.loadAllForFilter($scope.anneeScolaireC.id);
        };


        $scope.loadAll = function() {

            Ecole.get({id:$stateParams.idecole}, function(result) {
                                       $scope.ecole = result;
                                       $scope.anneeScolaireC = result.anneeScolaire;
                                       $scope.anneescolaireCourante = $scope.anneeScolaireC.id;
                                       InscriptionByEcoleAndAnneeScolaire.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id'],idecole:$scope.ecole.id ,idAnneeScolaire:$scope.anneescolaireCourante}, function(result, headers) {
                                                       $scope.links = ParseLinks.parse(headers('link'));
                                                       $scope.totalItems = headers('X-Total-Count');
                                                       $scope.inscriptions = result;

                                       });
            });

        };

        $scope.loadAllForFilter = function(anneeScolaire) {

                    Ecole.get({id:$stateParams.idecole}, function(result) {
                                               $scope.ecole = result;
                                               InscriptionByEcoleAndAnneeScolaire.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id'],idecole:$scope.ecole.id ,idAnneeScolaire:anneeScolaire}, function(result, headers) {
                                                               $scope.links = ParseLinks.parse(headers('link'));
                                                               $scope.totalItems = headers('X-Total-Count');
                                                               $scope.inscriptions = result;

                                               });
                    });

        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.search = function () {
            InscriptionSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.inscriptions = result;
            }, function(response) {
                if(response.status === 404) {
                    $scope.loadAll();
                }
            });
        };

        $scope.recherche = function (id) {
                                       if($scope.searchQuery!= null && $scope.searchQuery!= "" && $scope.searchQuery ){

                                        InscriptionRecherche.query({id:$scope.ecole.id,idAnneeScolaire:$scope.anneeScolaireC.id,nom:$scope.searchQuery},function(result){
                                               $scope.inscriptions = result;

                                        });



                                        }
                                        else{
                                         $scope.filterByAS();
                                                                                 }
         };


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.inscription = {
                situation: null,
                id: null
            };
        };
    });

