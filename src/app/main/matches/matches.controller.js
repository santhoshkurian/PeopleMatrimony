(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MatchesController', MatchesController);

    /** @ngInject */
    function MatchesController($scope, storageService, $http, $location,$state) {


        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $scope.logout = logout;

        $scope.image_url = storageService.get("image_url");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");

        function logout(){
            $http({
                method: 'GET',
                url: 'https://devapi.peoplematrimony.com/user/logout?'+
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


        $scope.mainlink = "newMatches";
        $scope.showFirstmartialStatus = false;
        $scope.showFirstLanguage = false;
        $scope.showDivisions = false;
        $scope.showStars = false;
        $scope.martialStatus = [{name: "Married", count: 10}, {name: "Never Married", count: 100}, {
            name: "Widow",
            count: 50
        }];
        $scope.languages = [{name: "Malayalam", count: 10}, {name: "English", count: 100}, {name: "Hindhi", count: 50}];
        $scope.divisions = [{name: "Born Again", count: 10}, {name: "English", count: 100}, {
            name: "Hindhi",
            count: 50
        }];
        $scope.stars = [{name: "Rohini", count: 10}, {name: "Aaayillyam", count: 100}, {name: "Pooradam", count: 50}];
        $scope.showMoreMStatus = function () {
            $scope.showFirstmartialStatus = !$scope.showFirstmartialStatus;
        }
        $scope.showMoreLanguage = function () {
            $scope.showFirstLanguage = !$scope.showFirstLanguage;
        }
        $scope.showMoreDivisions = function () {
            $scope.showDivisions = !$scope.showDivisions;
        }
        $scope.showMoreStars = function () {
            $scope.showStars = !$scope.showStars;
        }


        var vm = this;
        $scope.matches = [];
        $scope.message = null;
        $scope.currentPage = 1;
        $scope.totalPAges = 20;
        $scope.pageChange = function () {
            console.log($scope.currentPage)
        }

        $scope.shortlist = shortlist;
        $scope.newMatches = newMatches;
        $scope.notYetViewed = notYetViewed;
        $scope.viewed = viewed;
        $scope.shortlisted = shortlisted;
        $scope.sendInterest = sendInterest;
        $scope.mutalmatches = mutalmatches;
        $scope.mutalmatches = more;
        $scope.myInterval = 3000;




        function newMatches() {
            $scope.mainlink = "newMatches";
            $scope.message = null;
            $scope.showResult = false;
            console.log('new Matches');


            $http({
                method: 'GET',
                url: 'https://devapi.peoplematrimony.com/matches/new?' +
                '&token=' + storageService.get("token")
            }).then(function successCallback(response) {
                console.log(response)
                $scope.matches = response.data.matches;
                if($scope.matches.length == 0){
                    $scope.showResult = true;
                }
            }, function errorCallback(response) {
                console.log(response);
            });

        }

        function notYetViewed() {
            $scope.mainlink = "notYetViewed";
            $scope.message = null;
            $scope.showResult = false;
            $http({
                method: 'GET',
                url: 'http://devapi.peoplematrimony.com/list/ignore?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get("id")
            }).then(function successCallback(response) {
                console.log(response)
                $scope.matches = response.data.matches;
                if($scope.matches.length == 0){
                    $scope.showResult = true;
                }
            }, function errorCallback(response) {
                console.log(response);
            });


        }

        function viewed() {
            $scope.mainlink = "viewed";
            $scope.message = null;
            $scope.showResult = false;
            $http({
                method: 'GET',
                url: 'http://devapi.peoplematrimony.com/list/viewed?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get("id")
            }).then(function successCallback(response) {
                console.log(response)
                $scope.matches = response.data.matches;
                if($scope.matches.length == 0){
                    $scope.showResult = true;
                }
            }, function errorCallback(response) {
                console.log(response);
            });




        }

        function shortlisted() {
            $scope.mainlink = "shortlisted";
            $scope.message = null;
            $scope.showResult = false;


            $scope.matches = [];
            $http({
                method: 'GET',
                url: 'http://devapi.peoplematrimony.com/list/shortlist?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get("id")
            }).then(function successCallback(response) {
                console.log(response)
                $scope.matches = response.data.matches;
                if($scope.matches.length > 0){
                    $scope.showResult = true;
                }
            }, function errorCallback(response) {
                console.log(response);
            });


        }

        function mutalmatches() {
            $scope.mainlink = "mutalmatches";
            $scope.message = null;
            $scope.showResult = false;


            $scope.matches = [];
            if($scope.matches.length > 0){
                $scope.showResult = true;
            }


        }

        function more() {
            $scope.mainlink = "more";
            $scope.message = null;

            $scope.matches = [];


        }


        $scope.age = {start: null, end: null};


        $scope.agefilter = agefilter;
        function agefilter() {
            $http({
                method: 'POST',
                url: 'https://devapi.peoplematrimony.com/matches?' +
                '&token=' + storageService.get("token")+'&type=search&age_start='+$scope.age.start+'&age_end='+$scope.age.end
            }).then(function successCallback(response) {
                console.log(response)
                $scope.matches = response.data.matches;
            }, function errorCallback(response) {
                console.log(response);
            });
        }


        $scope.height = {start: null, end: null};


        $scope.heightfilter = heightfilter;
        function heightfilter() {
            $http({
                method: 'POST',
                url: 'https://devapi.peoplematrimony.com/matches?' +
                '&token=' + storageService.get("token")+'&type=search&height_start='+$scope.height.start+'&height_end='+$scope.height.end
            }).then(function successCallback(response) {
                console.log(response)
                $scope.matches = response.data.matches;
            }, function errorCallback(response) {
                console.log(response);
            });
        }


        function shortlist(id) {
            $http({
                method: 'GET',
                url: 'http://devapi.peoplematrimony.com/do/shortlist?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get('id') + '&view_id=' + id
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

        function sendInterest(id) {
            $http({
                method: 'GET',
                url: 'http://devapi.peoplematrimony.com/connect/send?' +
                '&token=' + storageService.get("token") + '&id=' + storageService.get('id') + '&partner=' + id
            }).then(function successCallback(response) {
                console.log(response)
                $scope.message = "send interest successfully";

            }, function errorCallback(response) {
                console.log(response)
                if (response.data.code == '400') {
                    $scope.message = "Already send a Interest";
                }

            });


        }

        $scope.images=[{ "image": "/assets/images/profile2.jpg",
            "status": "pending",
            "is_primary": 0,
            "is_validated": 0,
            "number": 20,
            "category": "general"},{ "image": "/assets/images/prof1.jpg",
            "status": "pending",
            "is_primary": 0,
            "is_validated": 0,
            "number": 20,
            "category": "general"}]


        $http({
            method: 'GET',
            url: 'https://devapi.peoplematrimony.com/matches/new?' +
            '&token=' + storageService.get("token")
        }).then(function successCallback(response) {
            console.log(response)
            $scope.matches = response.data.matches;
        }, function errorCallback(response) {
            console.log(response);
        });






        $scope.imageBackward = imageBackward;
        $scope.imageForward = imageForward;

        function imageBackward(obj,o){
            console.log(obj)
            return {img:$scope.images[o+1],pos:o+1}
        }

function imageForward(){
            console.log("imageForward")
        }


    }













})();