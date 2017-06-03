(function ()
{
    'use strict';

    angular
        .module('matrimony')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider)
    {
        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/login');

        // State definitions
        $stateProvider
            .state('app', {
                url:'/app',
                views   : {
                    'main@'         : {
                        templateUrl: 'app/core/layouts/dbLayout.html',
                        controller : 'MainController as vm'
                    },
                    'toolbar@app'         : {
                        templateUrl: 'app/toolbar/dashboard/dbToolbar.html',
                        controller : 'ToolbarController as vm'
                    },
                    'navigation@app'         : {
                        templateUrl: 'app/navigation/dashboard/dbNavigation.html',
                        controller : 'ToolbarController as vm'
                    },
                    'content@app'         : {
                        templateUrl: 'app/main/dashboard/dbContent.html',
                        controller : 'ToolbarController as vm'
                    }
                }
            }).state('login', {
                url:'/login',
                views   : {
                    'main@'         : {
                        templateUrl: 'app/core/layouts/loginLayout.html',
                        controller : 'MainController as vm'
                    }
                }
            })

        ;
    }

})();
