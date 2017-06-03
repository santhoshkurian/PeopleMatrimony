(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('InboxController', InboxController);

    /** @ngInject */
    function InboxController() {
        var vm = this;
        console.log("InboxController");

    }
})();