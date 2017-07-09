(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MatchesNavigationController', MatchesNavigationController);

    /** @ngInject */
    function MatchesNavigationController($scope, $location) {

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
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


    }
})();
