'use strict';

angular.module('smartschoolApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('ville', {
                parent: 'entity',
                url: '/villes',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'smartschoolApp.ville.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/ville/villes.html',
                        controller: 'VilleController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('ville');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('ville.detail', {
                parent: 'entity',
                url: '/ville/{id}',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'smartschoolApp.ville.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/ville/ville-detail.html',
                        controller: 'VilleDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('ville');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Ville', function($stateParams, Ville) {
                        return Ville.get({id : $stateParams.id});
                    }]
                }
            })
            .state('ville.new', {
                parent: 'ville',
                url: '/new',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/ville/ville-dialog.html',
                        controller: 'VilleDialogController',
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
                        $state.go('ville', null, { reload: true });
                    }, function() {
                        $state.go('ville');
                    })
                }]
            })
            .state('ville.edit', {
                parent: 'ville',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/ville/ville-dialog.html',
                        controller: 'VilleDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Ville', function(Ville) {
                                return Ville.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('ville', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('ville.delete', {
                parent: 'ville',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/ville/ville-delete-dialog.html',
                        controller: 'VilleDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Ville', function(Ville) {
                                return Ville.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('ville', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
