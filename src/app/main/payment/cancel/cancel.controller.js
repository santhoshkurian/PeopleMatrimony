(function () {
    'use strict';
    angular
        .module('dashboard')
            .controller('CancelController', CancelController);

    /** @ngInject */
    function CancelController($http, $scope, storageService) {

        $('html, body').animate({ scrollTop: 0 }, 'fast');

        $scope.image_url = storageService.get("image_url");
        $scope.package = storageService.get("package");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");

        console.log("cancel controller")

    }
}());
