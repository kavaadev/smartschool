'use strict';

angular.module('smartschoolApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('serie', {
                parent: 'entity',
                url: '/series',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'smartschoolApp.serie.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/serie/series.html',
                        controller: 'SerieController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('serie');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('serie.detail', {
                parent: 'entity',
                url: '/serie/{id}',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'smartschoolApp.serie.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/serie/serie-detail.html',
                        controller: 'SerieDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('serie');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Serie', function($stateParams, Serie) {
                        return Serie.get({id : $stateParams.id});
                    }]
                }
            })
            .state('serie.new', {
                parent: 'serie',
                url: '/new',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/serie/serie-dialog.html',
                        controller: 'SerieDialogController',
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
                        $state.go('serie', null, { reload: true });
                    }, function() {
                        $state.go('serie');
                    })
                }]
            })
            .state('serie.edit', {
                parent: 'serie',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/serie/serie-dialog.html',
                        controller: 'SerieDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Serie', function(Serie) {
                                return Serie.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('serie', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('serie.delete', {
                parent: 'serie',
                url: '/{id}/delete',
                data: {
                   authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/serie/serie-delete-dialog.html',
                        controller: 'SerieDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Serie', function(Serie) {
                                return Serie.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('serie', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
