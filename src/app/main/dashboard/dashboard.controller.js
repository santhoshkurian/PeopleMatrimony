(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('DashboardController', DashboardController);

    /** @ngInject */
    function DashboardController($scope, $location,$http,storageService,newMatches,discoverMatches,viewed,recentUpdated,resourceUrl,$state,profileCompleteness) {

        console.log(profileCompleteness);
        console.log(newMatches);
        console.log("viewed",viewed);
        console.log("discoverMatches",discoverMatches);
        console.log("profileCompleteness",profileCompleteness);
        $scope.messages = profileCompleteness.percentage.data;
        $scope.logout = logout;
        $scope.value = profileCompleteness.percentage.percentage;

        $scope.image_url = storageService.get("image_url");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");

        $scope.newMatches = newMatches;
        $scope.recentUpdated = recentUpdated;
        $scope.viewed = viewed;
        $scope.discover = discoverMatches;




        function logout(){
            $http({
                method: 'GET',
                url: resourceUrl.url()+'user/logout?'+
                'id_people='+storageService.get("id")+'&token='+storageService.get("token")
            }).then(function successCallback(response) {
                storageService.set("token",null);
                storageService.set("id",null);
                storageService.set("image_url",null);
                storageService.set("name",null);
                $state.go('login');

            }, function errorCallback(response) {

            });
        }



        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $http({
            method: 'GET',
            url: resourceUrl.url()+'user/view?' +
            'view_id=' + storageService.get("id") + '&token=' + storageService.get("token")
        }).then(function successCallback(response) {
            console.log(response.data.login_user.images[0])
            $scope.profile = response.data;
            //if(response.data.login_user.images.length > 0) {
            //    var count;
            //    for (count = 0; count < response.data.login_user.images.length; count++) {
            //        var obj = response.data.login_user.images[count];
            //        if(obj.is_primary == 1){
            //            storageService.set("image_url",obj.image)
            //
            //        }
            //    }
            //}


        }, function errorCallback(response) {
            console.log(response)

        });



        //$scope.messages = ["Add carrear details to get more time responses", "Add education details to get more time responses"]
        $scope.messageIndex = 0;
        $scope.loadNextMessage = function () {
            console.log("load message")
            console.log($scope.messages.length)
            if ($scope.messageIndex < $scope.messages.length - 1) {
                $scope.messageIndex = $scope.messageIndex +1;
            }
        }
        $scope.loadPreviosMessage = function () {
            if ($scope.messageIndex > 0) {
                $scope.messageIndex = $scope.messageIndex -1;
            }
        }
        $scope.isLastMessage =function(){
            if($scope.messageIndex == $scope.messages.length - 1){
                return true;
            }else{
                return false;
            }
        }
        $scope.isFirstMessage =function(){
            if($scope.messageIndex == 0){
                return true;
            }else{
                return false;
            }
        }

        console.log("NavigationController");

    }
})();