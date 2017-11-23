(function()
{
    'use strict';

    angular
        .module('toolbar')
        .controller('SearchToolbarController', SearchToolbarController);

    /** @ngInject */
    function SearchToolbarController($scope,$location,storageService)
    {

        console.log("SearchToolbarController")

        $scope.image_url = storageService.get("image_url");


        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }
})();
