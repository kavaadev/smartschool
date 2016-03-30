'use strict';

angular.module('smartschoolApp')
    .factory('Filiere', function ($resource, DateUtils) {
        return $resource('api/filieres/:id', {}, {
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
