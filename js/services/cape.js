/*jslint node: true */
/*global angular */
/*global Strophe */
/*global $iq */
/*global $msg */
/*global $pres */
'use strict';


angular.module('CapeClient.Modals.Cape', [])


/**
 * Cape module
 */
.factory('Cape',
[
    '$rootScope', '$config', '$q',
    function ($rootScope, $config, $q)
    {
      /**
       * CapeClient constructor
       */
      var CapeClient = function ()
      {
        this.server         = $config.host;
        this.requestid      = 0;
        this.stateAgentUrl  = null;
        this.requests       = [];
        this.connection     = new Strophe.Connection(this.server);

        var sid     = localStorage['capeclient_sid'],
            rid     = localStorage['capeclient_rid'],
            jid     = localStorage['capeclient_jid'];
        this.stateAgentUrl = localStorage['capeclient_sa'];
        this.userid = localStorage['capeclient_uid'];
        

        var thiz = this;

        if (sid !== null && jid != null)
        {
          console.log('reconnecting');

          this.connection.attach(jid, sid, rid + 1, function (status)
          {
            if (status == Strophe.Status.ATTACHED)
            {
                console.log('reconnected');

                var iq = $iq({to: Strophe.getDomainFromJid(jid), type: "get"})
                    .c('query', {xmlns:'http://jabber.org/protocol/disco#info'});

                thiz.connected();
            }
            else if (status == Strophe.Status.CONNFAIL)
            {
              console.log('Strophe failed to connect.');
            }
            else if (status == Strophe.Status.DISCONNECTING)
            {
              console.log('Strophe is disconnecting.');
            }
            else if (status == Strophe.Status.DISCONNECTED)
            {
              console.log('Strophe is disconnected.');

              thiz.disconnected();
            }
            else if (status == Strophe.Status.CONNECTED)
            {
              console.log('Strophe is connected.');

              thiz.connected(null);
            }
            else if (status == Strophe.Status.CONNFAIL)
            {
              console.log('Strophe failed to connect.');
            }
          });
        }
      };


      /**
       * JsonRpc connector
       */
      var JSONRPC = function (connection)
      {
        this.connection = connection;
      };


      /**
       * Send
       */
      JSONRPC.prototype.send = function (reqid, url, method, params)
      {
        var request     = {};

        request.id      = reqid;
        request.method  = method;
        request.params  = params;

        var json        = JSON.stringify(request);

        var reply = $msg({to: url, from: this.username, type: 'chat'})
                .c("body")
                .t( json );

        console.log('Sending: ',json);

        this.connection.send(reply.tree());
      };


      /**
       * Login
       */
      CapeClient.prototype.login = function (username, password, callback)
      {
        this.userid   = username;
        this.username = username + '@openid.ask-cs.com/web';

        var thiz = this;

        this.connection.connect(this.username,
                                password,
                                onConnect);

        function onConnect (status)
        {
          if (status == Strophe.Status.CONNECTING)
          {
            console.log('Strophe is connecting.');
          }
          else if (status == Strophe.Status.CONNFAIL)
          {
            console.log('Strophe failed to connect.');
          }
          else if (status == Strophe.Status.DISCONNECTING)
          {
            console.log('Strophe is disconnecting.');

            thiz.disconnected();
          }
          else if (status == Strophe.Status.CONNECTED)
          {
            console.log('Strophe is connected.');

            thiz.connected(callback);
          }
          else if (status == Strophe.Status.AUTHFAIL)
          {
            console.log('Strophe failed to connect.');
          }
          else if (status == Strophe.Status.ERROR)
          {
            console.log('Strophe failed to connect.');
          }
        }
      };


      /**
       * Connected
       */
      CapeClient.prototype.connected = function (callback)
      {
        localStorage['capeclient_sid'] = this.connection.sid;
        localStorage['capeclient_rid'] = this.connection.rid;
        localStorage['capeclient_jid'] = this.connection.jid;
        localStorage['capeclient_uid'] = this.userid;

        this.connection.addHandler(onMessage, null, 'message', null, null,  null);

        this.connection.send($pres().tree());

        var thiz = this;

        if (this.stateAgentUrl == undefined)
        {
          this.findDatasource(this.userid, "state", function (result)
          {
            thiz.stateAgentUrl = result.result[0].agentUrl.replace('xmpp:', '');

            localStorage['capeclient_sa'] = thiz.stateAgentUrl;

            if(callback !== null)
              callback();
          });
        }
        else
        {
          if(callback !== null)
              callback();
        }

        function onMessage (msg)
        {
          //console.log('Receiving: ',msg);

          var to      = msg.getAttribute('to'),
              from    = msg.getAttribute('from'),
              type    = msg.getAttribute('type'),
              elems   = msg.getElementsByTagName('body'),
              errors  = msg.getElementsByTagName('error');

          if (elems.length > 0)
          {
            var body = elems[0],
                json = JSON.parse(Strophe.getText(body));

            console.warn('Result ->', json);

            if (json.result !== null)
            {
              var callb = thiz.requests[json.id];

              // console.log('this requests ===>', thiz.requests);

              //console.log('Callb: '+callb+' reqid: '+json.id);
              if(callb!==null) {
                // console.log('Starting callback');
                callb(json);
                thiz.requests.splice(json.id, 1);
              }
            }
            else if (json.method !== null)
            {
              console.log("Received new call: ",json);
            }
          }

          if (errors.length > 0)
          {
            var error = errors[0];

            console.log(error);
            console.log('Received error from ' + from + ': ' + Strophe.getText(error));
          }

          // we must return true to keep the handler alive.
          // returning false would remove it after it finishes.
          return true;
        }
      };


      /**
       * Disconnect
       */
      CapeClient.prototype.disconnect = function (callback)
      {
        this.connection.disconnect();

        callback();
      };


      /**
       * Disconnected
       */
      CapeClient.prototype.disconnected = function ()
      {
        console.log('Disconnected!');
        localStorage.removeItem('capeclient_sid');
        localStorage.removeItem('capeclient_rid');
        localStorage.removeItem('capeclient_jid');
        localStorage.removeItem('capeclient_sa');
      };


      /**
       * Find Data Source
       */
      CapeClient.prototype.findDatasource = function (agentid, type, callback)
      {
        // console.log('lets look for the data source', callback);

        var merlin      = "merlin@openid.ask-cs.com/merlin",
            params      = {};

        params.userId   = agentid;
        params.dataType = type;

        this.call(merlin, "find", params, callback);
      };


      /**
       * Get Slots
       */
      CapeClient.prototype.getSlots = function (start, end, callback)
      {
        if (this.stateAgentUrl === null)
          throw "No stateAgent found";

        if (start === null)
          start = new Date().getTime();

        if (end === null)
          end = start + 1;

        var params          = {};
        params.start_millis = start;
        params.end_millis   = end;

        //console.log(this.stateAgentUrl, "getSlotsCombined", params, callback);

        this.call(this.stateAgentUrl, "getSlotsCombined", params, callback);
      };


      /**
       * Set Slots
       */
      CapeClient.prototype.setSlot = function (start, end, text, occurence, callback)
      {
        if (this.stateAgentUrl === null)
          throw "No stateAgent found";

        //TODO: check if fields are not empty

        var params          = {};
        params.start_millis = start;
        params.end_millis   = end;
        params.description  = text;
        params.occurence    = (occurence) ? 'WEEKLY' : 'ONCE';

        this.call(this.stateAgentUrl, "setSlot", params, callback);
      };


      /**
       * Is connected?
       */
      CapeClient.prototype.isConnected = function ()
      {
        return this.connection.connected;
      };


      /**
       * Call
       */
      CapeClient.prototype.call = function (agentUrl, method, params, callback)
      {
        // console.warn('call function !!', arguments);

        this.requestid++;

        var rpc = new JSONRPC(this.connection);

        rpc.send(this.requestid, agentUrl, method, params);

        this.requests[this.requestid] = callback;

        // console.log('stacked request =====>', this.requests[this.requestid]);
      };


      return new CapeClient();
    }
]);

