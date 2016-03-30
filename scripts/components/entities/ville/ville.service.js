'use strict';

angular.module('smartschoolApp')
    .factory('Ville', function ($resource, DateUtils) {
        return $resource('api/villes/:id', {}, {
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
