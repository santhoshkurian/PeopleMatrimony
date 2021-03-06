(function () {
    'use strict';
    angular
        .module('dashboard')
            .controller('ErrorController', ErrorController);

    /** @ngInject */
    function ErrorController($http, $scope, storageService) {
        $('html, body').animate({ scrollTop: 0 }, 'fast');

        $scope.image_url = storageService.get("image_url");
        $scope.package = storageService.get("package_name");
        $scope.account_type = storageService.get("account_type");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");

        console.log("error controller")

    }
}());

