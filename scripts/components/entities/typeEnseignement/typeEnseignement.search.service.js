'use strict';

angular.module('smartschoolApp')
    .factory('TypeEnseignementSearch', function ($resource) {
        return $resource('api/_search/typeEnseignements/:query', {}, {
            'query': { method: 'GET', isArray: true}
        });
    });
