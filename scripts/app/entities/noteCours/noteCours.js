'use strict';

angular.module('smartschoolApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('noteCours', {
                parent: 'entity',
                url: '/noteCourss',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'smartschoolApp.noteCours.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/noteCours/noteCourss.html',
                        controller: 'NoteCoursController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('noteCours');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('noteCours.detail', {
                parent: 'entity',
                url: '/noteCours/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'smartschoolApp.noteCours.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/noteCours/noteCours-detail.html',
                        controller: 'NoteCoursDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('noteCours');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'NoteCours', function($stateParams, NoteCours) {
                        return NoteCours.get({id : $stateParams.id});
                    }]
                }
            })
            .state('noteCours.new', {
                parent: 'noteCours',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/noteCours/noteCours-dialog.html',
                        controller: 'NoteCoursDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    note: null,
                                    commentaire: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('noteCours', null, { reload: true });
                    }, function() {
                        $state.go('noteCours');
                    })
                }]
            })
            .state('noteCours.edit', {
                parent: 'noteCours',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/noteCours/noteCours-dialog.html',
                        controller: 'NoteCoursDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['NoteCours', function(NoteCours) {
                                return NoteCours.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('noteCours', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('noteCours.delete', {
                parent: 'noteCours',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/noteCours/noteCours-delete-dialog.html',
                        controller: 'NoteCoursDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['NoteCours', function(NoteCours) {
                                return NoteCours.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('noteCours', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
