'use strict';

angular.module('smartschoolApp')
    .factory('Inscription', function ($resource, DateUtils) {
        return $resource('api/inscriptions/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });
angular.module('smartschoolApp')
    .factory('InscriptionByEcoleAndAnneeScolaire', function ($resource, DateUtils) {
        return $resource('api/inscriptionByEcoleAndAnneeScolaire/:idecole/:idAnneeScolaire', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });
angular.module('smartschoolApp')
    .factory('EleveClasse', function ($resource, DateUtils) {
        return $resource('api/elevesclasse/:id', {}, {
            'query': { method: 'GET', isArray: true},
        });
    });

angular.module('smartschoolApp')
        .factory('EleveInscriptions', function ($resource, DateUtils) {
            return $resource('api/eleveInscriptions/:id', {}, {
                'query': { method: 'GET', isArray: true},
            });
        });



angular.module('smartschoolApp')
        .factory('InscriptionRecherche', function ($resource, DateUtils) {
                    return $resource('api/inscriptions/recherche/:id/:idAnneeScolaire/:nom', {}, {
                        'query': { method: 'GET', isArray: true},


                    });
                });

angular.module('smartschoolApp')
    .factory('Masse', function ($resource, DateUtils) {
        return $resource('api/masse/:idclasse/:idclasseNext/:idanneescolaire/:idanneescolaireNext', {}, {
            'go': { method:'GET' }
        });
    });
