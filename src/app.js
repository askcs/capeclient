/*jslint node: true */
/*global angular */
'use strict';


/**
 * Declare app level module which depends on filters, and services
 */
angular.module('CapeClient',[
  // modals
  // controller
  'CapeClient.Controllers.Login',
  'CapeClient.Controllers.Dashboard',
  // services
  // directives
  '$strap.directives'
  // filters
]);;/*jslint node: true */
/*global angular */
/*global profile */
'use strict';


/**
 * App configuration
 */
angular.module('CapeClient')
.value(
  '$config',
  {
    title:    'CapeClient',
    version:  '1.0.0',
  }
);;/*jslint node: true */
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
]);;/*jslint node: true */
/*global angular */
/*global $ */
'use strict';


/**
 * Initial run functions
 */
angular.module('CapeClient')
.run(
[
  '$rootScope',
  function ($rootScope)
  {

  }
]);


/**
 * Sticky timeline header
 */
// $('#mainTimeline .timeline-frame div:first div:first').css({'top': '0px'});/*jslint node: true */
/*global angular */
'use strict';


angular.module('CapeClient.Controllers.Login', [])


/**
 * Login controller
 */
.controller('login',
[
	'$rootScope', '$scope',
	function ($rootScope, $scope)
	{
	}
]);;/*jslint node: true */
/*global angular */
'use strict';


angular.module('CapeClient.Controllers.Dashboard', [])


/**
 * Dashboard controller
 */
