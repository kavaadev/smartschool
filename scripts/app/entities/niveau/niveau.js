'use strict';

angular.module('smartschoolApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('niveau', {
                parent: 'entity',
                url: '/niveaus',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'smartschoolApp.niveau.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/niveau/niveaus.html',
                        controller: 'NiveauController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('niveau');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('niveau.detail', {
                parent: 'entity',
                url: '/niveau/{id}',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'smartschoolApp.niveau.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/niveau/niveau-detail.html',
                        controller: 'NiveauDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('niveau');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Niveau', function($stateParams, Niveau) {
                        return Niveau.get({id : $stateParams.id});
                    }]
                }
            })
            .state('niveau.new', {
                parent: 'niveau',
                url: '/new',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/niveau/niveau-dialog.html',
                        controller: 'NiveauDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    intitule: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('niveau', null, { reload: true });
                    }, function() {
                        $state.go('niveau');
                    })
                }]
            })
            .state('niveau.edit', {
                parent: 'niveau',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/niveau/niveau-dialog.html',
                        controller: 'NiveauDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Niveau', function(Niveau) {
                                return Niveau.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('niveau', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('niveau.delete', {
                parent: 'niveau',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/niveau/niveau-delete-dialog.html',
                        controller: 'NiveauDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Niveau', function(Niveau) {
                                return Niveau.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('niveau', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
