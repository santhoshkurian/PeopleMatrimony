(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('SearchResultsController', SearchResultsController);

    /** @ngInject */
    function SearchResultsController() {
        var vm = this;
        console.log("SearchResultsController");

    }
})();