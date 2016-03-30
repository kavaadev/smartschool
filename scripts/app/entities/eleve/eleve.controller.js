'use strict';

angular.module('smartschoolApp')
    .controller('EleveController', function ($scope, $state, DataUtils, Eleve, EleveSearch, ParseLinks) {

        $scope.eleves = [];
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.page = 1;
        $scope.loadAll = function() {
            Eleve.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.totalItems = headers('X-Total-Count');
                $scope.eleves = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.search = function () {
            EleveSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.eleves = result;
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
            $scope.eleve = {
                nom: null,
                prenom: null,
                telParent: null,
                adresse: null,
                photo: null,
                photoContentType: null,
                mail: null,
                dateNaissance: null,
                datePremiereInscription: null,
                dateSortie: null,
                sexe: null,
                commentaire: null,
                etablissementOrigine: null,
                numeroAutorisation: null,
                id: null
            };
        };

        $scope.abbreviate = DataUtils.abbreviate;

        $scope.byteSize = DataUtils.byteSize;
    });


angular.module('smartschoolApp')
    .controller('EcoleElevesController', function ($scope, $state, DataUtils, Eleve, EleveSearch, ParseLinks,entity,Ecole) {

        $scope.ecole = entity;
        $scope.meseleves = [];
        $scope.eleves = [];
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.page = 1;

        $scope.load = function (id) {
            Ecole.get({id: id}, function(result) {
                Eleve.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id'],id:$stateParams.idecole}, function(result, headers) {
                                $scope.links = ParseLinks.parse(headers('link'));
                                $scope.totalItems = headers('X-Total-Count');
                                $scope.meseleves = result;
                                angular.forEach($scope.meseleves, function (item) {
                                       if(item.ecole){
                                              if(item.ecole.id == $scope.ecole.id){
                                                     $scope.eleves.push(item);
                                              }
                                       }

                                });
                });

            });
        };

        $scope.loadAll = function() {
            Eleve.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.totalItems = headers('X-Total-Count');
                $scope.meseleves = result;
                    angular.forEach($scope.meseleves, function (item) {
                                                           if(item.ecole){
                                                                  if(item.ecole.id == $scope.ecole.id){
                                                                         $scope.eleves.push(item);
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
            EleveSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.eleves = result;
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
            $scope.eleve = {
                nom: null,
                prenom: null,
                telParent: null,
                adresse: null,
                photo: null,
                photoContentType: null,
                mail: null,
                dateNaissance: null,
                datePremiereInscription: null,
                dateSortie: null,
                sexe: null,
                commentaire: null,
                etablissementOrigine: null,
                numeroAutorisation: null,
                id: null
            };
        };

        $scope.abbreviate = DataUtils.abbreviate;

        $scope.byteSize = DataUtils.byteSize;
    });
