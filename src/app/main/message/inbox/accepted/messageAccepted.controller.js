(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MessageAcceptedController', MessageAcceptedController);

    /** @ngInject */
    function MessageAcceptedController() {
        var vm = this;
        console.log("MessageAcceptedController");

    }
})();