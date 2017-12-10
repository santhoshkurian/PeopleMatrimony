(function()
{
    'use strict';

    angular
        .module('toolbar')
        .controller('SearchResultsToolbarController', SearchResultsToolbarController);

    /** @ngInject */
    function SearchResultsToolbarController($scope,$location,storageService)
    {

        console.log("SearchResultsToolbarController");

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }
})();
