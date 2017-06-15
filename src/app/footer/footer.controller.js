(function()
{
    'use strict';

    angular
        .module('footer')
        .controller('FooterController', FooterController);

    /** @ngInject */
    function FooterController($window)
    {

        console.log("FooterController")
        angular.element($window).on('resize', function () {
            console.log($window.innerWidth);
        });
    }
})();