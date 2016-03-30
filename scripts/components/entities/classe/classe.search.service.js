'use strict';

angular.module('smartschoolApp')
    .factory('ClasseSearch', function ($resource) {
        return $resource('api/_search/classes/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
