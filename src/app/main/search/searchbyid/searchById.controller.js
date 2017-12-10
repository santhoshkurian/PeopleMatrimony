(function () {
    'use strict';

    angular
        .module('dashboard')
        .controller('SearchByIdController', SearchByIdController);

    /** @ngInject */
    function SearchByIdController($scope,$http,resourceUrl,storageService,$stateParams) {
        var vm = this;
        console.log("SearchByIdController");
        $scope.viewId = '';
        $scope.gender = null;
        $scope.item=null;
        if($stateParams.id != '1'){
            $scope.viewId = $stateParams.id;
            viewById($stateParams.id);
        }

        $scope.viewById = viewById;
        function viewById(id){
            $http({
                method: 'GET',
                url: resourceUrl.url()+'user/view?'+
                'view_id='+id+'&token='+storageService.get("token")
            }).then(function successCallback(response) {
                console.log(response)
                $scope.item = response.data.user;
                $scope.gender= response.data.user.gender;
            }, function errorCallback(response) {
                console.log(response)

            });
        }

    }
})();
