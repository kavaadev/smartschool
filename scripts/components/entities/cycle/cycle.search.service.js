'use strict';

angular.module('smartschoolApp')
    .factory('CycleSearch', function ($resource) {
        return $resource('api/_search/cycles/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
