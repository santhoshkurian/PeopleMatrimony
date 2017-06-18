(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('AccountSettingsController', AccountSettingsController);

    /** @ngInject */
    function AccountSettingsController() {
        var vm = this;
        console.log("AccountSettingsController");

    }
})();
