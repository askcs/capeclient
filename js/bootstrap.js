/*jslint node: true */
/*global angular */
/*global $ */
'use strict';


/**
 * Initial run functions
 */
angular.module('CapeClient')
.run(
[
  '$rootScope', '$location', 'Cape',
  function ($rootScope, $location, Cape)
  {
    /**
     * Login
     */
    $rootScope.login = function (user)
    {
      Cape.login(user.name, user.password,
        function ()
        {
          $rootScope.$apply(function ()
          {
            $location.path('/dashboard');
          });
        }
      );
    };


    /**
     * Logout
     */
    $rootScope.logout = function ()
    {
      Cape.disconnect(
        function ()
        {
          $location.path('/login');
        }
      )
    };


    /**
     * Get current location
     */
  	$rootScope.location = $location.path();


    /**
     * Detect route change start
     */
    $rootScope.$on("$routeChangeStart", function (event, next, current)
    {
    });


    /**
     * Route change successfull
     */
    $rootScope.$on("$routeChangeSuccess", function (event, current, previous)
    {
      $rootScope.location = $location.path();
    });


    /**
     * Route change is failed!
     */
    $rootScope.$on("$routeChangeError", function (event, current, previous, rejection)
    {
      $rootScope.notifier.error(rejection);
    });

  }
]);