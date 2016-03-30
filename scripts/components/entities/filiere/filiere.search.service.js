'use strict';

angular.module('smartschoolApp')
    .factory('FiliereSearch', function ($resource) {
        return $resource('api/_search/filieres/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
