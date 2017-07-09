(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MessageDeclinedController', MessageDeclinedController);

    /** @ngInject */
    function MessageDeclinedController() {
        var vm = this;
        console.log("MessageDeclinedController");

    }
})();