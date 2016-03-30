'use strict';

angular.module('smartschoolApp')
    .factory('Emploi', function ($resource, DateUtils) {
        return $resource('api/emplois/:id', {}, {
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
    .factory('EmploiFromClasse', function ($resource, DateUtils) {
        return $resource('api/emploisFromClasse/:idclasse', {}, {
            'query': { method: 'GET', isArray: true},
        });
    });
