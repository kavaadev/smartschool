'use strict';

angular.module('smartschoolApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('cycle', {
                parent: 'entity',
                url: '/cycles',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'smartschoolApp.cycle.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/cycle/cycles.html',
                        controller: 'CycleController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('cycle');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('cycle.detail', {
                parent: 'entity',
                url: '/cycle/{id}',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'smartschoolApp.cycle.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/cycle/cycle-detail.html',
                        controller: 'CycleDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('cycle');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Cycle', function($stateParams, Cycle) {
                        return Cycle.get({id : $stateParams.id});
                    }]
                }
            })
            .state('cycle.new', {
                parent: 'cycle',
                url: '/new',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/cycle/cycle-dialog.html',
                        controller: 'CycleDialogController',
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
                        $state.go('cycle', null, { reload: true });
                    }, function() {
                        $state.go('cycle');
                    })
                }]
            })
            .state('cycle.edit', {
                parent: 'cycle',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/cycle/cycle-dialog.html',
                        controller: 'CycleDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Cycle', function(Cycle) {
                                return Cycle.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('cycle', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('cycle.delete', {
                parent: 'cycle',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/cycle/cycle-delete-dialog.html',
                        controller: 'CycleDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Cycle', function(Cycle) {
                                return Cycle.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('cycle', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
