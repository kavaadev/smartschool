'use strict';

angular.module('smartschoolApp')
    .controller('LoginController', function ($rootScope, $scope, $state, $timeout, Auth,localStorageService) {
        $scope.user = {};
        $scope.errors = {};

        $scope.rememberMe = true;
        $timeout(function (){angular.element('[ng-model="username"]').focus();});
        $scope.login = function (event) {
            event.preventDefault();
            Auth.login({
                username: $scope.username,
                password: $scope.password,
                rememberMe: $scope.rememberMe
            }).then(function () {
                $scope.authenticationError = false;
                if ($rootScope.previousStateName === 'register') {
                    $state.go('home');
                } else {
                    $rootScope.back();
                }
                $state.go('home');
                // To add to local storage
                  localStorageService.set('oldPassWord',$scope.password);

            }).catch(function () {
                $scope.authenticationError = true;

            });
        };
    });
