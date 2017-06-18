(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('PrivacySettingsController', PrivacySettingsController);

    /** @ngInject */
    function PrivacySettingsController() {
        var vm = this;
        console.log("PrivacySettingsController");

    }
})();
