(function () {
    'use strict';
    angular
        .module('dashboard')
            .controller('ErrorController', ErrorController);

    /** @ngInject */
    function ErrorController($http, $scope, storageService) {

        $scope.image_url = storageService.get("image_url");
        $scope.package = storageService.get("package");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");

        console.log("error controller")

    }
}());

