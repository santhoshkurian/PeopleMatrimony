(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('BlockedController', BlockedController);

    /** @ngInject */
    function BlockedController(storageService,$scope,blocked) {
        var vm = this;
        console.log(blocked);
        $scope.image_url = storageService.get("image_url");
        $scope.package = storageService.get("package");
        $scope.name = storageService.get("name");
        $scope.id = storageService.get("id");
        $scope.blocked = blocked;
    }
})();