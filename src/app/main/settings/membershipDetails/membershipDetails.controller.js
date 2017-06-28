(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MembershipDetailsController', MembershipDetailsController);

    /** @ngInject */
    function MembershipDetailsController() {
        var vm = this;
        console.log("MembershipDetailsController");

    }
})();
