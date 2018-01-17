(function()
{
    'use strict';

    angular
        .module('footer')
        .controller('FooterController', FooterController);

    /** @ngInject */
    function FooterController($window,storageService,$scope)
    {

        $scope.showLink = false;
       if(storageService.get('id') != null && storageService.get('token') != null){
           console.log("footeeeer")
           $scope.showLink = true;

       }
        console.log("FooterController")
        angular.element($window).on('resize', function () {
            console.log($window.innerWidth);
        });
    }
})();