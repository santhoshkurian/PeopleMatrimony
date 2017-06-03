(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('NavigationController', NavigationController);

    /** @ngInject */
    function NavigationController($scope, $location) {

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };


        console.log("NavigationController");

    }
})();