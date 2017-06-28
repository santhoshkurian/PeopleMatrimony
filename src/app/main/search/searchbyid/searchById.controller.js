(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('SearchByIdController', SearchByIdController);

    /** @ngInject */
    function SearchByIdController() {
        var vm = this;
        console.log("SearchByIdController");

    }
})();
