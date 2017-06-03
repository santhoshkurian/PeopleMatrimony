(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('DeclineController', DeclineController);

    /** @ngInject */
    function DeclineController() {
        var vm = this;
        console.log("DeclineController");

    }
})();