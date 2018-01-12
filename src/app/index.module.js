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
                if(res.data.code === 401) {
                    storageService.set("token",'');
                    storageService.set("id",'');
                    storageService.set("image_url",'');
                    storageService.set("name",'');
                    storageService.set("regular_search",'');
                    $(".page-loading").addClass("page-loading-hidden");
                    $("#body-filter").removeClass("page-grey-color");
                    $injector.get('$state').transitionTo('login');
                    return $q.reject(res);
                }
                if(res.data.code === 400) {
                    storageService.set("token",null);
                    storageService.set("id",null);
                    storageService.set("image_url",null);
                    storageService.set("name",null);
                    storageService.set("regular_search",null);
                    $(".page-loading").addClass("page-loading-hidden");
                    $("#body-filter").removeClass("page-grey-color");
                    $injector.get('$state').transitionTo('login');
                    return $q.reject(res);
                }
                return res;
            },

            responseError: function(res) {
                return res;
            }
        }
    }
})();