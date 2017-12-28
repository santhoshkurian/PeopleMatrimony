(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('PrivacySettingsController', PrivacySettingsController);

    /** @ngInject */
    function PrivacySettingsController(resourceUrl,$scope,privacy,profile,$http,storageService) {
        var vm = this;
        console.log(privacy)
        $scope.privacy = privacy;
        $scope.profile = profile;
        console.log(profile);

        $scope.logout = logout;
        function logout(){
            $http({
                method: 'GET',
                url: resourceUrl.url()+'user/logout?'+
                'id_people='+storageService.get("id")+'&token='+storageService.get("token")
            }).then(function successCallback(response) {
                storageService.set("token",'');
                storageService.set("id",'');
                storageService.set("image_url",'');
                storageService.set("name",'');
                storageService.set("package",'');
                storageService.set("regular_search",'');
                $state.go('login');

            }, function errorCallback(response) {

            });
        }

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

        function editPhonePrivacy(obj){
            console.log(obj)
            $http({
                method: 'POST',
                url: resourceUrl.url()+'settings/privacy?' +
                'token=' +storageService.get('token')+
                '&id=' +storageService.get('id')+
                '&phone='+obj
            }).then(function successCallback(response) {
            }, function errorCallback(response) {


            });

        }

        function editPhotoPrivacy(obj){
            $http({
                method: 'POST',
                url: resourceUrl.url()+'settings/privacy?' +
                'token=' +storageService.get('token')+
                '&id=' +storageService.get('id')+
                '&photo='+obj
            }).then(function successCallback(response) {
            }, function errorCallback(response) {


            });

        }

        function editVisitorSettings(obj){
            $http({
                method: 'POST',
                url: resourceUrl.url()+'settings/privacy?' +
                'token=' +storageService.get('token')+
                '&id=' +storageService.get('id')+
                '&view='+obj
            }).then(function successCallback(response) {
            }, function errorCallback(response) {


            });

        }

        function editShortlistSettings(obj){
            $http({
                method: 'POST',
                url: resourceUrl.url()+'settings/privacy?' +
                'token=' +storageService.get('token')+
                '&id=' +storageService.get('id')+
                '&shortlist='+obj
            }).then(function successCallback(response) {
            }, function errorCallback(response) {


            });

        }

        function editDonotDisturb(obj){
            $http({
                method: 'POST',
                url: resourceUrl.url()+'settings/privacy?' +
                'token=' +storageService.get('token')+
                '&id=' +storageService.get('id')+
                '&contact='+obj
            }).then(function successCallback(response) {
            }, function errorCallback(response) {


            });

        }

        function editProfilePrivacy(obj){
            $http({
                method: 'POST',
                url: resourceUrl.url()+'settings/privacy?' +
                'token=' +storageService.get('token')+
                '&id=' +storageService.get('id')+
                '&profile='+obj
            }).then(function successCallback(response) {
            }, function errorCallback(response) {


            });

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
