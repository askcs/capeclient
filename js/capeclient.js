/*jslint node: true */
/*global angular */
'use strict';


/**
 * Declare app level module which depends on filters, and services
 */
angular.module('CapeClient',[
  // modals
  'CapeClient.Modals.Cape',
  // controller
  'CapeClient.Controllers.Login',
  'CapeClient.Controllers.Dashboard',
  // services
  // directives
  '$strap.directives'
  // filters
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
      { url: 'libs/strophe/1.0.2/strophe.js' },
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
