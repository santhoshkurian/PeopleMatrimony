(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MatchesController', MatchesController);

    /** @ngInject */
    function MatchesController($scope, storageService,populate,resourceUrl, $http, $location,$state) {


        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $scope.populate = populate;
        console.log($scope.populate);
        $scope.mtcount = 4;
        $scope.educount = 4;
        $scope.ocuCatcount = 4;
        $scope.ocucount = 4;
        $scope.starcount = 4;
        $scope.relcount = 4;

        $scope.logout = logout;

        $scope.image_url = storageService.get("image_url");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");

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


        $scope.mainlink = "newMatches";
        $scope.showFirstmartialStatus = false;
        $scope.showFirstLanguage = false;
        $scope.showDivisions = false;
        $scope.showStars = false;
        $scope.martialStatus = [{name: "Married",count:"married"},
            {name: "Never Married",count:"unmarried"},
            {name: "Widow",count:"widow"},
            {name: "Divorced",count:"divorced"},
            {name: "Widower",count:"widower"}];

        $scope.showMoreMStatus = function (obj1,action) {
            if(action == 'more'){
                $scope[obj1] = $scope[obj1]+4;
            }
            if(action == 'less' && $scope[obj1] > 4){
                $scope[obj1] = $scope[obj1]-4;
            }

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
                url: resourceUrl.url()+'matches/new?' +
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
                url: resourceUrl.url()+'list/ignore?' +
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
                url: resourceUrl.url()+'list/viewed?' +
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
                url: resourceUrl.url()+'list/shortlist?' +
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

        function mutalmatches() {
            $scope.mainlink = "mutalmatches";
            $scope.message = null;
            $scope.showResult = false;


            $scope.matches = [];
            if($scope.matches.length == 0){
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
                url: resourceUrl.url()+'matches?' +
                '&token=' + storageService.get("token")+'&age_start='+$scope.age.start+'&age_end='+$scope.age.end
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
                url: resourceUrl.url()+'matches?' +
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
                url: resourceUrl.url()+'do/shortlist?' +
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
                url: resourceUrl.url()+'connect/send?' +
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
            url: resourceUrl.url()+'matches/new?' +
            '&token=' + storageService.get("token")
        }).then(function successCallback(response) {
            console.log(response)
            $scope.matches = response.data.matches;
        }, function errorCallback(response) {
            console.log(response);
        });

        $scope.match = {mstatus:null}

        $scope.search = function(){
            var query = [];

            $scope.motherTongueIdList=[];
            $("input:checkbox[name=motherTongue]:checked").each(function(){
                $scope.motherTongueIdList.push($(this).val());
            });

            $scope.starIdList=[];
            $("input:checkbox[name=star]:checked").each(function(){
                $scope.starIdList.push($(this).val());
            });

            $scope.religionIdList=[];
            $("input:checkbox[name=religion]:checked").each(function(){
                $scope.religionIdList.push($(this).val());
            });

            $scope.educationIdList=[];
            $("input:checkbox[name=education]:checked").each(function(){
                $scope.educationIdList.push($(this).val());
            });

            $scope.employedIdList=[];
            $("input:checkbox[name=employed]:checked").each(function(){
                $scope.employedIdList.push($(this).val());
            });
            $scope.occupationIdList=[];
            $("input:checkbox[name=occupation]:checked").each(function(){
                $scope.occupationIdList.push($(this).val());
            });

            if($scope.match.mstatus != null){
                query.push("marital_status="+$scope.match.mstatus)
            }
            if($scope.age.start != null){
                query.push("age_start="+$scope.age.start)
            }
            if($scope.age.end != null){
                query.push("age_end="+$scope.age.end)
            }
            if($scope.height.start != null){
                query.push("height_start="+$scope.height.start)
            }
            if($scope.height.end != null){
                query.push("height_end="+$scope.height.end)
            }
            if($scope.motherTongueIdList.length > 0){
                var m = $scope.motherTongueIdList;
                query.push("mothertongue="+ m.join("~"))
            }
            if($scope.religionIdList.length > 0){
                var m = $scope.religionIdList;
                query.push("religion="+ m.join("~"))
            }
            if($scope.starIdList.length > 0){
                var m = $scope.starIdList;
                query.push("star="+ m.join("~"))
            }
            if($scope.educationIdList.length > 0){
                var m = $scope.educationIdList;
                query.push("education="+ m.join("~"))
            }
            if($scope.employedIdList.length > 0){
                var m = $scope.employedIdList;
                query.push("occu_cat="+ m.join("~"))
            }
            if($scope.occupationIdList.length > 0){
                var m = $scope.occupationIdList;
                query.push("occupation="+ m.join("~"))
            }
            $http({
                method: 'POST',
                url: resourceUrl.url()+'matches?' +
                '&token=' + storageService.get("token")+"&"+query
            }).then(function successCallback(response) {
                console.log(response)
                $scope.matches = response.data.matches;
            }, function errorCallback(response) {
                console.log(response);
            });

        }




    }













})();