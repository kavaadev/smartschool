'use strict';

angular.module('smartschoolApp')
    .factory('TypeEnseignement', function ($resource, DateUtils) {
        return $resource('api/typeEnseignements/:id', {}, {
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
