(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('SentNavController', SentNavController);

    /** @ngInject */
    function SentNavController($scope, $location) {

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };


        console.log("SentNavController");

    }
})();
