'use strict';

angular.module('smartschoolApp')
    .factory('NoteCoursSearch', function ($resource) {
        return $resource('api/_search/noteCourss/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
