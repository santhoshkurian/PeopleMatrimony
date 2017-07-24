(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('SentController', SentController);

    /** @ngInject */
    function SentController() {
        var vm = this;
        console.log("SentController");

    }
})();