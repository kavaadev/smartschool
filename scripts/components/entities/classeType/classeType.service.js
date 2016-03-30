'use strict';

angular.module('smartschoolApp')
    .factory('ClasseType', function ($resource, DateUtils) {
        return $resource('api/classeTypes/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.dateCreation = DateUtils.convertLocaleDateFromServer(data.dateCreation);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.dateCreation = DateUtils.convertLocaleDateToServer(data.dateCreation);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.dateCreation = DateUtils.convertLocaleDateToServer(data.dateCreation);
                    return angular.toJson(data);
                }
            }
        });
    });

angular.module('smartschoolApp')
    .factory('EcoleClasseType', function ($resource, DateUtils) {
        return $resource('api/classetypes/ecole/:id', {}, {
            'query': { method: 'GET', isArray: true},
        });
    });
