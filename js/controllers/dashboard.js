/*jslint node: true */
/*global angular */
'use strict';


angular.module('CapeClient.Controllers.Dashboard', [])


/**
 * Dashboard controller
 */
.controller('dashboard',
[
	'$rootScope', '$scope', 'Cape',
	function ($rootScope, $scope, Cape)
	{
		var timeline 	= new links.Timeline(document.getElementById('mainTimeline'));

		/**
		 * Get slots
		 */
		Cape.getSlots(null, null, function (results)
		{
			var data = [];

			angular.forEach(results.result, function (slot, index)
			{
				data.push({
					start: 		slot.start,
					end: 			slot.end,
					content: 	slot.value,
					group: 		'Planning'
				});
			});

	    timeline.draw(data, {
        width:  '100%',
        height: 'auto',
        editable: true,
        style: 'box',
        showCurrentTime: true,
        showNavigation: false
	    });
		});

	}
]);