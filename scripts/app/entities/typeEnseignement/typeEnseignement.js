'use strict';

angular.module('smartschoolApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('typeEnseignement', {
                parent: 'entity',
                url: '/typeEnseignements',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'smartschoolApp.typeEnseignement.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/typeEnseignement/typeEnseignements.html',
                        controller: 'TypeEnseignementController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('typeEnseignement');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('typeEnseignement.detail', {
                parent: 'entity',
                url: '/typeEnseignement/{id}',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'smartschoolApp.typeEnseignement.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/typeEnseignement/typeEnseignement-detail.html',
                        controller: 'TypeEnseignementDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('typeEnseignement');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'TypeEnseignement', function($stateParams, TypeEnseignement) {
                        return TypeEnseignement.get({id : $stateParams.id});
                    }]
                }
            })
            .state('typeEnseignement.new', {
                parent: 'typeEnseignement',
                url: '/new',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/typeEnseignement/typeEnseignement-dialog.html',
                        controller: 'TypeEnseignementDialogController',
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
                        $state.go('typeEnseignement', null, { reload: true });
                    }, function() {
                        $state.go('typeEnseignement');
                    })
                }]
            })
            .state('typeEnseignement.edit', {
                parent: 'typeEnseignement',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/typeEnseignement/typeEnseignement-dialog.html',
                        controller: 'TypeEnseignementDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['TypeEnseignement', function(TypeEnseignement) {
                                return TypeEnseignement.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('typeEnseignement', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('typeEnseignement.delete', {
                parent: 'typeEnseignement',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/typeEnseignement/typeEnseignement-delete-dialog.html',
                        controller: 'TypeEnseignementDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['TypeEnseignement', function(TypeEnseignement) {
                                return TypeEnseignement.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('typeEnseignement', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
