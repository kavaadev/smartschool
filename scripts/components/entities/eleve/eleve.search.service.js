'use strict';

angular.module('smartschoolApp')
    .factory('EleveSearch', function ($resource) {
        return $resource('api/_search/eleves/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
