'use strict';

angular.module('smartschoolApp')
    .factory('Cours', function ($resource, DateUtils) {
        return $resource('api/courss/:id', {}, {
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
    .factory('CoursEcole', function ($resource, DateUtils) {
        return $resource('api/courss/ecoleandclassetype/:idclasse', {}, {
            'query': { method: 'GET', isArray: true},
        });
    });

angular.module('smartschoolApp')
    .factory('CoursAffectation', function ($resource, DateUtils) {
        return $resource('api/cours/:idclasse', {}, {
            'query': { method: 'GET', isArray: true},
        });
    });
