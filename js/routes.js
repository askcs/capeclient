/*jslint node: true */
/*global angular */
'use strict';


/**
 * Providers & Routes
 */
angular.module('CapeClient')
.config(
[
  '$locationProvider', '$routeProvider', '$httpProvider',
  function ($locationProvider, $routeProvider, $httpProvider)
  {
    /**
     * Home router
     */
    $routeProvider
    .when('/login',
    {
      templateUrl: 'js/views/login.html',
      controller: 'login'
    })


    /**
     * Get started router
     */
    .when('/planboard',
    {
      templateUrl: 'js/views/planboard.html',
      controller: 'planboard'
    })


    /**
     * Router fallback
     */
    .otherwise({
      redirectTo: '/planboard'
    });
  }
]);