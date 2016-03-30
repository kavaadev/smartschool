'use strict';

angular.module('smartschoolApp')
    .factory('ProfessionSearch', function ($resource) {
        return $resource('api/_search/professions/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
