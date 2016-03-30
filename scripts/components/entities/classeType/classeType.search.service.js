'use strict';

angular.module('smartschoolApp')
    .factory('ClasseTypeSearch', function ($resource) {
        return $resource('api/_search/classeTypes/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
