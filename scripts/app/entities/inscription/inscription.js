'use strict';

angular.module('smartschoolApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('inscription', {
                parent: 'entity',
                url: '/inscriptions/{idecole}',
                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                    pageTitle: 'smartschoolApp.inscription.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/inscription/inscriptions.html',
                        controller: 'InscriptionController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('inscription');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('ecole.inscriptions', {
                                        parent: 'entity',
                                        url: '/ecole/{idecole}/inscriptions',
                                        data: {
                                            authorities: ['ROLE_DIRECTEUR'],
                                            pageTitle: 'Inscriptions'
                                        },
                                        views: {
                                            'content@': {
                                                templateUrl: 'scripts/app/entities/inscription/inscriptions.html',
                                                controller: 'EcoleInscriptionsController'
                                            }
                                        },
                                        resolve: {
                                            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                                                $translatePartialLoader.addPart('inscription');
                                                $translatePartialLoader.addPart('global');
                                                return $translate.refresh();
                                            }],
                                            entity: ['$stateParams', 'Ecole', function($stateParams, Ecole) {
                                                                    return Ecole.get({id : $stateParams.idecole});
                                            }]
                                        }
                                    })

            .state('inscription.detail', {
                parent: 'entity',
                url: '/inscription/{id}',
                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                    pageTitle: 'smartschoolApp.inscription.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/inscription/inscription-detail.html',
                        controller: 'InscriptionDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('inscription');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Inscription', function($stateParams, Inscription) {
                        return Inscription.get({id : $stateParams.id});
                    }]
                }
            })
            .state('inscription.new', {
                parent: 'ecole.inscriptions',
                url: '/{idecole}/ajoutInscription/',
                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal','Ecole', function($stateParams, $state, $uibModal,Ecole) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/inscription/inscription-dialog.html',
                        controller: 'InscriptionDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    situation: null,
                                    id: null,
                                    ecole: Ecole.get({id: $stateParams.idecole})
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('ecole.inscriptions',{"id": $stateParams.idecole}, { reload: true });
                    }, function() {
                        $state.go('ecole.inscriptions',{"id": $stateParams.idecole});
                    })
                }]
            })
            .state('inscription.edit', {
                parent: 'ecole.inscriptions',
                url: '/{idecole}/modifierInscription/{id}',
                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/inscription/inscription-dialog.html',
                        controller: 'InscriptionDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Inscription', function(Inscription) {
                                return Inscription.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('ecole.inscriptions',{"id": $stateParams.idecole}, { reload: true });
                    }, function() {
                        $state.go('ecole.inscriptions',{"id": $stateParams.idecole});
                    })
                }]
            })
            .state('inscription.delete', {
                parent: 'ecole.inscriptions',
                url: '/{idecole}/supprimerInscription/{id}',
                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/inscription/inscription-delete-dialog.html',
                        controller: 'InscriptionDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Inscription', function(Inscription) {
                                return Inscription.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('ecole.inscriptions',{"id": $stateParams.idecole}, { reload: true });
                    }, function() {
                        $state.go('ecole.inscriptions',{"id": $stateParams.idecole});
                    })
                }]
            });
    });
