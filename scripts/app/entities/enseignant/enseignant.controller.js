'use strict';

angular.module('smartschoolApp')
    .controller('EnseignantController', function ($scope, $state, DataUtils, Enseignant, EnseignantSearch, ParseLinks) {

        $scope.enseignants = [];
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.page = 1;
        $scope.loadAll = function() {
            Enseignant.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.totalItems = headers('X-Total-Count');
                $scope.enseignants = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.search = function () {
            EnseignantSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.enseignants = result;
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
            $scope.enseignant = {
                cin: null,
                nom: null,
                prenom: null,
                vacataire: null,
                dateNaissance: null,
                diplome: null,
                dateEntree: null,
                photo: null,
                photoContentType: null,
                id: null
            };
        };

        $scope.abbreviate = DataUtils.abbreviate;

        $scope.byteSize = DataUtils.byteSize;
    });

angular.module('smartschoolApp')
    .controller('EcoleEnseignantsController', function ($scope,$stateParams, $state, DataUtils, Enseignant, EnseignantSearch, ParseLinks,entity,Ecole,EnseignantByEcole) {

        $scope.mesenseignants = [];
        $scope.enseignantsxls = EnseignantByEcole.query({idecole:$stateParams.idecole});
        console.log($stateParams.idecole);
        $scope.enseignants = [];
        $scope.predicate = 'id';
        $scope.reverse = true;
        $scope.page = 1;
         $scope.ecole = entity;
         $scope.load = function (id) {
                        Ecole.get({id: id}, function(result) {
                        $scope.ecole = result;
                        Enseignant.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                                          $scope.links = ParseLinks.parse(headers('link'));
                                          $scope.totalItems = headers('X-Total-Count');
                                          $scope.mesenseignants = result;
                                          angular.forEach($scope.mesenseignants, function (item) {
                                                if(item.ecole){
                                                       if(item.ecole.id == $scope.ecole.id){
                                                               $scope.enseignants.push(item);
                                                       }}

                                          });

                                      });

                        });
           };



        $scope.loadAll = function() {

            Enseignant.query({page: $scope.page - 1, size: 20, sort: [$scope.predicate + ',' + ($scope.reverse ? 'asc' : 'desc'), 'id']}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.totalItems = headers('X-Total-Count');
                $scope.mesenseignants = result;

                angular.forEach($scope.mesenseignants, function (item) {
                                                                if(item.ecole){
                                                                       if(item.ecole.id == $scope.ecole.id){
                                                                               $scope.enseignants.push(item);
                                                                       }}

                                                          });
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.exportData = function () {
                                 var blob = new Blob([document.getElementById('exportable').innerHTML], {
                                     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
                                 });
                                 saveAs(blob, "Liste d'enseignants permanent.xls");
                };



        $scope.exportDataVacataires = function () {
                                         var blob = new Blob([document.getElementById('vacatairexls').innerHTML], {
                                             type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
                                         });
                                         saveAs(blob, "Liste d'enseignants vacataires.xls");
                        };

        $scope.search = function () {
            EnseignantSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.enseignants = result;
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
            $scope.enseignant = {
                cin: null,
                nom: null,
                prenom: null,
                vacataire: null,
                dateNaissance: null,
                diplome: null,
                dateEntree: null,
                photo: null,
                photoContentType: null,
                id: null
            };
        };

        $scope.abbreviate = DataUtils.abbreviate;

        $scope.byteSize = DataUtils.byteSize;
    });

