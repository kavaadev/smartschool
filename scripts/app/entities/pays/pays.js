'use strict';

angular.module('smartschoolApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('pays', {
                parent: 'entity',
                url: '/payss',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'smartschoolApp.pays.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/pays/payss.html',
                        controller: 'PaysController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('pays');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('pays.detail', {
                parent: 'entity',
                url: '/pays/{id}',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'smartschoolApp.pays.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/pays/pays-detail.html',
                        controller: 'PaysDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('pays');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Pays', function($stateParams, Pays) {
                        return Pays.get({id : $stateParams.id});
                    }]
                }
            })
            .state('pays.new', {
                parent: 'pays',
                url: '/new',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/pays/pays-dialog.html',
                        controller: 'PaysDialogController',
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
                        $state.go('pays', null, { reload: true });
                    }, function() {
                        $state.go('pays');
                    })
                }]
            })
            .state('pays.edit', {
                parent: 'pays',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/pays/pays-dialog.html',
                        controller: 'PaysDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Pays', function(Pays) {
                                return Pays.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('pays', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('pays.delete', {
                parent: 'pays',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/pays/pays-delete-dialog.html',
                        controller: 'PaysDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Pays', function(Pays) {
                                return Pays.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('pays', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
