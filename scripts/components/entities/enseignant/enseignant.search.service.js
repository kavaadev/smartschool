'use strict';

angular.module('smartschoolApp')
    .factory('EnseignantSearch', function ($resource) {
        return $resource('api/_search/enseignants/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
