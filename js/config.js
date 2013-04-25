/*jslint node: true */
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
    host: 		'http://openid.ask-cs.com:5280/http-bind'
  }
);