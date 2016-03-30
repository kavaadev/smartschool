'use strict';

angular.module('smartschoolApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('classe', {
                parent: 'entity',
                url: '/classes',
                data: {
                    authorities: [],
                    pageTitle: 'smartschoolApp.classe.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/classe/classes.html',
                        controller: 'ClasseController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('classe');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('ecole.classes', {
                            parent: 'entity',
                            url: '/ecole/{idecole}/classes',
                            data: {
                                authorities: [],
                                pageTitle: 'smartschoolApp.classe.home.title'
                            },
                            views: {
                                'content@': {
                                    templateUrl: 'scripts/app/entities/classe/classes.html',
                                    controller: 'EcoleClassesController'
                                }
                            },
                            resolve: {
                                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                                    $translatePartialLoader.addPart('classe');
                                    $translatePartialLoader.addPart('global');
                                    return $translate.refresh();
                                }],
                            }
                        })
            .state('classe.detail', {
                parent: 'entity',
                url: '/classe/{id}',
                data: {
                    authorities: [],
                    pageTitle: 'smartschoolApp.classe.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/classe/classe-detail.html',
                        controller: 'ClasseDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('classe');
                        return $translate.refresh();
                    }],
                }
            })
            .state('classe.bulletin', {
                            parent: 'classe.detail',
                            url: '/bulletin/{idclasse}/{idinscription}/{periode}/{idanneescolaire}',
                            data: {
                                authorities: [],
                                pageTitle: 'Bulletin'
                            },
                            onEnter: ['$stateParams', '$state', '$uibModal','Ecole', function($stateParams, $state, $uibModal,Ecole) {
                                                $uibModal.open({
                                                    templateUrl: 'scripts/app/entities/classe/bulletin.html',
                                                    controller: 'BulletinController',
                                                    size: 'lg',
                                                    resolve: {
                                                        entity: function () {
                                                            return {
                                                                idinscription: $stateParams.idinscription,
                                                                periode : $stateParams.periode,
                                                                idclasse : $stateParams.idclasse,
                                                                idanneescolaire :$stateParams.idanneescolaire,
                                                            };
                                                        }
                                                    }
                                                }).result.then(function(result) {
                                                    $state.go('^');
                                                }, function() {
                                                    $state.go('^');
                                                })
                            }]
            })
            .state('classe.deleteEmploi', {
                                        parent: 'classe.detail',
                                        url: '/deleteEmploi/{idEmploi}',
                                        data: {
                                            authorities: ['ROLE_DIRECTEUR'],
                                            pageTitle: 'Delete'
                                        },
                                        onEnter: ['$stateParams', '$state', '$uibModal','Ecole', function($stateParams, $state, $uibModal,Ecole) {
                                                            $uibModal.open({
                                                                templateUrl: 'scripts/app/entities/classe/deleteEmploi.html',
                                                                controller: 'DeleteEmploiController',
                                                                size: 'lg',
                                                                resolve: {
                                                                    entity: function () {
                                                                        return {
                                                                            idEmploi: $stateParams.idEmploi,
                                                                        };
                                                                    }
                                                                }
                                                            }).result.then(function(result) {
                                                                $state.go('^');
                                                            }, function() {
                                                                $state.go('^');
                                                            })
                                        }]
                        })
            .state('classe.basculer', {
                                        parent: 'classe.detail',
                                        url: '/basculer/{idecole}/{idclasse}/{idanneescolaire}',
                                        data: {
                                            authorities: [],
                                            pageTitle: 'Bulletin'
                                        },
                                        onEnter: ['$stateParams', '$state', '$uibModal','Ecole', function($stateParams, $state, $uibModal,Ecole) {
                                                            $uibModal.open({
                                                                templateUrl: 'scripts/app/entities/classe/basculer.html',
                                                                controller: 'MasseController',
                                                                size: 'lg',
                                                                resolve: {
                                                                    entity: function () {
                                                                        return {
                                                                            idecole : $stateParams.idecole,
                                                                            idclasse : $stateParams.idclasse,
                                                                            idanneescolaire :$stateParams.idanneescolaire,
                                                                        };
                                                                    }
                                                                }
                                                            }).result.then(function(result) {
                                                                $state.go('^');
                                                            }, function() {
                                                                $state.go('^');
                                                            })
                                        }]
                        })
            .state('classe.new', {
                parent: 'ecole.classes',
                url: '/{idecole}/ajoutClasse/',
                data: {
                    authorities: [],
                },
                onEnter: ['$stateParams', '$state', '$uibModal','Ecole', function($stateParams, $state, $uibModal,Ecole) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/classe/classe-dialog.html',
                        controller: 'ClasseDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    intitule: null,
                                    nombreMax: null,
                                    id: null,
                                    ecole: Ecole.get({id: $stateParams.idecole})
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('ecole.classes',{"id": $stateParams.idecole}, { reload: true });
                    }, function() {
                        $state.go('ecole.classes',{"id": $stateParams.idecole});
                    })
                }]
            })
            .state('classe.edit', {
                parent: 'ecole.classes',
                url: '/{idecole}/modifierClasse/{id}',
                data: {
                    authorities: [],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/classe/classe-dialog.html',
                        controller: 'ClasseDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Classe', function(Classe) {
                                return Classe.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('ecole.classes',{"id": $stateParams.idecole}, { reload: true });
                    }, function() {
                        $state.go('ecole.classes',{"id": $stateParams.idecole});
                    })
                }]
            })
            .state('classe.delete', {
                parent: 'ecole.classes',
                url: '/{idecole}/supprimerClasse/{id}',
                data: {
                    authorities: [],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/classe/classe-delete-dialog.html',
                        controller: 'ClasseDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Classe', function(Classe) {
                                return Classe.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('ecole.classes',{"id": $stateParams.idecole}, { reload: true });
                    }, function() {
                        $state.go('ecole.classes',{"id": $stateParams.idecole});
                    })
                }]
            });
    });
