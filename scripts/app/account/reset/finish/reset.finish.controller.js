'use strict';

angular.module('smartschoolApp')
    .controller('ResetFinishController', function ($scope, $stateParams, Auth) {
        $scope.keyMissing = $stateParams.key === undefined;
        $scope.doNotMatch = null;

        $scope.resetAccount = {};
        angular.element('[ng-model="resetAccount.password"]').focus();

        $scope.finishReset = function() {
            if ($scope.resetAccount.password !== $scope.confirmPassword) {
                $scope.doNotMatch = 'ERROR';
            } else {
                Auth.resetPasswordFinish({key: $stateParams.key, newPassword: $scope.resetAccount.password}).then(function () {
                    $scope.success = 'OK';
                }).catch(function (response) {
                    $scope.success = null;
                    $scope.error = 'ERROR';

                });
            }

        };
    });
