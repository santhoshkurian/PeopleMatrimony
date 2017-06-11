(function()
{
    'use strict';

    angular
        .module('toolbar')
        .controller('DashboardToolbarController', DashboardToolbarController);

    /** @ngInject */
    function DashboardToolbarController($scope,$location)
    {

        console.log("DashboardToolbarController")

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }
})();