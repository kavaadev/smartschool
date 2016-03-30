'use strict';

angular.module('smartschoolApp')
    .factory('EmploiSearch', function ($resource) {
        return $resource('api/_search/emplois/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
