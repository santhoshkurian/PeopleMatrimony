(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('InboxNavController', InboxNavController);

    /** @ngInject */
    function InboxNavController($scope, $location) {

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };


        console.log("InboxNavController");

    }
})();
