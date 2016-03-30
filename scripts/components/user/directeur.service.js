'use strict';

angular.module('smartschoolApp')
    .factory('Directeur', function ($resource) {
        return $resource('api/directeurs/:login', {}, {
                'query': {method: 'GET', isArray: true},
        });
    });
