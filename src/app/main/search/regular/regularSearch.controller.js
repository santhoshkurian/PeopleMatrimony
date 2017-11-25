(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('RegularSearchController', RegularSearchController);

    /** @ngInject */
    function RegularSearchController($scope,$state) {
        var vm = this;
        console.log("RegularSearchController");

        $scope.regular = {
            age_start:null,
            age_end:null,
            height_start:null,
            height_end:null,
            mothertongue:null,
            religion:null,
            caste:null,
            occupation:null,
            country:null,
            state:null,
            city:null,
            matrial_status:null,
            name:null,
            gender:null,
        };

        $scope.search = search;
        function search(){
            $state.go("searchresult",{ name : $scope.regular})
        }

    }
})();
