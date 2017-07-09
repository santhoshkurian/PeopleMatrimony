(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('ViewProfileController', ViewProfileController);

    /** @ngInject */
    function ViewProfileController($scope) {
        function selectType(){
            console.log("check");
        }
    }
})();