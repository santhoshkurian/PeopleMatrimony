(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MessageController', MessageController);

    /** @ngInject */
    function MessageController() {
        var vm = this;
        console.log("MessageController");

    }
})();