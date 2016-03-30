'use strict';

angular.module('smartschoolApp')
    .factory('CoursSearch', function ($resource) {
        return $resource('api/_search/courss/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
