'use strict';

angular.module('smartschoolApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('systemeEducatif', {
                parent: 'entity',
                url: '/systemeEducatifs',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'smartschoolApp.systemeEducatif.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/systemeEducatif/systemeEducatifs.html',
                        controller: 'SystemeEducatifController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('systemeEducatif');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('systemeEducatif.detail', {
                parent: 'entity',
                url: '/systemeEducatif/{id}',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'smartschoolApp.systemeEducatif.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/systemeEducatif/systemeEducatif-detail.html',
                        controller: 'SystemeEducatifDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('systemeEducatif');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'SystemeEducatif', function($stateParams, SystemeEducatif) {
                        return SystemeEducatif.get({id : $stateParams.id});
                    }]
                }
            })
            .state('systemeEducatif.new', {
                parent: 'systemeEducatif',
                url: '/new',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/systemeEducatif/systemeEducatif-dialog.html',
                        controller: 'SystemeEducatifDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    intitule: null,
                                    abreviation: null,
                                    description: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('systemeEducatif', null, { reload: true });
                    }, function() {
                        $state.go('systemeEducatif');
                    })
                }]
            })
            .state('systemeEducatif.edit', {
                parent: 'systemeEducatif',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/systemeEducatif/systemeEducatif-dialog.html',
                        controller: 'SystemeEducatifDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['SystemeEducatif', function(SystemeEducatif) {
                                return SystemeEducatif.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('systemeEducatif', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('systemeEducatif.delete', {
                parent: 'systemeEducatif',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/systemeEducatif/systemeEducatif-delete-dialog.html',
                        controller: 'SystemeEducatifDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['SystemeEducatif', function(SystemeEducatif) {
                                return SystemeEducatif.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('systemeEducatif', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
