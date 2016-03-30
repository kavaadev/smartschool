'use strict';

angular.module('smartschoolApp')
    .factory('Optionn', function ($resource, DateUtils) {
        return $resource('api/optionns/:id', {}, {
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
