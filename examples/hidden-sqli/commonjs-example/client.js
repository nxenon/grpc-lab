const {EchoRequest,
       ServerStreamingEchoRequest} = require('./echo_pb.js');
const {EchoServiceClient} = require('./echo_grpc_web_pb.js');
const {EchoApp} = require('../echoapp.js');
const grpc = {};
grpc.web = require('grpc-web');

/** Sample interceptor implementation */
const StreamResponseInterceptor = function() {};


var opts = {'streamInterceptors' : [new StreamResponseInterceptor()]};
var echoService = new EchoServiceClient('http://'+window.location.hostname+':8080', null,
                                        null);
//                                      opts);

var echoApp = new EchoApp(
  echoService,
  {
    EchoRequest: EchoRequest,
    ServerStreamingEchoRequest: ServerStreamingEchoRequest
  }
);

echoApp.load();
