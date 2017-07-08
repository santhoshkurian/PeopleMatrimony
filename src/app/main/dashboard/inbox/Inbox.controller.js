(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('InboxController', InboxController);

    /** @ngInject */
    function InboxController($scope) {
        var vm = this;

        console.log("InboxController");
        $scope.messages = ["Add carrear details to get more time responses", "Add education details to get more time responses"]
        $scope.messageIndex = 0;
        $scope.loadNextMessage = function () {
            if ($scope.messageIndex < $scope.messages.length - 1) {
                $scope.messageIndex = $scope.messageIndex +1;
            }
        }
        $scope.loadPreviosMessage = function () {
            if ($scope.messageIndex > 0) {
                $scope.messageIndex = $scope.messageIndex -1;
            }
        }
        $scope.isLastMessage =function(){
            if($scope.messageIndex == $scope.messages.length - 1){
                return true;
            }else{
                return false;
            }
        }
        $scope.isFirstMessage =function(){
            if($scope.messageIndex == 0){
                return true;
            }else{
                return false;
            }
        }
    }
})();