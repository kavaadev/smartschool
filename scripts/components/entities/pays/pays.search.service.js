'use strict';

angular.module('smartschoolApp')
    .factory('PaysSearch', function ($resource) {
        return $resource('api/_search/payss/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
