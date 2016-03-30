'use strict';

angular.module('smartschoolApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('classeType', {
                parent: 'entity',
                url: '/classeTypes',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'smartschoolApp.classeType.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/classeType/classeTypes.html',
                        controller: 'ClasseTypeController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('classeType');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('classeType.detail', {
                parent: 'entity',
                url: '/classeType/{id}',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'smartschoolApp.classeType.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/classeType/classeType-detail.html',
                        controller: 'ClasseTypeDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('classeType');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'ClasseType', function($stateParams, ClasseType) {
                        return ClasseType.get({id : $stateParams.id});
                    }]
                }
            })
            .state('classeType.new', {
                parent: 'classeType',
                url: '/new',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/classeType/classeType-dialog.html',
                        controller: 'ClasseTypeDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    intitule: null,
                                    dateCreation: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('classeType', null, { reload: true });
                    }, function() {
                        $state.go('classeType');
                    })
                }]
            })
            .state('classeType.edit', {
                parent: 'classeType',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/classeType/classeType-dialog.html',
                        controller: 'ClasseTypeDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['ClasseType', function(ClasseType) {
                                return ClasseType.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('classeType', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('classeType.delete', {
                parent: 'classeType',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/classeType/classeType-delete-dialog.html',
                        controller: 'ClasseTypeDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['ClasseType', function(ClasseType) {
                                return ClasseType.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('classeType', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
