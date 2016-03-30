'use strict';

angular.module('smartschoolApp')
    .factory('EcoleSearch', function ($resource) {
        return $resource('api/_search/ecoles/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
