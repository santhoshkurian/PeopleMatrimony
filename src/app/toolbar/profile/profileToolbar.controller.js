(function()
{
    'use strict';

    angular
        .module('toolbar')
        .controller('ProfileToolbarController', ProfileToolbarController);

    /** @ngInject */
    function ProfileToolbarController($scope,$location)
    {

        console.log("ProfileToolbarController")

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }
})();