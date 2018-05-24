(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('PrivacySettingsController', PrivacySettingsController);

    /** @ngInject */
    function PrivacySettingsController(resourceUrl,$scope,privacy,profile,$http,storageService) {
        var vm = this;
        console.log(privacy);
        $('html, body').animate({ scrollTop: 0 }, 'fast');

        $scope.privacy = privacy;
        $scope.profile = profile;
        console.log("profile",profile);

        $scope.package = storageService.get("package_name");
        $scope.account_type = storageService.get("account_type");

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

        changePhoto();

        $scope.editPhonePrivacy = editPhonePrivacy;
        $scope.editPhotoPrivacy = editPhotoPrivacy;
        $scope.editVisitorSettings = editVisitorSettings;
        $scope.editShortlistSettings = editShortlistSettings;
        $scope.editDonotDisturb = editDonotDisturb;
        $scope.editProfilePrivacy = editProfilePrivacy;
        $scope.changePhoto = changePhoto;



        function changePhoto(){

            if ($scope.profile.user.gender == 'female'){
                if ($scope.privacy.photo == 'protected') {
                    $scope.image = '/assets/defaultImages/female_photo_protected_card.jpg';
                }
                if ($scope.privacy.photo != 'protected') {
                    if($scope.profile.user.images.length == 0) {
                        $scope.image = '/assets/defaultImages/female_card.jpg';
                    }else{
                        $scope.image = $scope.profile.user.images[0].image;
                    }
                }
            }
            if ($scope.profile.user.gender == 'male'){
                if ($scope.privacy.photo == 'protected') {
                    $scope.image = '/assets/defaultImages/male_photo_protected_card.jpg';
                }
                if ($scope.privacy.photo != 'protected') {
                    if($scope.profile.user.images.length == 0) {
                        $scope.image = '/assets/defaultImages/male_card.jpg';
                    }else{
                        $scope.image = $scope.profile.user.images[0].image;
                    }
                }
            }
        }

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

        $scope.editPhotoPrivacy = editPhotoPrivacy;
        function editPhotoPrivacy(obj){
            $http({
                method: 'POST',
                url: resourceUrl.url()+'settings/privacy?' +
                'token=' +storageService.get('token')+
                '&id=' +storageService.get('id')+
                '&photo='+obj
            }).then(function successCallback(response) {
                changePhoto();
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
