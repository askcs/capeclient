/*jslint node: true */
/*global angular */
'use strict';


angular.module('CapeClient.Controllers.Timeline', [])


.controller('timeline',
[
	'$rootScope', '$scope', '$q', '$location', 'Slots', 'Dater', 'Storage', 'Sloter', 'Profile', 'Cape',
	function ($rootScope, $scope, $q, $location, Slots, Dater, Storage, Sloter, Profile, Cape)
	{
		var range, diff;

		/**
		 * Watch for changes in timeline range
		 */
		$scope.$watch(function ()
		{

				range = $scope.self.timeline.getVisibleChartRange();
				diff  = Dater.calculate.diff(range);

				/**
				 * Scope is a day
				 * 
				 * TODO
				 * try later on!
				 * new Date(range.start).toString('d') == new Date(range.end).toString('d')
				 */
				if (diff <= 86400000)
				{
					$scope.timeline.scope = {
						day:    true,
						week:   false,
						month:  false
					};
				}
				/**
				 * Scope is less than a week
				 */
				else if (diff < 604800000)
				{
					$scope.timeline.scope = {
						day:    false,
						week:   true,
						month:  false
					};
				}
				/**
				 * Scope is more than a week
				 */
				else if (diff > 604800000)
				{
					$scope.timeline.scope = {
						day:    false,
						week:   false,
						month:  true
					};
				}

				$scope.timeline.range = {
					start:  new Date(range.start).toString(),
					end:    new Date(range.end).toString()
				};

				$scope.daterange =  Dater.readable.date($scope.timeline.range.start) +
														' / ' +
														Dater.readable.date($scope.timeline.range.end);
		});


	  /**
	   * Timeline (The big boy)
	   */
	  $scope.timeliner = {

	    /**
	     * Init timeline
	     */
	    init: function ()
	    {
	      $scope.self.timeline = new links.Timeline(document.getElementById($scope.timeline.id));

	      links.events.addListener($scope.self.timeline, 'rangechanged',  this.getRange);
	      links.events.addListener($scope.self.timeline, 'add',           this.onAdd);
	      links.events.addListener($scope.self.timeline, 'delete',        this.onRemove);
	      links.events.addListener($scope.self.timeline, 'change',        this.onChange);
	      links.events.addListener($scope.self.timeline, 'select',        this.onSelect);

	      this.render($scope.timeline.options);      
	    },

	    getRange: function () { $scope.timelineGetRange() },

	    onAdd: 		function () { $scope.timelineOnAdd() },

	    onRemove: function () { $scope.timelineOnRemove() },

	    onChange: function () { $scope.timelineOnChange() },

	    onSelect: function () { $scope.timelineOnSelect() },

	    /**
	     * (Re-)Render timeline
	     */
	    render: function (options)
	    {
	      $scope.timeline = {
	      	id: 			$scope.timeline.id,
	      	main: 		$scope.timeline.main,
	      	user: 		$scope.timeline.user,
	        current:  $scope.timeline.current,
	        scope: 		$scope.timeline.scope,
	        config:   $scope.timeline.config,
	        options: {
	          start:  new Date(options.start),
	          end:    new Date(options.end),
	          min:    new Date(options.start),
	          max:    new Date(options.end)
	        }
	      };

	      angular.extend($scope.timeline.options, $rootScope.config.timeline.options);

	      console.warn('inside in processer ->', angular.fromJson(Storage.get('data')));

	      $scope.self.timeline.draw(
	        Sloter.process(
	        	// angular.fromJson(Storage.get('data')),
	          $scope.data,
	          $scope.timeline.config,
	          $scope.divisions,
	          $scope.timeline.user.role
	        ), 
	        $scope.timeline.options
	      );

	      $scope.self.timeline.setVisibleChartRange($scope.timeline.options.start, $scope.timeline.options.end);
	    },

	    /**
	     * Grab new timeline data from backend and render timeline again
	     */
	    load: function (stamps)
	    {
	      var _this = this;

	      $rootScope.statusBar.display($rootScope.ui.planboard.refreshTimeline);

				Cape.getSlots(
					stamps.start, 
					stamps.end, 
					function (slots)
				  {

						var timedata = [];

			    	angular.forEach(slots.result, function (slot, index)
			    	{
			    		console.log('slot ->', slot);
			    		timedata.push({
			    			start: 	slot.start,
			    			end: 		slot.end,
			    			text: 	(angular.fromJson(slot.value)).event,
			    			type: 	'availability',
			    			recursive: false
			    		});

			    	});

			    	console.log('timedata ->', timedata);

			      $scope.data = {
			      	periods: {
			      		start: 	stamps.start,
			      		end: 		stamps.end
			      	},
			      	user: timedata
			      };



    				Storage.add('data', angular.toJson($scope.data));


				  	// $scope.data = {
				   //  	periods: {
				   //  		start: 	stamps.start,
				   //  		end: 		stamps.end
				   //  	},
				   //  	user: slots.result
				   //  };
				  }
				);

		    _this.render(stamps);

		    $rootScope.statusBar.off();
	    },

	    /**
	     * Refresh timeline as it is
	     */
	    refresh: function ()
	    {
	      $scope.slot = {};

	      if ($scope.timeline.main)
	      {
		      $scope.resetViews();

		      $scope.views.slot.add = true;
	      }
	      else
	      {
		      $scope.forms = {
		        add:  true,
		        edit: false
		      };
		    };

	      this.load({
	        start:  $scope.data.periods.start,
	        end:    $scope.data.periods.end
	      });
	    },

	    /**
	     * Redraw timeline
	     */
	    redraw: function ()
	    {
	      $scope.self.timeline.redraw();
	    },

	    isAdded: function ()
	    {
	    	return $('.timeline-event-content')
	                .contents()
	                .filter(function ()
	                { 
	                  return this.nodeValue == 'New' 
	                }).length;
	    },

	    /**
	     * Cancel add
	     */
	    cancelAdd: function ()
	    {
	      $scope.self.timeline.cancelAdd();
	    }
	  };
	 

	  /**
	   * Init timeline
	   */
	  if ($scope.timeline) $scope.timeliner.init();


	  /**
	   * Timeliner listener
	   */
	  $rootScope.$on('timeliner', function () 
	  {
	    $scope.timeliner.load({
	      start:  new Date(arguments[1].start).getTime(),
	      end:    new Date(arguments[1].end).getTime()
	    });
	  });


	  /**
	   * Handle new requests for timeline
	   */
	  $scope.requestTimeline = function (section)
	  {
	    switch (section)
	    {
	      case 'group':
	        $scope.timeline.current.layouts.group = !$scope.timeline.current.layouts.group;

	        if ($scope.timeline.current.layouts.members && !$scope.timeline.current.layouts.group)
	          $scope.timeline.current.layouts.members = false;
	      break;

	      case 'members':
	        $scope.timeline.current.layouts.members = !$scope.timeline.current.layouts.members;

	        if ($scope.timeline.current.layouts.members && !$scope.timeline.current.layouts.group)
	          $scope.timeline.current.layouts.group = true;
	      break;
	    };

	    $scope.timeliner.load({
	      start:  $scope.data.periods.start,
	      end:    $scope.data.periods.end
	    });
	  };


	  /**
	   * Timeline get ranges
	   */
	  $scope.timelineGetRange = function ()
	  {
	    var range = $scope.self.timeline.getVisibleChartRange();

	    $scope.$apply(function ()
	    {
	      $scope.timeline.range = {
	        start:  new Date(range.from).toString(),
	        end:    new Date(range.till).toString()
	      };

	      if ($scope.timeline.main)
	      {
		      $scope.daterange = {
		        start:  Dater.readable.date(new Date(range.start).getTime()),
		        end:    Dater.readable.date(new Date(range.end).getTime())
		      };
	      };

	    });
	  };


	  /**
	   * Get information of the selected slot
	   */
	  $scope.selectedSlot = function ()
	  {
	    var selection;

	    /**
	     * TODO
	     * 
	     * Not working!!
	     */
	    $scope.timeliner.cancelAdd();

	    if (selection = $scope.self.timeline.getSelection()[0])
	    {
	      var values  = $scope.self.timeline.getItem(selection.row),
	          content = angular.fromJson(values.content.match(/<span class="secret">(.*)<\/span>/)[1]) || null;

	      $scope.original = {
	        start:        values.start,
	        end:          values.end,
	        content: {
	          recursive:  content.recursive,
	          state:      content.state,
	          id:         content.id
	        }
	      };

	      if ($scope.timeline.main)
	      {
		      $scope.resetViews();
		    }
		    else
		    {
		      /**
		       * TODO
		       * Convert to resetview?
		       */
		      $scope.forms = {
		        add:  false,
		        edit: true
		      };
		    };

	      if (content.type)
	      {
	      	if ($scope.timeline.main)
	      	{
			      switch (content.type)
			      {
			        case 'slot':
			          $scope.views.slot.edit = true;
			        break;

			        case 'group':
			          $scope.views.group = true;
			        break;

			        case 'wish':
			          $scope.views.wish = true;
			        break;

			        case 'member':
			          $scope.views.member = true;
			        break;
			      };
	      	};

		      $scope.slot = {
		        start: {
		          date: new Date(values.start).toString($rootScope.config.formats.date),
		          time: new Date(values.start).toString($rootScope.config.formats.time),
		          datetime: new Date(values.start).toISOString()
		        },
		        end: {
		          date: new Date(values.end).toString($rootScope.config.formats.date),
		          time: new Date(values.end).toString($rootScope.config.formats.time),
		          datetime: new Date(values.end).toISOString()
		        },
		        state:      content.state,
		        recursive:  content.recursive,
		        id:         content.id
		      };

		      /**
		       * TODO
		       * Check if this can be combined with switch later on!
		       * Set extra data based slot type for inline form
		       */
		      if ($scope.timeline.main)
		      {
			      switch (content.type)
			      {
			        case 'group':
			          $scope.slot.diff  = content.diff;
			          $scope.slot.group = content.group;
			        break;

			        case 'wish':
			          $scope.slot.wish    = content.wish;
			          $scope.slot.group   = content.group;
			          $scope.slot.groupId = content.groupId;
			        break;

			        case 'member':
			          $scope.slot.member = content.mid;
			        break;
			      };
		      };
	      };

	      return values;
	    };
	  };


	  /**
	   * Timeline on select
	   */
	  $scope.timelineOnSelect = function ()
	  {
	    $scope.$apply(function ()
	    {
	      $scope.selectedOriginal = $scope.selectedSlot();
	    });
	  };


	  /**
	   * Prevent re-rendering issues with timeline
	   */
	  $scope.destroy = {
	    timeline: function ()
	    {
	      // Not working !! :(
	      // Sloter.pies($scope.data);
	    },
	    statistics: function ()
	    {
	      setTimeout(function ()
	      {
	        $scope.timeliner.redraw();
	      }, 10);
	    }
	  };


	  /**
	   * Group aggs barCharts toggler
	   */
	  $scope.barCharts = function ()
	  {
	    $scope.timeline.config.bar = !$scope.timeline.config.bar;

	    $scope.timeliner.render({
	      start:  $scope.timeline.range.start,
	      end:    $scope.timeline.range.end
	    });
	  };
	  

	  /**
	   * Group wishes toggler
	   */
	  $scope.groupWishes = function ()
	  {
	    $scope.timeline.config.wishes = !$scope.timeline.config.wishes;

	    $scope.timeliner.render({
	      start:  $scope.timeline.range.start,
	      end:    $scope.timeline.range.end
	    });
	  };
	  

	  /**
	   * Timeline legenda toggler
	   */
	  $scope.showLegenda = function ()
	  {
		  $scope.timeline.config.legendarer = !$scope.timeline.config.legendarer;
		};


	  /**
	   * Alter legenda settings
	   */
	  $scope.alterLegenda = function (legenda)
	  {
	    $scope.timeline.config.legenda = legenda;

	    $scope.timeliner.render({
	      start:  $scope.timeline.range.start,
	      end:    $scope.timeline.range.end
	    });
	  };


	  /**
	   * Add slot trigger start view
	   */
	  $scope.timelineOnAdd = function (form, slot)
	  {
	  	Cape.setSlot(	Dater.convert.absolute(slot.start.date, slot.start.time, false), 
	  								Dater.convert.absolute(slot.end.date, slot.end.time, false), 
	  								slot.state, 
	  								slot.recursive,
	  								function (results)
	  							{
	  								console.log('slot successfully added ->', results);
	  							});

	  	// /**
	  	//  * Make view for new slot
	  	//  */
	  	// if (!form)
	  	// {
		  //   var values = $scope.self.timeline.getItem($scope.self.timeline.getSelection()[0].row);
		      
		  //   if ($scope.timeliner.isAdded() > 1) $scope.self.timeline.cancelAdd();

		  //   $scope.$apply(function ()
		  //   {
		  //   	if ($scope.timeline.main)
		  //   	{
			 //      $scope.resetViews();

			 //      $scope.views.slot.add = true;
		  //   	}
		  //   	else
		  //   	{
			 //      $scope.forms = {
			 //        add:  true,
			 //        edit: false
			 //      };
			 //    };

		  //     $scope.slot = {
		  //       start: {
		  //         date: new Date(values.start).toString($rootScope.config.formats.date),
		  //         time: new Date(values.start).toString($rootScope.config.formats.time),
		  //         datetime: new Date(values.start).toISOString()
		  //       },
		  //       end: {
		  //         date: new Date(values.end).toString($rootScope.config.formats.date),
		  //         time: new Date(values.end).toString($rootScope.config.formats.time),
		  //         datetime: new Date(values.end).toISOString()
		  //       },
		  //       recursive: (values.group.match(/recursive/)) ? true : false,
		  //       /**
		  //        * INFO
		  //        * First state is hard-coded
		  //        * Maybe use the first one from array later on?
		  //        */
		  //       state: 'com.ask-cs.State.Available'
		  //     };
		  //   });
	  	// }
	  	// /**
	  	//  * Add new slot
	  	//  */
	  	// else
	  	// {
		  //   var now     = Date.now().getTime(),
		  //       values  = {
		  //                   start:      ($rootScope.browser.mobile) ? 
		  //                                 new Date(slot.start.datetime).getTime() / 1000 :
		  //                                 Dater.convert.absolute(slot.start.date, slot.start.time, true),
		  //                   end:        ($rootScope.browser.mobile) ? 
		  //                                 new Date(slot.end.datetime).getTime() / 1000 : 
		  //                                 Dater.convert.absolute(slot.end.date, slot.end.time, true),
		  //                   recursive:  (slot.recursive) ? true : false,
		  //                   text:       slot.state
		  //                 };

		  //   if (values.end * 1000 <= now && values.recursive == false)
		  //   {
		  //     $rootScope.notifier.error('You can not input timeslots in past.');

		  //     // timeliner.cancelAdd();
		  //     $scope.timeliner.refresh();
		  //   }
		  //   else
		  //   {
		  //     $rootScope.statusBar.display($rootScope.ui.planboard.addTimeSlot);

		  //     Slots.add(values, $scope.timeline.user.id)
		  //     .then(
		  //       function (result)
		  //       {
		  //         if (result.error)
		  //         {
		  //           $rootScope.notifier.error('Error with adding a new timeslot.');
		  //           console.warn('error ->', result);
		  //         }
		  //         else
		  //         {
		  //           $rootScope.notifier.success($rootScope.ui.planboard.slotAdded);
		  //         };

		  //         $scope.timeliner.refresh();
		  //       }
		  //     );
		  //   };
	  	// }
	  	
	  };


	  /**
	   * Timeline on change
	   */
	  $scope.timelineOnChange = function (direct, original, slot, options)
	  {
	    if (!direct)
	    {
	      var values  = $scope.self.timeline.getItem($scope.self.timeline.getSelection()[0].row),
	          options = {
	            start:    values.start,
	            end:      values.end,
	            content:  angular.fromJson(values.content.match(/<span class="secret">(.*)<\/span>/)[1])
	          };
	    }
	    else
	    {
	    	var options = {
		      start:  ($rootScope.browser.mobile) ?
		                new Date(slot.start.datetime).getTime() : 
		                Dater.convert.absolute(slot.start.date, slot.start.time, false),
		      end:    ($rootScope.browser.mobile) ? 
		                new Date(slot.end.datetime).getTime() :
		                Dater.convert.absolute(slot.end.date, slot.end.time, false),
		      content: angular.toJson({
		        recursive:  slot.recursive, 
		        state:      slot.state 
		      })
		    };
	    }

	    var now = Date.now().getTime();

	    if (options.end <= now && options.content.recursive == false)
	    {
	      $rootScope.notifier.error('You can not change timeslots in past.');

	      $scope.timeliner.refresh();
	    }
	    else
	    {
	      $rootScope.statusBar.display($rootScope.ui.planboard.changingSlot);

	      Slots.change($scope.original, options, $scope.timeline.user.id)
	      .then(
	        function (result)
	        {
	          if (result.error)
	          {
	            $rootScope.notifier.error('Error with changing timeslot.');
	            console.warn('error ->', result);
	          }
	          else
	          {
	            $rootScope.notifier.success($rootScope.ui.planboard.slotChanged);
	          };

	          $scope.timeliner.refresh();
	        }
	      );
	    };
	  };


	  /**
	   * Timeline on remove
	   */
	  $scope.timelineOnRemove = function ()
	  {
	    if ($scope.timeliner.isAdded() > 0)
	    {
	      $scope.self.timeline.cancelAdd();

	      $scope.$apply(function ()
	      {
	        $scope.resetInlineForms();
	      });
	    }
	    else
	    {
	      var now = Date.now().getTime();

	      if ($scope.original.end.getTime() <= now && $scope.original.recursive == false)
	      {
	        $rootScope.notifier.error('You can not delete timeslots in past.');

	        $scope.timeliner.refresh();
	      }
	      else
	      {
	        $rootScope.statusBar.display($rootScope.ui.planboard.deletingTimeslot);

	        Slots.remove($scope.original, $scope.timeline.user.id)
	        .then(
	          function (result)
	          {
	            if (result.error)
	            {
	              $rootScope.notifier.error('Error with removing timeslot.');
	              console.warn('error ->', result);
	            }
	            else
	            {
	              $rootScope.notifier.success($rootScope.ui.planboard.timeslotDeleted);
	            };

	            $scope.timeliner.refresh();
	          }
	        );
	      };
	    };
	  };


	  /**
	   * Set wish
	   */
	  $scope.wisher = function (slot)
	  {
	    $rootScope.statusBar.display($rootScope.ui.planboard.changingWish);

	    Slots.setWish(
	    {
	      id:     slot.groupId,
	      start:  ($rootScope.browser.mobile) ? 
	                new Date(slot.start.datetime).getTime() / 1000 : 
	                Dater.convert.absolute(slot.start.date, slot.start.time, true),
	      end:    ($rootScope.browser.mobile) ? 
	                new Date(slot.end.datetime).getTime() / 1000 : 
	                Dater.convert.absolute(slot.end.date, slot.end.time, true),
	      recursive:  false,
	      // recursive:  slot.recursive,
	      wish:       slot.wish
	    })
	    .then(
	      function (result)
	      {
	        if (result.error)
	        {
	          $rootScope.notifier.error('Error with changing wish value.');
	          console.warn('error ->', result);
	        }
	        else
	        {
	          $rootScope.notifier.success($rootScope.ui.planboard.wishChanged);
	        };

	        $scope.timeliner.refresh();
	      }
	    );
	  };


    setTimeout( function() 
    {
      $scope.self.timeline.redraw();
    }, 100);

	}
]);