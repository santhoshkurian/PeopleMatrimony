(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MessageDeclinedController', MessageDeclinedController);

    /** @ngInject */
    function MessageDeclinedController(declined,$scope) {
        var vm = this;
        $scope.declined = declined.list;
        console.log("MessageDeclinedController");

    }
})();