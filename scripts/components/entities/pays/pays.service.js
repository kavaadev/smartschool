'use strict';

angular.module('smartschoolApp')
    .factory('Pays', function ($resource, DateUtils) {
        return $resource('api/payss/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'queryall': { method: 'GET', isArray: true},
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
