'use strict';

angular.module('smartschoolApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('anneeScolaire', {
                parent: 'entity',
                url: '/anneeScolaires',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'smartschoolApp.anneeScolaire.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/anneeScolaire/anneeScolaires.html',
                        controller: 'AnneeScolaireController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('anneeScolaire');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('anneeScolaire.detail', {
                parent: 'entity',
                url: '/anneeScolaire/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'smartschoolApp.anneeScolaire.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/anneeScolaire/anneeScolaire-detail.html',
                        controller: 'AnneeScolaireDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('anneeScolaire');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'AnneeScolaire', function($stateParams, AnneeScolaire) {
                        return AnneeScolaire.get({id : $stateParams.id});
                    }]
                }
            })
            .state('anneeScolaire.new', {
                parent: 'anneeScolaire',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/anneeScolaire/anneeScolaire-dialog.html',
                        controller: 'AnneeScolaireDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    intitule: null,
                                    dateDebut: null,
                                    dateFin: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('anneeScolaire', null, { reload: true });
                    }, function() {
                        $state.go('anneeScolaire');
                    })
                }]
            })
            .state('anneeScolaire.edit', {
                parent: 'anneeScolaire',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/anneeScolaire/anneeScolaire-dialog.html',
                        controller: 'AnneeScolaireDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['AnneeScolaire', function(AnneeScolaire) {
                                return AnneeScolaire.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('anneeScolaire', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('anneeScolaire.delete', {
                parent: 'anneeScolaire',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/anneeScolaire/anneeScolaire-delete-dialog.html',
                        controller: 'AnneeScolaireDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['AnneeScolaire', function(AnneeScolaire) {
                                return AnneeScolaire.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('anneeScolaire', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
