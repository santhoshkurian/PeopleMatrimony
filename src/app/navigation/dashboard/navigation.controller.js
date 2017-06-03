(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('NavigationController', NavigationController);

    /** @ngInject */
    function NavigationController() {


        var vm = this;
        console.log("NavigationController");

    }
})();