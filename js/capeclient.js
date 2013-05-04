/*jslint node: true */
/*global angular */
'use strict';


/**
 * Declare app level module which depends on filters, and services
 */
angular.module('CapeClient',[
  'ngResource',
  // modals
  'CapeClient.Modals.Cape',
  'CapeClient.Modals.User',
  'CapeClient.Modals.Dashboard',
  'CapeClient.Modals.Slots',
  'CapeClient.Modals.Messages',
  'CapeClient.Modals.Groups',
  'CapeClient.Modals.Profile',
  'CapeClient.Modals.Settings',
  // controller
  'CapeClient.Controllers.Login',
  'CapeClient.Controllers.Planboard',
  'CapeClient.Controllers.Timeline',
  'CapeClient.Controllers.Timeline.Navigation',
  // services
  'CapeClient.Services.Timer',
  'CapeClient.Services.Session',
  'CapeClient.Services.Dater',
  'CapeClient.Services.EventBus',
  'CapeClient.Services.Interceptor',
  'CapeClient.Services.MD5',
  'CapeClient.Services.Storage',
  'CapeClient.Services.Strings',
  'CapeClient.Services.Announcer',
  'CapeClient.Services.Sloter',
  'CapeClient.Services.Stats',
  // directives
  '$strap.directives',
  // filters
  'CapeClient.Filters'
]);


/**
 * Fetch libraries with AMD (if they are not present) and save in localStorage
 * If a library is presnet it wont be fetched from server
 */
if ('localStorage' in window && window['localStorage'] !== null)
{
  basket
    .require(
      { url: 'libs/chosen/chosen.jquery.min.js' },
      { url: 'libs/chaps/timeline/2.4.0/timeline_modified.min.js' },
      { url: 'libs/bootstrap-datepicker/bootstrap-datepicker.min.js' },
      { url: 'libs/bootstrap-timepicker/bootstrap-timepicker.min.js' },
      { url: 'libs/daterangepicker/1.1.0/daterangepicker.min.js' },
      { url: 'libs/sugar/1.3.7/sugar.min.js' },
      { url: 'libs/raphael/2.1.0/raphael-min.js' }
    )
    .then(function ()
      {
        basket
          .require(
            { url: 'libs/g-raphael/0.5.1/g.raphael-min.js' },
            { url: 'libs/g-raphael/0.5.1/g.pie-min.js' }
          )
          .then(function ()
          {
            // console.warn('basket parsed scripts..');
        });
      }
    );
}
