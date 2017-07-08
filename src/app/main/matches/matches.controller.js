(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('MatchesController', MatchesController);

    /** @ngInject */
    function MatchesController($scope) {
        var vm = this;
        console.log("MatchesController");
        $scope.currentPage = 1;
        $scope.totalPAges = 20;
        $scope.pageChange = function () {
          console.log($scope.currentPage)
        }

    }


})();