(function () {
    'use strict';

    angular
        .module('matrimony')
        .directive('mailbox', function () {
            return {
                restrict: 'E',
                scope: {
                    mail: '=',
                    res: '=',
                    user: '=',
                    reverse: "&"
                },
                templateUrl: '/app/directive/mail-box/mail-box.html',
                controller: function ($scope) {
                    console.log("mail",$scope.mail);
                    console.log("type",$scope.res);
                    console.log("user",$scope.user);
                    $scope.reclen = 0;
                    $scope.sentlen = 0;
                    $scope.commulen = $scope.mail.received.length + $scope.mail.sent.length;
                    console.log("commulen",$scope.commulen);

                    $scope.showLink = false;
                    if($scope.commulen> 0){
                        $scope.showLink = true;
                    }
                    $scope.showCon = function(){
                        $scope.reclen = $scope.mail.received.length
                        $scope.sentlen = $scope.mail.sent.length
                        $scope.showLink = false;

                    }

                    $scope.sendInterest = function(obj1,obj2){
                        $scope.reverse({data:{comId:obj1,type:obj2,partner:$scope.user}});


                    }

                },
            };

        });
    ;


})();