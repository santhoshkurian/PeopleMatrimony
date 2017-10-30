(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('PrivacySettingsController', PrivacySettingsController);

    /** @ngInject */
    function PrivacySettingsController($scope,privacy) {
        var vm = this;
        console.log(privacy)
        $scope.privacy = privacy;

        $scope.phonePrivacy = false;
        $scope.photoPrivacy = false;
        $scope.visitorSettings = false;
        $scope.shortlistSettings = false;
        $scope.donotDisturb = false;
        $scope.profilePrivacy = false;

        $scope.editPhonePrivacy = editPhonePrivacy;
        $scope.editPhotoPrivacy = editPhotoPrivacy;
        $scope.editVisitorSettings = editVisitorSettings;
        $scope.editShortlistSettings = editShortlistSettings;
        $scope.editDonotDisturb = editDonotDisturb;
        $scope.editProfilePrivacy = editProfilePrivacy;

        function editPhonePrivacy(){

        }

        function editPhotoPrivacy(){

        }

        function editVisitorSettings(){

        }

        function editShortlistSettings(){

        }

        function editProfilePrivacy(){

        }



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
