const {SearchRequest} = require('./hiddensqli_pb');
const {SearcherClient} = require('./hiddensqli_grpc_web_pb');
const {SearcherApp} = require('./seacherapp');
const grpc = {};
grpc.web = require('grpc-web');


var searcherService = new SearcherClient('http://'+window.location.hostname+':8080', null,
                                        null);

var searcherApp = new SearcherApp(
  searcherService,
  {
    SearchRequest: SearchRequest
  }
);

searcherApp.load();
