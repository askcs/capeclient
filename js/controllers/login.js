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
			name:			'sstam',
			password: 'askask'
		};
	}
]);