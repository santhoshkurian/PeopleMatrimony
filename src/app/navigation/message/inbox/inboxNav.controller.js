(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('InboxNavController', InboxNavController);

    /** @ngInject */
    function InboxNavController($scope, $location,$state) {

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
        $scope.viewId = '';
        $scope.viewById = viewById;

        function viewById(id){
            if($scope.viewId != '')
            $state.go('viewProfile',{view_id:id});
        };


        console.log("InboxNavController");

    }
})();
