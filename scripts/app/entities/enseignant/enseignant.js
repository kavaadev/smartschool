'use strict';

angular.module('smartschoolApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('enseignant', {
                parent: 'entity',
                url: '/enseignants',
                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                    pageTitle: 'smartschoolApp.enseignant.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/enseignant/enseignants.html',
                        controller: 'EnseignantController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('enseignant');
                        $translatePartialLoader.addPart('global');
                        $translatePartialLoader.addPart('sexe');
                        return $translate.refresh();
                    }]
                }
            })
            .state('ecole.enseignants', {
                                        parent: 'entity',
                                        url: '/ecole/{idecole}/enseignants',
                                        data: {
                                            authorities: ['ROLE_DIRECTEUR'],
                                            pageTitle: 'Enseignants'
                                        },
                                        views: {
                                            'content@': {
                                                templateUrl: 'scripts/app/entities/enseignant/enseignants.html',
                                                controller: 'EcoleEnseignantsController'
                                            }
                                        },
                                        resolve: {
                                            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                                                $translatePartialLoader.addPart('enseignant');
                                                $translatePartialLoader.addPart('global');
                                                $translatePartialLoader.addPart('sexe');
                                                return $translate.refresh();
                                            }],
                                            entity: ['$stateParams', 'Ecole', function($stateParams, Ecole) {
                                                                    return Ecole.get({id : $stateParams.idecole});
                                            }]
                                        }
                                    })
            .state('enseignant.detail', {
                parent: 'entity',
                url: '/enseignant/{id}',
                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                    pageTitle: 'smartschoolApp.enseignant.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/enseignant/enseignant-detail.html',
                        controller: 'EnseignantDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('enseignant');
                        $translatePartialLoader.addPart('sexe');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Enseignant', function($stateParams, Enseignant) {
                        return Enseignant.get({id : $stateParams.id});
                    }]
                }
            })
            .state('enseignant.new', {
                parent: 'ecole.enseignants',
                url: '/{idecole}/ajoutEnseignant/',
                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal','Ecole', function($stateParams, $state, $uibModal,Ecole) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/enseignant/enseignant-dialog.html',
                        controller: 'EnseignantDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    cin: null,
                                    nom: null,
                                    prenom: null,
                                    vacataire: null,
                                    dateNaissance: null,
                                    diplome: null,
                                    dateEntree: null,
                                    photo: null,
                                    photoContentType: null,
                                    id: null,
                                    ecole: Ecole.get({id: $stateParams.idecole})
                                };
                            }
                        }
                    }).result.then(function(result) {
                       $state.go('ecole.enseignants',{"id": $stateParams.idecole}, { reload: true });
                    }, function() {
                         $state.go('ecole.enseignants',{"id": $stateParams.idecole});
                    })
                }]
            })
            .state('enseignant.edit', {
                parent: 'ecole.enseignants',
                url: '/{idecole}/modifierEnseignant/{id}',
                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/enseignant/enseignant-dialog.html',
                        controller: 'EnseignantDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Enseignant', function(Enseignant) {
                                return Enseignant.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                       $state.go('ecole.enseignants',{"id": $stateParams.idecole}, { reload: true });
                    }, function() {
                        $state.go('ecole.enseignants',{"id": $stateParams.idecole});
                    })
                }]
            })
            .state('enseignant.delete', {
                parent: 'ecole.enseignants',
                url: '/{idecole}/supprimerEnseignant/{id}',
                data: {
                    authorities: ['ROLE_DIRECTEUR'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/enseignant/enseignant-delete-dialog.html',
                        controller: 'EnseignantDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Enseignant', function(Enseignant) {
                                return Enseignant.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                       $state.go('ecole.enseignants',{"id": $stateParams.idecole}, { reload: true });
                    }, function() {
                        $state.go('ecole.enseignants',{"id": $stateParams.idecole});
                    })
                }]
            });
    });
