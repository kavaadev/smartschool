'use strict';

angular.module('smartschoolApp')
    .factory('Profession', function ($resource, DateUtils) {
        return $resource('api/professions/:id', {}, {
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
