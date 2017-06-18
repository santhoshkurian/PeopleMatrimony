(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('DeactivateProfileController', DeactivateProfileController);

    /** @ngInject */
    function DeactivateProfileController() {
        var vm = this;
        console.log("DeactivateProfileController");

    }
})();
