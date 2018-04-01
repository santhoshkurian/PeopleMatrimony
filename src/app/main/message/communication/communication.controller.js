(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('CommunicationController', CommunicationController);

    /** @ngInject */
    function CommunicationController($http,$state,storageService,$scope,$timeout,resourceUrl,$stateParams,sent,$uibModal) {

        $scope.moreCommunication = function(obj){
            return obj.split(',').join(", ")
        }
    }
})();