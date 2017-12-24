(function ()
{
    'use strict';

    /**
     * Main module of the Matrimony
     */
    angular
        .module('matrimony', ['ui.bootstrap','ui.router','toolbar','dashboard','footer'])
        .factory('testInterceptor', testInterceptor)
        .config(function($httpProvider) {
            $httpProvider.interceptors.push('testInterceptor');
        });

    function testInterceptor($injector,$q,storageService) {
        return {
            request: function(config) {
                return config;
            },

            requestError: function(config) {
                return config;
            },

            response: function(res) {
                console.log("response success",res)

                if(res.data.code === 401) {
                    storageService.set("token",null);
                    storageService.set("id",null);
                    storageService.set("image_url",null);
                    storageService.set("name",null);
                    storageService.set("regular_search",null);
                    $injector.get('$state').transitionTo('login');
                    return $q.reject(res);
                }
                if(res.data.code === 400) {
                    storageService.set("token",null);
                    storageService.set("id",null);
                    storageService.set("image_url",null);
                    storageService.set("name",null);
                    storageService.set("regular_search",null);
                    $injector.get('$state').transitionTo('login');
                    return $q.reject(res);
                }
                return res;
            },

            responseError: function(res) {
                console.log("response error")
                return res;
            }
        }
    }
})();