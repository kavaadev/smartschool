'use strict';

angular.module('smartschoolApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('matiere', {
                parent: 'entity',
                url: '/matieres',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'smartschoolApp.matiere.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/matiere/matieres.html',
                        controller: 'MatiereController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('matiere');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('matiere.detail', {
                parent: 'entity',
                url: '/matiere/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'smartschoolApp.matiere.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/matiere/matiere-detail.html',
                        controller: 'MatiereDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('matiere');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Matiere', function($stateParams, Matiere) {
                        return Matiere.get({id : $stateParams.id});
                    }]
                }
            })
            .state('matiere.new', {
                parent: 'matiere',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/matiere/matiere-dialog.html',
                        controller: 'MatiereDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    intitule: null,
                                    abreviation: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('matiere', null, { reload: true });
                    }, function() {
                        $state.go('matiere');
                    })
                }]
            })
            .state('matiere.edit', {
                parent: 'matiere',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/matiere/matiere-dialog.html',
                        controller: 'MatiereDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Matiere', function(Matiere) {
                                return Matiere.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('matiere', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('matiere.delete', {
                parent: 'matiere',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/matiere/matiere-delete-dialog.html',
                        controller: 'MatiereDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Matiere', function(Matiere) {
                                return Matiere.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('matiere', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
