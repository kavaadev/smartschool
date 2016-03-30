'use strict';

angular.module('smartschoolApp')
    .factory('RegionSearch', function ($resource) {
        return $resource('api/_search/regions/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
