(function()
{
    'use strict';

    angular
        .module('toolbar')
        .controller('SearchToolbarController', SearchToolbarController);

    /** @ngInject */
    function SearchToolbarController($scope,$location)
    {

        console.log("SearchToolbarController")

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }
})();