.controller('dashboard',
[
	'$rootScope', '$scope',
	function ($rootScope, $scope)
	{
	}
]);;/**
 * AngularStrap - Twitter Bootstrap directives for AngularJS
 * @version v0.7.0 - 2013-03-11
 * @link http://mgcrea.github.com/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module("$strap.config",[]).value("$strap.config",{}),angular.module("$strap.filters",["$strap.config"]),angular.module("$strap.directives",["$strap.config"]),angular.module("$strap",["$strap.filters","$strap.directives","$strap.config"]),angular.module("$strap.directives").directive("bsAlert",["$parse","$timeout","$compile",function(t,e,n){"use strict";return{restrict:"A",link:function(e,i,a){var o=t(a.bsAlert),r=(o.assign,o(e));a.bsAlert?e.$watch(a.bsAlert,function(t,o){r=t,i.html((t.title?"<strong>"+t.title+"</strong>&nbsp;":"")+t.content||""),t.closed&&i.hide(),n(i.contents())(e),(t.type||o.type)&&(o.type&&i.removeClass("alert-"+o.type),t.type&&i.addClass("alert-"+t.type)),(angular.isUndefined(a.closeButton)||"0"!==a.closeButton&&"false"!==a.closeButton)&&i.prepend('<button type="button" class="close" data-dismiss="alert">&times;</button>')},!0):(angular.isUndefined(a.closeButton)||"0"!==a.closeButton&&"false"!==a.closeButton)&&i.prepend('<button type="button" class="close" data-dismiss="alert">&times;</button>'),i.addClass("alert").alert(),i.hasClass("fade")&&(i.removeClass("in"),setTimeout(function(){i.addClass("in")}));var s=a.ngRepeat&&a.ngRepeat.split(" in ").pop();i.on("close",function(t){var n;s?(t.preventDefault(),i.removeClass("in"),n=function(){i.trigger("closed"),e.$parent&&e.$parent.$apply(function(){for(var t=s.split("."),n=e.$parent,i=0;t.length>i;++i)n&&(n=n[t[i]]);n&&n.splice(e.$index,1)})},$.support.transition&&i.hasClass("fade")?i.on($.support.transition.end,n):n()):r&&(t.preventDefault(),i.removeClass("in"),n=function(){i.trigger("closed"),e.$apply(function(){r.closed=!0})},$.support.transition&&i.hasClass("fade")?i.on($.support.transition.end,n):n())})}}}]),angular.module("$strap.directives").directive("bsButton",["$parse","$timeout",function(t){"use strict";return{restrict:"A",require:"?ngModel",link:function(e,n,i,a){if(a){n.parent('[data-toggle="buttons-checkbox"], [data-toggle="buttons-radio"]').length||n.attr("data-toggle","button");var o=!!e.$eval(i.ngModel);o&&n.addClass("active"),e.$watch(i.ngModel,function(t,e){var i=!!t,a=!!e;i!==a?$.fn.button.Constructor.prototype.toggle.call(r):i&&!o&&n.addClass("active")})}n.hasClass("btn")||n.on("click.button.data-api",function(){n.button("toggle")}),n.button();var r=n.data("button");r.toggle=function(){if(!a)return $.fn.button.Constructor.prototype.toggle.call(this);var i=n.parent('[data-toggle="buttons-radio"]');i.length?(n.siblings("[ng-model]").each(function(n,i){t($(i).attr("ng-model")).assign(e,!1)}),e.$digest(),a.$modelValue||(a.$setViewValue(!a.$modelValue),e.$digest())):e.$apply(function(){a.$setViewValue(!a.$modelValue)})}}}}]).directive("bsButtonsCheckbox",["$parse",function(){"use strict";return{restrict:"A",require:"?ngModel",compile:function(t){t.attr("data-toggle","buttons-checkbox").find("a, button").each(function(t,e){$(e).attr("bs-button","")})}}}]).directive("bsButtonsRadio",["$parse",function(){"use strict";return{restrict:"A",require:"?ngModel",compile:function(t,e){return t.attr("data-toggle","buttons-radio"),e.ngModel||t.find("a, button").each(function(t,e){$(e).attr("bs-button","")}),function(t,e,n,i){i&&(e.find("[value]").button().filter('[value="'+t.$eval(n.ngModel)+'"]').addClass("active"),e.on("click.button.data-api",function(e){t.$apply(function(){i.$setViewValue($(e.target).closest("button").attr("value"))})}),t.$watch(n.ngModel,function(i,a){if(i!==a){var o=e.find('[value="'+t.$eval(n.ngModel)+'"]');o.length&&$.fn.button.Constructor.prototype.toggle.call(o.data("button"))}}))}}}}]),angular.module("$strap.directives").directive("bsButtonSelect",["$parse","$timeout",function(t){"use strict";return{restrict:"A",require:"?ngModel",link:function(e,n,i,a){var o=t(i.bsButtonSelect);o.assign,a&&(n.text(e.$eval(i.ngModel)),e.$watch(i.ngModel,function(t){n.text(t)}));var r,s,l,u;n.bind("click",function(){r=o(e),s=a?e.$eval(i.ngModel):n.text(),l=r.indexOf(s),u=l>r.length-2?r[0]:r[l+1],console.warn(r,u),e.$apply(function(){n.text(u),a&&a.$setViewValue(u)})})}}}]),angular.module("$strap.directives").directive("bsDatepicker",["$timeout",function(){"use strict";var t="ontouchstart"in window&&!window.navigator.userAgent.match(/PhantomJS/i),e={"/":"[\\/]","-":"[-]",".":"[.]",dd:"(?:(?:[0-2]?[0-9]{1})|(?:[3][01]{1}))",d:"(?:(?:[0-2]?[0-9]{1})|(?:[3][01]{1}))",mm:"(?:[0]?[1-9]|[1][012])",m:"(?:[0]?[1-9]|[1][012])",yyyy:"(?:(?:[1]{1}[0-9]{1}[0-9]{1}[0-9]{1})|(?:[2]{1}[0-9]{3}))(?![[0-9]])",yy:"(?:(?:[0-9]{1}[0-9]{1}))(?![[0-9]])"};return{restrict:"A",require:"?ngModel",link:function(n,i,a,o){var r=function(t,n){n||(n={});var i=t,a=e;return angular.forEach(a,function(t,e){i=i.split(e).join(t)}),RegExp("^"+i+"$",["i"])},s=t?"yyyy/mm/dd":r(a.dateFormat||"mm/dd/yyyy");o&&o.$parsers.unshift(function(t){return!t||s.test(t)?(o.$setValidity("date",!0),t):(o.$setValidity("date",!1),void 0)});var l=i.next('[data-toggle="datepicker"]');if(l.length&&l.on("click",function(){t?i.trigger("focus"):i.datepicker("show")}),t&&"text"===i.prop("type"))i.prop("type","date"),i.on("change",function(){n.$apply(function(){o.$setViewValue(i.val())})});else{o&&i.on("changeDate",function(){n.$apply(function(){o.$setViewValue(i.val())})});var u=i.closest(".popover");u&&u.on("hide",function(){var t=i.data("datepicker");t&&(t.picker.remove(),i.data("datepicker",null))}),i.attr("data-toggle","datepicker"),i.datepicker({autoclose:!0,forceParse:a.forceParse||!1,language:a.language||"en"})}}}}]),angular.module("$strap.directives").directive("bsDropdown",["$parse","$compile",function(t,e){"use strict";var n=Array.prototype.slice,i='<ul class="dropdown-menu" role="menu" aria-labelledby="drop1"><li ng-repeat="item in items" ng-class="{divider: !!item.divider, \'dropdown-submenu\': !!item.submenu && item.submenu.length}"><a ng-hide="!!item.divider" tabindex="-1" ng-href="{{item.href}}" ng-click="{{item.click}}" target="{{item.target}}" ng-bind-html-unsafe="item.text"></a></li></ul>',a=function(t,n,a){for(var r,s,l,u=0,c=t.length;c>u;u++)(r=t[u].submenu)&&(l=a.$new(),l.items=r,s=e(i)(l),s=s.appendTo(n.children("li:nth-child("+(u+1)+")")),o(r,s,l))},o=function(){var t=n.call(arguments);setTimeout(function(){a.apply(null,t)})};return{restrict:"EA",scope:!0,link:function(n,a,r){var s=t(r.bsDropdown);n.items=s(n);var l=e(i)(n);o(n.items,l,n),l.insertAfter(a),a.addClass("dropdown-toggle").attr("data-toggle","dropdown")}}}]),angular.module("$strap.directives").directive("bsModal",["$parse","$compile","$http","$timeout","$q","$templateCache",function(t,e,n,i,a,o){"use strict";return{restrict:"A",scope:!0,link:function(r,s,l){var u=t(l.bsModal),c=(u.assign,u(r));a.when(o.get(c)||n.get(c,{cache:!0})).then(function(t){angular.isObject(t)&&(t=t.data);var n=u(r).replace(".html","").replace(/[\/|\.|:]/g,"-")+"-"+r.$id,a=$('<div class="modal hide" tabindex="-1"></div>').attr("id",n).attr("data-backdrop",l.backdrop||!0).attr("data-keyboard",l.keyboard||!0).addClass(l.modalClass?"fade "+l.modalClass:"fade").html(t);$("body").append(a),s.attr("href","#"+n).attr("data-toggle","modal"),i(function(){e(a)(r)}),r._modal=function(t){a.modal(t)},r.hide=function(){a.modal("hide")},r.show=function(){a.modal("show")},r.dismiss=r.hide})}}}]),angular.module("$strap.directives").directive("bsNavbar",["$location",function(t){"use strict";return{restrict:"A",link:function(e,n){e.$watch(function(){return t.path()},function(t){n.find("li[data-match-route]").each(function(e,n){var i=angular.element(n),a=i.attr("data-match-route"),o=RegExp("^"+a+"$",["i"]);o.test(t)?i.addClass("active"):i.removeClass("active")})})}}}]),angular.module("$strap.directives").directive("bsPopover",["$parse","$compile","$http","$timeout","$q","$templateCache",function(t,e,n,i,a,o){"use strict";return $("body").on("keyup",function(t){27===t.keyCode&&$(".popover.in").each(function(){$(this).popover("hide")})}),{restrict:"A",scope:!0,link:function(i,r,s){var l=t(s.bsPopover),u=(l.assign,l(i)),c={};angular.isObject(u)&&(c=u),a.when(c.content||o.get(u)||n.get(u,{cache:!0})).then(function(t){angular.isObject(t)&&(t=t.data),s.unique&&r.on("show",function(){$(".popover.in").each(function(){var t=$(this),e=t.data("popover");e&&!e.$element.is(r)&&t.popover("hide")})}),s.hide&&i.$watch(s.hide,function(t,e){t?n.hide():t!==e&&n.show()}),r.popover(angular.extend({},c,{content:t,html:!0}));var n=r.data("popover");n.hasContent=function(){return this.getTitle()||t},n.getPosition=function(){var t=$.fn.popover.Constructor.prototype.getPosition.apply(this,arguments);return e(this.$tip)(i),i.$digest(),this.$tip.data("popover",this),t},i._popover=function(t){r.popover(t)},i.hide=function(){r.popover("hide")},i.show=function(){r.popover("show")},i.dismiss=i.hide})}}}]),angular.module("$strap.directives").directive("bsTabs",["$parse","$compile",function(t,e){"use strict";return{restrict:"A",link:function(t,n){var i=['<ul class="nav nav-tabs">',"</ul>"],a=['<div class="tab-content">',"</div>"];n.find("[data-tab]").each(function(e){var n=angular.element(this),o="tab-"+t.$id+"-"+e,r=n.hasClass("active"),s=n.hasClass("fade"),l=t.$eval(n.data("tab"));i.splice(e+1,0,"<li"+(r?' class="active"':"")+'><a href="#'+o+'" data-toggle="tab">'+l+"</a></li>"),a.splice(e+1,0,'<div class="tab-pane '+n.attr("class")+(s&&r?" in":"")+'" id="'+o+'">'+this.innerHTML+"</div>")}),n.html(i.join("")+a.join("")),e(n.children("div.tab-content"))(t)}}}]),angular.module("$strap.directives").directive("bsTimepicker",["$timeout",function(){"use strict";var t="((?:(?:[0-1][0-9])|(?:[2][0-3])|(?:[0-9])):(?:[0-5][0-9])(?::[0-5][0-9])?(?:\\s?(?:am|AM|pm|PM))?)";return{restrict:"A",require:"?ngModel",link:function(e,n,i,a){a&&n.on("change",function(){e.$apply(function(){a.$setViewValue(n.val())})});var o=RegExp("^"+t+"$",["i"]);a.$parsers.unshift(function(t){return!t||o.test(t)?(a.$setValidity("time",!0),t):(a.$setValidity("time",!1),void 0)});var r=n.closest(".popover");r&&r.on("hide",function(){var t=n.data("timepicker");t&&(t.$widget.remove(),n.data("timepicker",null))}),n.attr("data-toggle","timepicker"),n.timepicker()}}}]),angular.module("$strap.directives").directive("bsTooltip",["$parse","$compile",function(t){"use strict";return{restrict:"A",scope:!0,link:function(e,n,i){var a=t(i.bsTooltip),o=(a.assign,a(e));e.$watch(i.bsTooltip,function(t,e){t!==e&&(o=t)}),i.unique&&n.on("show",function(){$(".tooltip.in").each(function(){var t=$(this),e=t.data("tooltip");e&&!e.$element.is(n)&&t.tooltip("hide")})}),n.tooltip({title:function(){return angular.isFunction(o)?o.apply(null,arguments):o},html:!0});var r=n.data("tooltip");r.show=function(){var t=$.Event("show");if(this.$element.trigger(t),!t.isDefaultPrevented()){var e=$.fn.tooltip.Constructor.prototype.show.apply(this,arguments);return this.tip().data("tooltip",this),e}},r.hide=function(){var t=$.Event("hide");return this.$element.trigger(t),t.isDefaultPrevented()?void 0:$.fn.tooltip.Constructor.prototype.hide.apply(this,arguments)},e._tooltip=function(t){n.tooltip(t)},e.hide=function(){n.tooltip("hide")},e.show=function(){n.tooltip("show")},e.dismiss=e.hide}}}]),angular.module("$strap.directives").directive("bsTypeahead",["$parse",function(t){"use strict";return{restrict:"A",require:"?ngModel",link:function(e,n,i,a){var o=t(i.bsTypeahead),r=(o.assign,o(e));e.$watch(i.bsTypeahead,function(t,e){t!==e&&(r=t)}),n.attr("data-provide","typeahead"),n.typeahead({source:function(){return angular.isFunction(r)?r.apply(null,arguments):r},minLength:i.minLength||1,items:i.items,updater:function(t){return a&&e.$apply(function(){a.$setViewValue(t)}),t}});var s=n.data("typeahead");s.lookup=function(){var t;return this.query=this.$element.val()||"",this.query.length<this.options.minLength?this.shown?this.hide():this:(t=$.isFunction(this.source)?this.source(this.query,$.proxy(this.process,this)):this.source,t?this.process(t):this)},"0"===i.minLength&&setTimeout(function(){n.on("focus",function(){0===n.val().length&&setTimeout(n.typeahead.bind(n,"lookup"),200)})})}}}]);