(function () {
    'use strict';
    angular
        .module('dashboard')
        .controller('SuccessController', SuccessController);

    /** @ngInject */
    function SuccessController($http, $scope, storageService) {

        $scope.image_url = storageService.get("image_url");
        $scope.package = storageService.get("package");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");

        console.log("success controller")

    }
}());

