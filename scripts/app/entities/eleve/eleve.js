'use strict';

angular.module('smartschoolApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('eleve', {
                parent: 'entity',
                url: '/eleves',
                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                    pageTitle: 'smartschoolApp.eleve.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/eleve/eleves.html',
                        controller: 'EleveController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('eleve');
                        $translatePartialLoader.addPart('sexe');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('ecole.eleves', {
                  parent: 'entity',
                  url: '/ecole/{idecole}/eleves',
                  data: {
                       authorities: ['ROLE_DIRECTEUR'],
                       pageTitle: 'Eleves'
                  },
                  views: {
                       'content@': {
                             templateUrl: 'scripts/app/entities/eleve/eleves.html',
                             controller: 'EcoleElevesController'
                       }
                  },
                  resolve: {
                       translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                            $translatePartialLoader.addPart('eleve');
                            $translatePartialLoader.addPart('sexe');
                            $translatePartialLoader.addPart('global');
                            return $translate.refresh();
                       }],
                       entity: ['$stateParams', 'Ecole', function($stateParams, Ecole) {
                            return Ecole.get({id : $stateParams.idecole});
                       }]
                  }
            })
            .state('eleve.detail', {
                parent: 'entity',
                url: '/eleve/{id}',
                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                    pageTitle: 'smartschoolApp.eleve.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/eleve/eleve-detail.html',
                        controller: 'EleveDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('eleve');
                        $translatePartialLoader.addPart('sexe');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Eleve', function($stateParams, Eleve) {
                        return Eleve.get({id : $stateParams.id});
                    }]
                }
            })
            .state('eleve.new', {
                parent: 'ecole.eleves',
                url: '/{idecole}/ajoutEleve/',
                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal','Ecole', function($stateParams, $state, $uibModal,Ecole) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/eleve/eleve-dialog.html',
                        controller: 'EleveDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
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
                                    id: null,
                                    ecole: Ecole.get({id: $stateParams.idecole})
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('ecole.eleves',{"id": $stateParams.idecole}, { reload: true });
                    }, function() {
                        $state.go('ecole.eleves',{"id": $stateParams.idecole});
                    })
                }]
            })
            .state('eleve.edit', {
                parent: 'ecole.eleves',
                url: '/{idecole}/modifierEleve/{id}',
                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/eleve/eleve-dialog.html',
                        controller: 'EleveDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Eleve', function(Eleve) {
                                return Eleve.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('ecole.eleves',{"id": $stateParams.idecole}, { reload: true });
                    }, function() {
                        $state.go('ecole.eleves',{"id": $stateParams.idecole});
                    })
                }]
            })
            .state('eleve.delete', {
                parent: 'ecole.eleves',
                url: '/{idecole}/supprimerEleve/{id}',
                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/eleve/eleve-delete-dialog.html',
                        controller: 'EleveDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Eleve', function(Eleve) {
                                return Eleve.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('ecole.eleves',{"id": $stateParams.idecole}, { reload: true });
                    }, function() {
                        $state.go('ecole.eleves',{"id": $stateParams.idecole});
                    })
                }]
            });
    });
