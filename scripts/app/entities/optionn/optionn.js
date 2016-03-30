'use strict';

angular.module('smartschoolApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('optionn', {
                parent: 'entity',
                url: '/optionns',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'smartschoolApp.optionn.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/optionn/optionns.html',
                        controller: 'OptionnController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('optionn');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('optionn.detail', {
                parent: 'entity',
                url: '/optionn/{id}',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'smartschoolApp.optionn.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/optionn/optionn-detail.html',
                        controller: 'OptionnDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('optionn');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Optionn', function($stateParams, Optionn) {
                        return Optionn.get({id : $stateParams.id});
                    }]
                }
            })
            .state('optionn.new', {
                parent: 'optionn',
                url: '/new',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/optionn/optionn-dialog.html',
                        controller: 'OptionnDialogController',
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
                        $state.go('optionn', null, { reload: true });
                    }, function() {
                        $state.go('optionn');
                    })
                }]
            })
            .state('optionn.edit', {
                parent: 'optionn',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/optionn/optionn-dialog.html',
                        controller: 'OptionnDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Optionn', function(Optionn) {
                                return Optionn.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('optionn', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('optionn.delete', {
                parent: 'optionn',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/optionn/optionn-delete-dialog.html',
                        controller: 'OptionnDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Optionn', function(Optionn) {
                                return Optionn.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('optionn', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
