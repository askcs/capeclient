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
    .when('/dashboard',
    {
      templateUrl: 'js/views/dashboard.html',
      controller: 'dashboard'
    })


    /**
     * Router fallback
     */
    .otherwise({
      redirectTo: '/login'
    });
  }
]);