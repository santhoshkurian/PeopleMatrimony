(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MessagePendingController', MessagePendingController);

    /** @ngInject */
    function MessagePendingController() {
        var vm = this;
        console.log("MessagePendingController");

    }
})();