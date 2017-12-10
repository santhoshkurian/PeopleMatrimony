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
            var ul = $location.path().split('/');
            if(ul.length > 3){
                viewLocation = viewLocation+"/"+ul[3];
            }
            return viewLocation === $location.path();
        };
    }
})();
