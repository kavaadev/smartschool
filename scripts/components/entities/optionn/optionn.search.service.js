'use strict';

angular.module('smartschoolApp')
    .factory('OptionnSearch', function ($resource) {
        return $resource('api/_search/optionns/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
