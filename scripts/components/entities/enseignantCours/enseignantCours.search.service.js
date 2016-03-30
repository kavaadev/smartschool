'use strict';

angular.module('smartschoolApp')
    .factory('EnseignantCoursSearch', function ($resource) {
        return $resource('api/_search/enseignantCourss/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
