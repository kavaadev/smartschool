'use strict';

angular.module('smartschoolApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('cours', {
                parent: 'entity',
                url: '/courss',
                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                    pageTitle: 'smartschoolApp.cours.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/cours/courss.html',
                        controller: 'CoursController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('cours');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('ecole.cours', {
                              parent: 'entity',
                              url: '/ecole/{idecole}/cours',
                              data: {
                                   authorities: ['ROLE_DIRECTEUR'],
                                   pageTitle: 'Cours'
                              },
                              views: {
                                   'content@': {
                                         templateUrl: 'scripts/app/entities/cours/courss.html',
                                         controller: 'EcoleCoursController'
                                   }
                              },
                              resolve: {
                                   translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                                        $translatePartialLoader.addPart('cours');
                                        $translatePartialLoader.addPart('global');
                                        return $translate.refresh();
                                   }],
                                   entity: ['$stateParams', 'Ecole', function($stateParams, Ecole) {
                                        return Ecole.get({id : $stateParams.idecole});
                                   }]
                              }
                        })
            .state('cours.detail', {
                parent: 'entity',
                url: '/cours/{id}',
                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                    pageTitle: 'smartschoolApp.cours.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/cours/cours-detail.html',
                        controller: 'CoursDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('cours');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Cours', function($stateParams, Cours) {
                        return Cours.get({id : $stateParams.id});
                    }]
                }
            })
            .state('cours.new', {
                parent: 'ecole.cours',
                url: '/{idecole}/ajoutCours/',
                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal','Ecole', function($stateParams, $state, $uibModal,Ecole) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/cours/cours-dialog.html',
                        controller: 'CoursDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    nom: null,
                                     prenom: null,
                                     telParent: null,
                                     adresse: null,
                                     photo: null,
                                     photoContentType: null,
                                     mail: null,
                                     dateNaissance: null,
                                     datePremiereInscription: null,
                                     dateSortie: null,
                                     sexe: null,
                                     commentaire: null,
                                     etablissementOrigine: null,
                                     numeroAutorisation: null,
                                     id: null,
                                     ecole: Ecole.get({id: $stateParams.idecole})
                                };
                            }
                        }
                    }).result.then(function(result) {
                      $state.go('ecole.cours',{"id": $stateParams.idecole}, { reload: true });
                    }, function() {
                        $state.go('ecole.cours',{"id": $stateParams.idecole});
                    })
                }]
            })
            .state('cours.edit', {
                parent: 'ecole.cours',
                url: '/{idecole}/modifierCours/{id}',

                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/cours/cours-dialog.html',
                        controller: 'CoursDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Cours', function(Cours) {
                                return Cours.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('ecole.cours',{"id": $stateParams.idecole}, { reload: true });
                    }, function() {
                        $state.go('ecole.cours',{"id": $stateParams.idecole});
                    })
                }]
            })
            .state('cours.delete', {
                parent: 'ecole.cours',
                url: '/{idecole}/supprimerCours/{id}',
                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/cours/cours-delete-dialog.html',
                        controller: 'CoursDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Cours', function(Cours) {
                                return Cours.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                         $state.go('ecole.cours',{"id": $stateParams.idecole}, { reload: true });
                    }, function() {
                         $state.go('ecole.cours',{"id": $stateParams.idecole});
                    })
                }]
            });

         });
