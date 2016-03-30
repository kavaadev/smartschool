'use strict';

angular.module('smartschoolApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('ecole', {
                parent: 'entity',
                url: '/ecoles',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'smartschoolApp.ecole.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/ecole/ecoles.html',
                        controller: 'EcoleController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('ecole');
                        $translatePartialLoader.addPart('categorie');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('ecole.detail', {
                parent: 'entity',
                url: '/ecole/{id}',
                data: {
                    authorities: ['ROLE_ADMIN','ROLE_DIRECTEUR'],
                    pageTitle: 'smartschoolApp.ecole.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/ecole/ecole-detail.html',
                        controller: 'EcoleDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('ecole');
                        $translatePartialLoader.addPart('categorie');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Ecole', function($stateParams, Ecole) {
                        return Ecole.get({id : $stateParams.id});
                    }]
                }
            })
            .state('ecole.new', {
                parent: 'ecole',
                url: '/new',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/ecole/ecole-dialog.html',
                        controller: 'EcoleDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    intitule: null,
                                    adresse: null,
                                    siteWeb: null,
                                    categorie: null,
                                    gpsLatitude: null,
                                    gpsLongitude: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('ecole', null, { reload: true });
                    }, function() {
                        $state.go('ecole');
                    })
                }]
            })
            .state('ecole.edit', {
                parent: 'ecole',
                url: '/{id}/edit',
                data: {
                   authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/ecole/ecole-dialog.html',
                        controller: 'EcoleDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Ecole', function(Ecole) {
                                return Ecole.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('ecole', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('ecole.editAnneeScolaire', {
                            parent: 'ecole.detail',
                            url: '/configuration',
                            data: {
                               authorities: ['ROLE_DIRECTEUR'],
                            },
                            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                                $uibModal.open({
                                    templateUrl: 'scripts/app/entities/ecole/ecole-dialog-config.html',
                                    controller: 'EcoleDialogConfigController',
                                    size: 'lg',
                                    resolve: {
                                        entity: ['Ecole', function(Ecole) {
                                            return Ecole.get({id : $stateParams.id});
                                        }]
                                    }
                                }).result.then(function(result) {
                                    $state.go('ecole.detail', null, { reload: true });
                                }, function() {
                                    $state.go('^');
                                })
                            }]
                        })
            .state('ecole.delete', {
                parent: 'ecole',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/ecole/ecole-delete-dialog.html',
                        controller: 'EcoleDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Ecole', function(Ecole) {
                                return Ecole.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('ecole', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
