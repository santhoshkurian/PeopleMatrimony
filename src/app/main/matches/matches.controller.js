(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MatchesController', MatchesController);

    /** @ngInject */
    function MatchesController() {
        var vm = this;
        console.log("MatchesController");

    }
})();