(function ()
{
    'use strict';

    /**
     * Main module of the Matrimony
     */
    angular
        .module('matrimony', ['ui.bootstrap','ui.router','toolbar','dashboard','footer'])
        .factory('httpInterceptor', httpInterceptor)
        .config(function($httpProvider) {
            $httpProvider.interceptors.push('httpInterceptor');
        });

    function httpInterceptor($injector,$q,storageService) {
        return {
            request: function(config) {
                return config;
            },

            requestError: function(config) {
                return config;
            },

            response: function(res) {
                if(res.data.code === 401 && res.data.message == 'Token is not valid.') {
                    storageService.clear();
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