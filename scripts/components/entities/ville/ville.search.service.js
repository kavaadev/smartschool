'use strict';

angular.module('smartschoolApp')
    .factory('VilleSearch', function ($resource) {
        return $resource('api/_search/villes/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
