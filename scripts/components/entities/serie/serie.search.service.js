'use strict';

angular.module('smartschoolApp')
    .factory('SerieSearch', function ($resource) {
        return $resource('api/_search/series/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
