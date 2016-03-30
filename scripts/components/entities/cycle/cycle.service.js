'use strict';

angular.module('smartschoolApp')
    .factory('Cycle', function ($resource, DateUtils) {
        return $resource('api/cycles/:id', {}, {
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
