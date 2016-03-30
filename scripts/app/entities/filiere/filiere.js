'use strict';

angular.module('smartschoolApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('filiere', {
                parent: 'entity',
                url: '/filieres',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'smartschoolApp.filiere.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/filiere/filieres.html',
                        controller: 'FiliereController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('filiere');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('filiere.detail', {
                parent: 'entity',
                url: '/filiere/{id}',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'smartschoolApp.filiere.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/filiere/filiere-detail.html',
                        controller: 'FiliereDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('filiere');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Filiere', function($stateParams, Filiere) {
                        return Filiere.get({id : $stateParams.id});
                    }]
                }
            })
            .state('filiere.new', {
                parent: 'filiere',
                url: '/new',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/filiere/filiere-dialog.html',
                        controller: 'FiliereDialogController',
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
                        $state.go('filiere', null, { reload: true });
                    }, function() {
                        $state.go('filiere');
                    })
                }]
            })
            .state('filiere.edit', {
                parent: 'filiere',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/filiere/filiere-dialog.html',
                        controller: 'FiliereDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Filiere', function(Filiere) {
                                return Filiere.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('filiere', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('filiere.delete', {
                parent: 'filiere',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/filiere/filiere-delete-dialog.html',
                        controller: 'FiliereDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Filiere', function(Filiere) {
                                return Filiere.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('filiere', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
