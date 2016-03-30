'use strict';

angular.module('smartschoolApp')
    .factory('NoteCours', function ($resource, DateUtils) {
        return $resource('api/noteCourss/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });

angular.module('smartschoolApp')
    .factory('NoteCoursInit', function ($resource, DateUtils) {
        return $resource('api/noteCoursInit/:idinscription/:idcours/:periode', {}, {
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
        });
    });

angular.module('smartschoolApp')
    .factory('NoteCoursBulletin', function ($resource, DateUtils) {
        return $resource('api/bulletinCalcul/:idinscription/:periode', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
        });
    });

    angular.module('smartschoolApp')
        .factory('BulletinDetail', function ($resource, DateUtils) {
            return $resource('api/bulletinDetail/:idinscription/:periode', {}, {
                'query': { method: 'GET', isArray: true},
            });
        });

angular.module('smartschoolApp')
    .factory('NoteCoursBulletinMin', function ($resource, DateUtils) {
        return $resource('api/bulletinDetailMin/:idclasse/:idcours/:periode/:idanneescolaire', {}, {
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
        });
    });

angular.module('smartschoolApp')
    .factory('NoteCoursBulletinMax', function ($resource, DateUtils) {
        return $resource('api/bulletinDetailMax/:idclasse/:idcours/:periode/:idanneescolaire', {}, {
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
        });
    });
