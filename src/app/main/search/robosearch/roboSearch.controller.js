(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('RoboSearchController', RoboSearchController);

    /** @ngInject */
    function RoboSearchController() {
        var vm = this;
        console.log("RoboSearchController");

    }
})();
