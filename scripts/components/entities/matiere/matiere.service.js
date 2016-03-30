'use strict';

angular.module('smartschoolApp')
    .factory('Matiere', function ($resource, DateUtils) {
        return $resource('api/matieres/:id', {}, {
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
