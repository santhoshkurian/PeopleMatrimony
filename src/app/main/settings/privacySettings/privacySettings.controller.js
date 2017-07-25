(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('PrivacySettingsController', PrivacySettingsController);

    /** @ngInject */
    function PrivacySettingsController($scope) {
        var vm = this;
        $scope.phonePrivacy = false;
        $scope.photoPrivacy = false;
        $scope.visitorSettings = false;
        $scope.shortlistSettings = false;
        $scope.donotDisturb = false;
        $scope.profilePrivacy = false;
        $scope.openPhonePrivacy = function() {
            $scope.phonePrivacy = !$scope.phonePrivacy;
        }
        $scope.openPhotoPrivacy = function() {

            $scope.photoPrivacy = !$scope.photoPrivacy;
        }
        $scope.openVisitorSettings = function() {

            $scope.visitorSettings = !$scope.visitorSettings;
        }
        $scope.openShortlistSettings = function() {

            $scope.shortlistSettings = !$scope.shortlistSettings;
        }
        $scope.openDonotDisturb = function() {
            $scope.donotDisturb = !$scope.donotDisturb;
        }
        $scope.openProfilePrivacy = function() {
            $scope.profilePrivacy = !$scope.profilePrivacy;
        }
        console.log("PrivacySettingsController");

    }
})();
