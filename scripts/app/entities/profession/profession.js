'use strict';

angular.module('smartschoolApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('profession', {
                parent: 'entity',
                url: '/professions',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'smartschoolApp.profession.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/profession/professions.html',
                        controller: 'ProfessionController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('profession');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('profession.detail', {
                parent: 'entity',
                url: '/profession/{id}',
                data: {
                    authorities: ['ROLE_ADMIN'],
                    pageTitle: 'smartschoolApp.profession.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/profession/profession-detail.html',
                        controller: 'ProfessionDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('profession');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Profession', function($stateParams, Profession) {
                        return Profession.get({id : $stateParams.id});
                    }]
                }
            })
            .state('profession.new', {
                parent: 'profession',
                url: '/new',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/profession/profession-dialog.html',
                        controller: 'ProfessionDialogController',
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
                        $state.go('profession', null, { reload: true });
                    }, function() {
                        $state.go('profession');
                    })
                }]
            })
            .state('profession.edit', {
                parent: 'profession',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/profession/profession-dialog.html',
                        controller: 'ProfessionDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Profession', function(Profession) {
                                return Profession.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('profession', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('profession.delete', {
                parent: 'profession',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_ADMIN'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/profession/profession-delete-dialog.html',
                        controller: 'ProfessionDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Profession', function(Profession) {
                                return Profession.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('profession', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
