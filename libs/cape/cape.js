var CapeClient = function() {

    this.server = "http://openid.ask-cs.com:5280/http-bind";
    // this.server = "http://openid.almende.org:5280/http-bind";
    this.connection = null;
}

var JSONRPC = function(connection) {
    this.connection = connection;
}

JSONRPC.prototype.send = function(url, method, params) {
    var request = {};
    request.id=-1;
    request.method=method;
    request.params = params;

    var reply = $msg({to: this.username, from: url, type: 'chat'})
            .cnode(Strophe.copyElement(JSON.stringify(request)));
    this.connection.send(reply.tree());
}

CapeClient.prototype.login= function(username, password) {

    this.userid = username;
    this.username = username + '@openid.ask-cs.com/web';
    this.connection = new Strophe.Connection(this.server);

    this.connection.rawInput = this.receive;
    this.connection.rawOutput = this.output;

    this.connection.connect(username,
                            password,
                            this.onConnect);
}

CapeClient.prototype.onConnect = function(status)
{

    if (status == Strophe.Status.CONNECTING) {
        console.log('Strophe is connecting.');
    } else if (status == Strophe.Status.CONNFAIL) {
        console.log('Strophe failed to connect.');
    } else if (status == Strophe.Status.DISCONNECTING) {
        console.log('Strophe is disconnecting.');
    } else if (status == Strophe.Status.DISCONNECTED) {
        console.log('Strophe is disconnected.');
    } else if (status == Strophe.Status.CONNECTED) {
        console.log('Strophe is connected.');

        //this.findDatasource(this.userid, "state");
    } else {
        console.log(status);
    }
}

CapeClient.prototype.disconnect = function() {
    this.connection.disconnect();
}

CapeClient.prototype.receive = function(result) {
    console.log("IN: "+result);
}

CapeClient.prototype.output = function(result) {
    console.log('OUT: '+result);
}

CapeClient.prototype.findDatasource = function(agentid, type) {
    
    var merlin = 'merlin@openid.ask-cs.com/merlin';
    var rpc = new JSONRPC(this.connection);
    var params = {};
    params.userId = agentid;
    params.dataType = type;
    rpc.send(merlin, "find", params);
}