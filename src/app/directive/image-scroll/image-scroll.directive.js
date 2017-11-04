(function () {
    'use strict';

    angular
        .module('matrimony')
        .directive('userinfo', function () {
            return {
                restrict: 'E',
                scope: {
                    user: '='
                },
                templateUrl: '/app/directive/image-scroll/image-scroll.html',
                controller: function ($scope) {
                    $scope.display = $scope.user[0].image;
                    $scope.pos = 0;
                    $scope.size = $scope.user.length;
                    console.log($scope.size)
                    $scope.imageForward = function () {
                        if($scope.pos < $scope.size-1) {
                            $scope.pos = $scope.pos +1;
                            $scope.display = $scope.user[$scope.pos].image;
                        }
                    };
                    $scope.imageBackward = function () {
                        if($scope.pos > 0) {
                            $scope.pos = $scope.pos -1;
                            $scope.display = $scope.user[$scope.pos].image;
                        }
                    };
                },
            };

        });
    ;


})();