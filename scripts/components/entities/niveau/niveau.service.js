'use strict';

angular.module('smartschoolApp')
    .factory('Niveau', function ($resource, DateUtils) {
        return $resource('api/niveaus/:id', {}, {
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
