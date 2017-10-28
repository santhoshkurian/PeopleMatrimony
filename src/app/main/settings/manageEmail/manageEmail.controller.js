(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('ManageEmailController', ManageEmailController);

    /** @ngInject */
    function ManageEmailController(alert,$scope) {
        var vm = this;
        console.log(alert);
        $scope.alert = alert;


    }
})();
