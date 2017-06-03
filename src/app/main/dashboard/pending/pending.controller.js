(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('PendingController', PendingController);

    /** @ngInject */
    function PendingController() {
        var vm = this;
        console.log("PendingController");

    }
})();