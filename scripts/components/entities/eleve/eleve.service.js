'use strict';

angular.module('smartschoolApp')
    .factory('Eleve', function ($resource, DateUtils) {
        return $resource('api/eleves/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.dateNaissance = DateUtils.convertLocaleDateFromServer(data.dateNaissance);
                    data.datePremiereInscription = DateUtils.convertLocaleDateFromServer(data.datePremiereInscription);
                    data.dateSortie = DateUtils.convertLocaleDateFromServer(data.dateSortie);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.dateNaissance = DateUtils.convertLocaleDateToServer(data.dateNaissance);
                    data.datePremiereInscription = DateUtils.convertLocaleDateToServer(data.datePremiereInscription);
                    data.dateSortie = DateUtils.convertLocaleDateToServer(data.dateSortie);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.dateNaissance = DateUtils.convertLocaleDateToServer(data.dateNaissance);
                    data.datePremiereInscription = DateUtils.convertLocaleDateToServer(data.datePremiereInscription);
                    data.dateSortie = DateUtils.convertLocaleDateToServer(data.dateSortie);
                    return angular.toJson(data);
                }
            }
        });
    });

    angular.module('smartschoolApp')
        .factory('EleveEcole', function ($resource, DateUtils) {
            return $resource('api/eleves/ecole/:id', {}, {
                'query': { method: 'GET', isArray: true},
            });
        });
