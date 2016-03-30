'use strict';

angular.module('smartschoolApp')
    .factory('SystemeEducatifSearch', function ($resource) {
        return $resource('api/_search/systemeEducatifs/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
