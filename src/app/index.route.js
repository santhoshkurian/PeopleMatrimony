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
                        templateUrl: 'app/core/layouts/dbLayout.html'
                        //controller : 'InboxController as vm'
                    },
                    'toolbar@app'         : {
                        templateUrl: 'app/toolbar/dashboard/dbToolbar.html',
                        controller : 'DashboardToolbarController as vm'
                    },
                    'navigation@app'         : {
                        templateUrl: 'app/navigation/dashboard/dbNavigation.html',
                        controller : 'NavigationController as vm'
                    },
                    'content@app'         : {
                        templateUrl: 'app/main/dashboard/inbox/inbox.html',
                        controller : 'InboxController as vm'
                    }
                }
            }).state('login', {
                url:'/login',
                views   : {
                    'main@'         : {
                        templateUrl: 'app/core/layouts/loginLayout.html'
                        //controller : 'MainController as vm'
                    },
                    'toolbar@login'         : {
                        templateUrl: 'app/toolbar/login/loginToolbar.html'
                        //controller : 'LoginController as vm'
                    },
                    'content@login'         : {
                        templateUrl: 'app/main/login/loginContent.html',
                        controller : 'LoginController as vm'
                    }
                }
            })

        ;
    }

})();
