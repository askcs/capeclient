/*jslint node: true */
/*global angular */
'use strict';


angular.module('CapeClient.Controllers.Login', [])


/**
 * Login controller
 */
.controller('login',
[
	'$rootScope', '$scope', 'Cape',
	function ($rootScope, $scope, Cape)
	{
		/**
		 * User credentials container
		 */
		$scope.user = {
			name: 		'',
			password: ''
		};

		$scope.login = function ()
		{
			Cape.login($scope.user.name, $scope.user.password);
		}
	}
]);