'use strict';

angular.module('smartschoolApp')
    .factory('MatiereSearch', function ($resource) {
        return $resource('api/_search/matieres/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
