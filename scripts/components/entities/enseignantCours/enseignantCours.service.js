'use strict';

angular.module('smartschoolApp')
    .factory('EnseignantCours', function ($resource, DateUtils) {
        return $resource('api/enseignantCourss/:id', {}, {
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
        .factory('EnseignantCoursClasse', function ($resource, DateUtils) {
            return $resource('api/enseignantCourssClasse/:id', {}, {
                'query': { method: 'GET', isArray: true},
            });
        });
