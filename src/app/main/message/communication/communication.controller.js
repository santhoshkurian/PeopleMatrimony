(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('CommunicationController', CommunicationController);

    /** @ngInject */
    function CommunicationController($http,$state,storageService,$scope,$timeout,resourceUrl,$stateParams,viewProfile,$uibModal) {

       console.log(viewProfile);
        $scope.view=viewProfile;
    }
})();