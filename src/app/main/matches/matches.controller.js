(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MatchesController', MatchesController);

    /** @ngInject */
    function MatchesController($scope,storageService,$http,$location) {


        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $scope.mainlink = "newMatches";
        $scope.showFirstmartialStatus = false;
        $scope.showFirstLanguage = false;
        $scope.showDivisions = false;
        $scope.showStars = false;
        $scope.martialStatus = [{name:"Married",count:10},{name:"Never Married",count:100},{name:"Widow",count:50}];
        $scope.languages = [{name:"Malayalam",count:10},{name:"English",count:100},{name:"Hindhi",count:50}];
        $scope.divisions = [{name:"Born Again",count:10},{name:"English",count:100},{name:"Hindhi",count:50}];
        $scope.stars = [{name:"Rohini",count:10},{name:"Aaayillyam",count:100},{name:"Pooradam",count:50}];
        $scope.showMoreMStatus = function(){
            $scope.showFirstmartialStatus = !$scope.showFirstmartialStatus;
        }
        $scope.showMoreLanguage = function(){
            $scope.showFirstLanguage = !$scope.showFirstLanguage;
        }
        $scope.showMoreDivisions = function(){
            $scope.showDivisions = !$scope.showDivisions;
        }
        $scope.showMoreStars = function(){
            $scope.showStars = !$scope.showStars;
        }



        var vm = this;
        $scope.matches= [];
        $scope.message = null;
        $scope.currentPage = 1;
        $scope.totalPAges = 20;
        $scope.pageChange = function () {
          console.log($scope.currentPage)
        }

        $scope.shortlist = shortlist;
        $scope.matches = matches;
        $scope.notYetViewed = notYetViewed;
        $scope.viewed = viewed;
        $scope.shortlisted = shortlisted;
        $scope.mutalmatches = mutalmatches;
        $scope.mutalmatches = more;

        function matches(){

        }
         function notYetViewed(){
             $scope.mainlink = "notYetViewed";
             $scope.matches= [];


         }
        function viewed(){
            $scope.mainlink = "viewed";
            $scope.matches= [];


        }
        function shortlisted(){
            $scope.mainlink = "shortlisted";
            $scope.matches= [];



        }
        function mutalmatches(){
            $scope.mainlink = "mutalmatches";
            $scope.matches= [];


        }
        function more(){
            $scope.mainlink = "more";
            $scope.matches= [];


        }







        function shortlist(id){
            $http({
                method: 'GET',
                url: 'http://devapi.peoplematrimony.com/do/shortlist?' +
                '&token=' + storageService.get("token")+'&id='+storageService.get('id')+'&view_id='+id
            }).then(function successCallback(response) {
               console.log(response)
                $scope.message = "Successfully Shortlisted";

            }, function errorCallback(response) {
                console.log(response)
                if(response.data.message == 'Already exists'){
                    $scope.message = "Already Shortlisted";
                }

            });


        }


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

    }


})();