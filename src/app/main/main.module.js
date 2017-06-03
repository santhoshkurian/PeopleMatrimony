(function ()
{
    'use strict';

    angular
        .module('dashboard',[])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        // State
        $stateProvider
            .state('app.pending', {
            url      : '/pending',
            views    : {
                'content@app'         : {
                    templateUrl: 'app/main/dashboard/pending/pending.html',
                    controller : 'PendingController as vm'
                }
            },
            resolve  : {
                
            }
        })
            .state('app.accept', {
                url      : '/accept',
                views    : {
                    'content@app'         : {
                        templateUrl: 'app/main/dashboard/accept/accept.html',
                        controller : 'AcceptController as vm'
                    }
                },
                resolve  : {

                }
            }) .state('app.decline', {
                url      : '/decline',
                views    : {
                    'content@app'         : {
                        templateUrl: 'app/main/dashboard/decline/decline.html',
                        controller : 'DeclineController as vm'
                    }
                },
                resolve  : {

                }
            });

    }

})();