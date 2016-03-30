'use strict';

angular.module('smartschoolApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('enseignantCours', {
                parent: 'entity',
                url: '/enseignantCourss',
                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                    pageTitle: 'smartschoolApp.enseignantCours.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/enseignantCours/enseignantCourss.html',
                        controller: 'EnseignantCoursController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('enseignantCours');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('enseignantCours.detail', {
                parent: 'entity',
                url: '/enseignantCours/{id}',
                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                    pageTitle: 'smartschoolApp.enseignantCours.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/enseignantCours/enseignantCours-detail.html',
                        controller: 'EnseignantCoursDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('enseignantCours');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'EnseignantCours', function($stateParams, EnseignantCours) {
                        return EnseignantCours.get({id : $stateParams.id});
                    }]
                }
            })
            .state('enseignantCours.new', {
                parent: 'enseignantCours',
                url: '/new',
                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/enseignantCours/enseignantCours-dialog.html',
                        controller: 'EnseignantCoursDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('enseignantCours', null, { reload: true });
                    }, function() {
                        $state.go('enseignantCours');
                    })
                }]
            })
            .state('enseignantCours.edit', {
                parent: 'enseignantCours',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/enseignantCours/enseignantCours-dialog.html',
                        controller: 'EnseignantCoursDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['EnseignantCours', function(EnseignantCours) {
                                return EnseignantCours.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('enseignantCours', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('enseignantCours.delete', {
                parent: 'enseignantCours',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/enseignantCours/enseignantCours-delete-dialog.html',
                        controller: 'EnseignantCoursDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['EnseignantCours', function(EnseignantCours) {
                                return EnseignantCours.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('enseignantCours', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
