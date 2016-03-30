'use strict';

angular.module('smartschoolApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


