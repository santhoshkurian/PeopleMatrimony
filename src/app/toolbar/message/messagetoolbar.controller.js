(function()
{
    'use strict';

    angular
        .module('toolbar')
        .controller('MessageToolbarController', MessageToolbarController);

    /** @ngInject */
    function MessageToolbarController($scope,$location)
    {

        console.log("MessageToolbarController")

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }
})();
