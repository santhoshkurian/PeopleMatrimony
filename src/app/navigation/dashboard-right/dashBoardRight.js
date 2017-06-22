(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('DashBoardRightController', DashBoardRightController);

    /** @ngInject */
    function DashBoardRightController($scope, $location) {

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        $scope.openLocation = false;
        $scope.openProfession = false;
        $scope.openEducation = false;
        $scope.openstars= false;
        $scope.openFamilyValues= false;
        $scope.openLocationPreference = function() {
            $scope.openLocation = !$scope.openLocation;
        }
        $scope.openProfessionPreference = function(){
            $scope.openProfession = !$scope.openProfession;
        }
        $scope.openEducationPreference = function(){
            $scope.openEducation = !$scope.openEducation;
        }
        $scope.openFamilyValuesPreference = function(){
            $scope.openFamilyValues = !$scope.openFamilyValues;
        }
        $scope.openStarsPreference = function(){
            $scope.openstars = !$scope.openstars;
        }

    }
})();