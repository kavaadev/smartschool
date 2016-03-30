'use strict';

angular.module('smartschoolApp')
    .controller('PasswordController', function ($scope, Auth, Principal,localStorageService) {
        Principal.identity().then(function(account) {
            $scope.account = account;
        });
        var oldPassWord = localStorageService.get('oldPassWord');
        $scope.success = null;
        $scope.error = null;



        $scope.changePassword = function () {
        if (oldPassWord === $scope.passwordOld){

            if ($scope.password !== $scope.confirmPassword) {
                $scope.error = null;
                $scope.success = null;
                $scope.doNotMatch = 'ERROR';
                $scope.doNotMatchOld = null;



            } else {
                $scope.doNotMatch = null;
                $scope.doNotMatchOld = null;
                Auth.changePassword($scope.password).then(function () {
                    $scope.error = null;
                    $scope.success = 'OK';
                    oldPassWord = $scope.password


                }).catch(function () {
                    $scope.success = null;
                    $scope.error = 'ERROR';
                });
            }
            }
        else {
                  $scope.error = null;
                  $scope.success = null;
                   $scope.doNotMatch = null;
                  $scope.doNotMatchOld = 'ERROR';}

        };
    });
