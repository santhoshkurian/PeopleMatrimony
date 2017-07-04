(function()
{
    'use strict';

    angular
        .module('toolbar')
        .controller('MatchesToolbarController', MatchesToolbarController);

    /** @ngInject */
    function MatchesToolbarController($scope,$location)
    {

        console.log("MatchesToolbarController")

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }
})();
