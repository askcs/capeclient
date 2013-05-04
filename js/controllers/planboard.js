/*jslint node: true */
/*global angular */
'use strict';


angular.module('CapeClient.Controllers.Planboard', [])


/**
 * Dashboard controller
 */
.controller('planboard',
[
	'$rootScope', '$scope', '$q', '$window', '$location', 'Slots', 'Dater', 'Storage', 'Sloter', 'Cape',
	function ($rootScope, $scope, $q, $window, $location, Slots, Dater, Storage, Sloter, Cape)
	{
		// var timeline 	= new links.Timeline(document.getElementById('mainTimeline'));

		/**
		 * Get slots
		 */
		Cape.getSlots(null, null, function (results)
		{
			console.log('results ->', results);

			// $scope.data = {
			// 	user: results
			// };

			// var data = [];

			// angular.forEach(results.result, function (slot, index)
			// {
			// 	data.push({
			// 		start: 		slot.start,
			// 		end: 			slot.end,
			// 		content: 	slot.value,
			// 		group: 		'Planning'
			// 	});
			// });

	  //   timeline.draw(data, {
   //      width:  '100%',
   //      height: 'auto',
   //      editable: true,
   //      style: 'box',
   //      showCurrentTime: true,
   //      showNavigation: false
	  //   });
		});





			$scope.data = {
				periods: angular.fromJson('{"start":1367100000000,"end":1367704800000}'),
				user: angular.fromJson('[{"count":0,"end":1367676000,"recursive":true,"start":1367596800,"text":"com.ask-cs.State.KNRM.BeschikbaarNoord","type":"availability","wish":0},{"count":0,"end":1367445600,"recursive":false,"start":1367359200,"text":"com.ask-cs.State.Available","type":"","wish":0},{"count":0,"end":1367532000,"recursive":false,"start":1367488800,"text":"com.ask-cs.State.KNRM.SchipperVanDienst","type":"","wish":0},{"count":0,"end":1367570160,"recursive":false,"start":1367532000,"text":"com.ask-cs.State.KNRM.BeschikbaarZuid","type":"","wish":0},{"count":0,"end":1367661600,"recursive":false,"start":1367618400,"text":"com.ask-cs.State.Unavailable","type":"","wish":0}]')
			};





	  /**
	   * Fix styles
	   */
		$rootScope.fixStyles();

	  /**
	   * Pass the self
	   */
		$scope.self = this;


	  /**
	   * Pass time slots data
	   */
	  // $scope.data = data;

	  
	  /**
	   * Get groups and settings
	   */
	  // var settings 	= Storage.local.settings();


	  /**
	   * Pass current
	   */
	  $scope.current = {
      layouts: {
        user:     true,
        group:    true,
        members:  false
      },
      day:      Dater.current.today(),
      week:     Dater.current.week(),
      month:    Dater.current.month(),
      // group:    groups[0].uuid,
      division: 'all'
    };


	  /**
	   * Pass periods
	   */
	  $scope.periods = Dater.getPeriods();


	  /**
	   * Reset and init slot container which
	   * is used for adding or changing slots
	   */
	  $scope.slot = {};


	  /**
	   * Set defaults for timeline
	   */
	  $scope.timeline = {
	  	id: 'mainTimeline',
	  	main: true,
	  	user: {
	  		id: 	'SSTAM',
	  		role: 1
	  	},
	    current: $scope.current,
	    options: {
	      start:  new Date($scope.periods.weeks[$scope.current.week].first.day),
	      end:    new Date($scope.periods.weeks[$scope.current.week].last.day),
	      min:    new Date($scope.periods.weeks[$scope.current.week].first.day),
	      max:    new Date($scope.periods.weeks[$scope.current.week].last.day)
	    },
	    range: {
	      start:  $scope.periods.weeks[$scope.current.week].first.day,
	      end:    $scope.periods.weeks[$scope.current.week].last.day
	    },
	    scope: {
	      day:    false,
	      week:   true,
	      month:  false
	    },
	    config: {
	      bar:        $rootScope.config.timeline.config.bar,
	      wishes:     $rootScope.config.timeline.config.wishes,
	      legenda:    {},
	      legendarer: $rootScope.config.timeline.config.legendarer,
	      states:     $rootScope.config.timeline.config.states,
	      divisions:  $rootScope.config.timeline.config.divisions,
	      densities:  $rootScope.config.timeline.config.densities
	    }
	  };


	  /**
	   * Legenda defaults
	   */
	  angular.forEach($rootScope.config.timeline.config.states, function (state, index)
	  {
	    $scope.timeline.config.legenda[index] = true;
	  });


	  /**
	   * Timeline group legenda default configuration
	   */
	  $scope.timeline.config.legenda.groups = {
	    more: true,
	    even: true,
	    less: true
	  };


	  /**
	   * Prepeare timeline range for dateranger widget
	   */
	  $scope.daterange =  Dater.readable.date($scope.timeline.range.start) + ' / ' + 
	                      Dater.readable.date($scope.timeline.range.end);


	  /**
	   * States for dropdown
	   */
	  var states = {};

	  angular.forEach($scope.timeline.config.states, function (state, key) { states[key] = state.label });

	  $scope.states = states;


	  /**
	   * Groups for dropdown
	   */
	  $scope.divisions = $scope.timeline.config.divisions;


	  /**
	   * Reset views for default views
	   */
	  $scope.resetViews = function ()
	  {
	    $scope.views = {
	      slot: {
	        add:  false,
	        edit: false
	      },
	      group:  false,
	      wish:   false,
	      member: false
	    };
	  };

	  $scope.resetViews();


	  /**
	   * Slot form toggler
	   */
	  $scope.toggleSlotForm = function ()
	  {
	    if ($scope.views.slot.add)
	    {
	      $scope.resetInlineForms();
	    }
	    else
	    {
	      $scope.slot = {};

	      $scope.slot = {
	        start: {
	          date: new Date().toString($rootScope.config.formats.date),
	          time: new Date().toString($rootScope.config.formats.time),
	          datetime: new Date().toISOString()
	        },
	        end: {
	          date: new Date().toString($rootScope.config.formats.date),
	          time: new Date().addHours(1).toString($rootScope.config.formats.time),
	          datetime: new Date().toISOString()
	        },
	        state:      '',
	        recursive:  false,
	        id:         ''
	      };

	      $scope.resetViews();

	      $scope.views.slot.add = true;
	    };
	  };


	  /**
	   * Reset inline forms
	   */
	  $scope.resetInlineForms = function ()
	  {
	    $scope.slot = {};

	    $scope.original = {};

	    $scope.resetViews();
	  };

	}
]);