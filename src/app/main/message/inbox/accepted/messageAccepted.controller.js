(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MessageAcceptedController', MessageAcceptedController);

    /** @ngInject */
    function MessageAcceptedController($scope,accept) {
        var vm = this;
        $scope.accept = accept.list;
        console.log("MessageAcceptedController");

    }
})();