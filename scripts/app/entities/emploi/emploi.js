'use strict';

angular.module('smartschoolApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('emploi', {
                parent: 'entity',
                url: '/emplois',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'smartschoolApp.emploi.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/emploi/emplois.html',
                        controller: 'EmploiController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('emploi');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('emploi.detail', {
                parent: 'entity',
                url: '/emploi/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'smartschoolApp.emploi.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/emploi/emploi-detail.html',
                        controller: 'EmploiDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('emploi');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Emploi', function($stateParams, Emploi) {
                        return Emploi.get({id : $stateParams.id});
                    }]
                }
            })
            .state('emploi.new', {
                parent: 'emploi',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/emploi/emploi-dialog.html',
                        controller: 'EmploiDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    title: null,
                                    start: null,
                                    end: null,
                                    backgroundColor: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('emploi', null, { reload: true });
                    }, function() {
                        $state.go('emploi');
                    })
                }]
            })
            .state('emploi.edit', {
                parent: 'emploi',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/emploi/emploi-dialog.html',
                        controller: 'EmploiDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Emploi', function(Emploi) {
                                return Emploi.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('emploi', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('emploi.delete', {
                parent: 'emploi',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/emploi/emploi-delete-dialog.html',
                        controller: 'EmploiDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Emploi', function(Emploi) {
                                return Emploi.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('^');
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
