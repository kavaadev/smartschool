'use strict';

angular.module('smartschoolApp')
    .factory('Classe', function ($resource, DateUtils) {
        return $resource('api/classes/:id', {}, {
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
    .factory('ClasseEcole', function ($resource, DateUtils) {
        return $resource('api/classes/ecole/:id', {}, {
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
        .factory('ClasseRecherche', function ($resource, DateUtils) {
            return $resource('api/classes/recherche/:id/:intitule', {}, {
                'query': { method: 'GET', isArray: true}
            });
        });

angular.module('smartschoolApp')
                .factory('ClasseNiveauSupp', function ($resource, DateUtils) {
                    return $resource('api/niveausupp/:idclasse/:idecole', {}, {
                        'query': { method: 'GET', isArray: true}
                    });
                });

