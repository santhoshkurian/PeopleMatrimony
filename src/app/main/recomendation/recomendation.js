(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('ReconmendationController', ReconmendationController);

    /** @ngInject */
    function ReconmendationController($scope,$http,resourceUrl,storageService,$state,dailyMatches) {
        var vm = this;
        $('html, body').animate({ scrollTop: 0 }, 'fast');

        $scope.image_url = storageService.get("image_url");
        $scope.package = storageService.get("package_name");
        $scope.account_type = storageService.get("account_type");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");

        console.log("dailyMatches",dailyMatches);
        $scope.dailyMatches = dailyMatches;
        $scope.recomendationList = [];
        $scope.msg = '';
        $scope.viewData = false;

        if($scope.dailyMatches.matches.length > 0){
            viewProfile($scope.dailyMatches.matches[0].id);


        }

        $scope.viewType = 'personal';
        $scope.selectType = selectType;
        function selectType(type) {
            $scope.viewType = type;
        }


        $scope.viewProfile = viewProfile;
        $scope.msg = '';
        $scope.viewData = false;

        function viewProfile(obj) {
            $http({
                method: 'GET',
                url: resourceUrl.url()+'user/view?'+
                'view_id='+obj+'&token='+storageService.get("token")
            }).then(function successCallback(response) {
                console.log(response);
                if(response.data.error){
                    $scope.viewData = false;
                    $scope.msg = response.data.message;
                }else{
                    $scope.viewData = true;

                    $scope.view = response.data.user;
                }

                return response.data;
            }, function errorCallback(response) {
                return 'error';
            });        }


        $scope.showSelected = showSelected;
        function showSelected(obj) {
            console.log(obj);
            viewProfile(obj.id);
            //$scope.view = obj;
        }

        $scope.scrollRight = scrollRight;
        function scrollRight() {
            console.log("check");
            var elmnt = document.getElementById("myDIV");
            elmnt.scrollLeft += 150;

        }

        $scope.scrollLeft = scrollLeft;
        function scrollLeft() {
            console.log("check");
            var elmnt = document.getElementById("myDIV");
            elmnt.scrollLeft -= 150;

        }

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
    }




})();