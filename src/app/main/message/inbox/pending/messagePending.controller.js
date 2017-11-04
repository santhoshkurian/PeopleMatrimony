(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MessagePendingController', MessagePendingController);

    /** @ngInject */
    function MessagePendingController(pending,$scope) {
        var vm = this;
        $scope.pending = pending.list;

        console.log("MessagePendingController");

    }
})();