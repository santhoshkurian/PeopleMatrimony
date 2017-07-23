(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MessageAllController', MessageAllController);

    /** @ngInject */
    function MessageAllController() {
        var vm = this;
        console.log("MessageAllController");

    }
})();