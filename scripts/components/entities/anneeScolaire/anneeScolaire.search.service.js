'use strict';

angular.module('smartschoolApp')
    .factory('AnneeScolaireSearch', function ($resource) {
        return $resource('api/_search/anneeScolaires/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
