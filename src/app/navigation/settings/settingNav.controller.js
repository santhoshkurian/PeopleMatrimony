(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('SettingsNavController', SettingsNavController);

    /** @ngInject */
    function SettingsNavController($scope, $location) {

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };


        console.log("SettingsNavController");

    }
})();