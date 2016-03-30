'use strict';

angular.module('smartschoolApp')
    .factory('InscriptionSearch', function ($resource) {
        return $resource('api/_search/inscriptions/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
