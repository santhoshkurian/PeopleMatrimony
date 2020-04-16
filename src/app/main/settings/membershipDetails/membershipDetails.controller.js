(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MembershipDetailsController', MembershipDetailsController);

    /** @ngInject */
    function MembershipDetailsController() {
        var vm = this;
        $('html, body').animate({ scrollTop: 0 }, 'fast');

        console.log("MembershipDetailsController");

    }
})();
