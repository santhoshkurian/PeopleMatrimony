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

        $urlRouterProvider.otherwise('/sample');

        // State definitions
        $stateProvider
            .state('app', {
                url:'/app',
                views   : {
                    'main@'         : {
                        templateUrl: 'app/core/layouts/dashboard.html',
                        controller : 'MainController as vm'
                    },
                    'toolbar@app'         : {
                        templateUrl: 'app/toolbar/dashboard/toolbar.html',
                        controller : 'ToolbarController as vm'
                    },
                    'navigation@app'         : {
                        templateUrl: 'app/navigation/dashboard/dashboard.html',
                        controller : 'ToolbarController as vm'
                    },
                    'content@app'         : {
                        templateUrl: 'app/main/dashboard/content.html',
                        controller : 'ToolbarController as vm'
                    }
                    //,
                    //'toolbar@app'   : {
                    //    templateUrl: layouts[layoutStyle].toolbar,
                    //    controller : 'ToolbarController as vm'
                    //},
                    //'navigation@app': {
                    //    templateUrl: layouts[layoutStyle].navigation,
                    //    controller : 'NavigationController as vm'
                    //}
                    //,
                    //'quickPanel@app': {
                    //    templateUrl: 'app/quick-panel/quick-panel.html',
                    //    controller : 'QuickPanelController as vm'
                    //}
                }
            });
    }

})();
