'use strict';

angular.module('smartschoolApp')
    .factory('Enseignant', function ($resource, DateUtils) {
        return $resource('api/enseignants/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.dateNaissance = DateUtils.convertLocaleDateFromServer(data.dateNaissance);
                    data.dateEntree = DateUtils.convertLocaleDateFromServer(data.dateEntree);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.dateNaissance = DateUtils.convertLocaleDateToServer(data.dateNaissance);
                    data.dateEntree = DateUtils.convertLocaleDateToServer(data.dateEntree);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.dateNaissance = DateUtils.convertLocaleDateToServer(data.dateNaissance);
                    data.dateEntree = DateUtils.convertLocaleDateToServer(data.dateEntree);
                    return angular.toJson(data);
                }
            }
        });
    });


 angular.module('smartschoolApp')
     .factory('EnseignantEcole', function ($resource, DateUtils) {
         return $resource('api/ecole/enseignants/:idclasse', {}, {
             'query': { method: 'GET', isArray: true},
         });
     });

  angular.module('smartschoolApp')
      .factory('EnseignantByEcole', function ($resource, DateUtils) {
          return $resource('api/enseignantsfromecole/:idecole', {}, {
              'query': { method: 'GET', isArray: true},
          });
      });
