'use strict';

angular.module('smartschoolApp')
    .factory('NiveauSearch', function ($resource) {
        return $resource('api/_search/niveaus/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
