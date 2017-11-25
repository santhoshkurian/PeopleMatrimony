(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('SearchResultsController', SearchResultsController);

    /** @ngInject */
    function SearchResultsController($stateParams) {
        var vm = this;
        console.log("SearchResultsController");
        console.log($stateParams.name);

    }
})();