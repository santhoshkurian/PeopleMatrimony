(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('ViewProfileController', ViewProfileController);

    /** @ngInject */
    function ViewProfileController($scope,$http,storageService,resourceUrl,viewProfile,$timeout) {

        console.log("check", viewProfile);
        $scope.percentage = 0;
        $scope.viewProfile = true;
        $scope.image_url = storageService.get("image_url");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");
        $scope.viewType = 'personal';
        $scope.showAction = true;
        $scope.showMessage = false;
        $scope.selectType = selectType;
        $scope.skipAction = skipAction;
        function skipAction() {
            $scope.showAction = false;
        }

        function selectType(type) {
            $scope.viewType = type;
        }

        if (viewProfile != 'error') {

        $scope.view = viewProfile.user;
        $scope.pref = viewProfile.user.preferences;
            console.log("view Profile", JSON.stringify(viewProfile));
        }else{
            $scope.viewProfile = false;
        }
        $scope.sendInterest = sendInterest;
        $scope.shortlist = shortlist;

        function sendInterest() {
            $http({
                method: 'GET',
                url: resourceUrl.url()+'connect/send?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get('id') + '&partner=' + $scope.view.id_people
            }).then(function successCallback(response) {
                console.log(response)
                $scope.message = "send interest successfully";
                $scope.showMessage=true;
                $scope.showAction=false;

                $timeout(function() { $scope.message = ''; $scope.showMessage=false;

                }, 2000);


            }, function errorCallback(response) {
                console.log(response)
                if (response.data.code == '400') {
                    $scope.showMessage=true;

                    $scope.message = "Already send a Interest";
                    $scope.showAction=false;

                }
                $timeout(function() { $scope.message = ''; $scope.showMessage=false;

                }, 2000);

            });


        }

        function shortlist() {
            $http({
                method: 'GET',
                url: resourceUrl.url()+'do/shortlist?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get('id') + '&view_id=' + $scope.view.id_people
            }).then(function successCallback(response) {
                console.log(response)
                $scope.message = "Successfully Shortlisted";

            }, function errorCallback(response) {
                console.log(response)
                if (response.data.message == 'Already exists') {
                    $scope.message = "Already Shortlisted";
                }

            });


        }







    }
})();