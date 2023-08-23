/**
 *
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const echoapp = {};

/**
 * @param {Object} echoService
 * @param {Object} ctors
 */
echoapp.EchoApp = function(echoService, ctors) {
  this.echoService = echoService;
  this.ctors = ctors;
};

echoapp.EchoApp.INTERVAL = 500; // ms
echoapp.EchoApp.MAX_STREAM_MESSAGES = 50;

/**
 * @param {string} message
 * @param {string} cssClass
 */
echoapp.EchoApp.addMessage = function(all_fields, cssClass) {


  var text = "Message: " + all_fields.message + "<br>"
  text += "Name: " + all_fields.name + "<br>"
  text += "age: " + all_fields.age + "<br>"
  text += "is_admin: " + all_fields.is_admin + "<br>"
  text += "weight: " + all_fields.weight + "<br>"
  text += "test2: " + all_fields.test2 + "<br>"
  text += "test3: " + all_fields.test3 + "<br>"
  text += "test4: " + all_fields.test4 + "<br>"

  $("#first").after(
    $("<div/>").addClass("row").append(
      $("<h2/>").append(
        $("<span/>").addClass("label " + cssClass).html(text))));
};

/**
 * @param {string} message
 */
echoapp.EchoApp.addLeftMessage = function(all_fields) {
  this.addMessage(all_fields, "label-primary pull-left");
};

/**
 * @param {string} message
 */
echoapp.EchoApp.addRightMessage = function(all_fields) {
  this.addMessage(all_fields, "label-default pull-right");
};

/**
 * @param {string} msg
 */
echoapp.EchoApp.prototype.echo = function(all_fields) {
  var msg = all_fields.message;
  // echoapp.EchoApp.addLeftMessage(msg);
  var unaryRequest = new this.ctors.EchoRequest();
  unaryRequest.setMessage(msg);
  unaryRequest.setAge(all_fields.age)
  unaryRequest.setName(all_fields.name)
  var is_admin = false;
  if (all_fields.is_admin == "true"){
    is_admin = true
  }
  unaryRequest.setIsAdmin(is_admin)
  unaryRequest.setWeight(all_fields.weight)
  unaryRequest.setTest2(all_fields.test2)
  unaryRequest.setTest3(all_fields.test3)
  unaryRequest.setTest4(all_fields.test4)
  echoapp.EchoApp.addLeftMessage(all_fields)
  var call = this.echoService.echo(unaryRequest,
                                   {"custom-header-1": "value1"},
                                   function(err, response) {
    if (err) {
      echoapp.EchoApp.addRightMessage('Error code: '+err.code+' "'+
                                      err.message+'"');
    } else {
      setTimeout(function () {
        var r_all_fields = response.toObject()
        echoapp.EchoApp.addRightMessage(r_all_fields);
      }, echoapp.EchoApp.INTERVAL);
    }
  });
  call.on('status', function(status) {
    if (status.metadata) {
      console.log("Received metadata");
      console.log(status.metadata);
    }
  });
};

/**
 * @param {string} msg
 */
echoapp.EchoApp.prototype.echoError = function(msg) {
  echoapp.EchoApp.addLeftMessage(`Error: ${msg}`);
  var unaryRequest = new this.ctors.EchoRequest();
  unaryRequest.setMessage(msg);
  this.echoService.echoAbort(unaryRequest, {}, function(err, response) {
    if (err) {
      echoapp.EchoApp.addRightMessage('Error code: '+err.code+' "'+
                                      err.message+'"');
    }
  });
};

/**
 * @param {string} msg
 * @param {number} count
 */
echoapp.EchoApp.prototype.repeatEcho = function(msg, count) {
  echoapp.EchoApp.addLeftMessage(msg);
  if (count > echoapp.EchoApp.MAX_STREAM_MESSAGES) {
    count = echoapp.EchoApp.MAX_STREAM_MESSAGES;
  }
  var streamRequest = new this.ctors.ServerStreamingEchoRequest();
  streamRequest.setMessage(msg);
  streamRequest.setMessageCount(count);
  streamRequest.setMessageInterval(echoapp.EchoApp.INTERVAL);

  var stream = this.echoService.serverStreamingEcho(
    streamRequest,
    {"custom-header-1": "value1"});
  stream.on('data', function(response) {
    echoapp.EchoApp.addRightMessage(response.getMessage());
  });
  stream.on('status', function(status) {
    if (status.metadata) {
      console.log("Received metadata");
      console.log(status.metadata);
    }
  });
  stream.on('error', function(err) {
    echoapp.EchoApp.addRightMessage('Error code: '+err.code+' "'+
                                    err.message+'"');
  });
  stream.on('end', function() {
    console.log("stream end signal received");
  });
};

function htmlEncode(string) {
  return string.replace(/&/g, '&amp;')
  			.replace(/</g, '&lt;')
  			.replace(/>/g, '&gt;')
  			.replace(/'/g, '&#39;')
  			.replace(/"/g, '&#34;')
  			.replace(/\//, '&#x2F;');
}

/**
 * @param {Object} e event
 * @return {boolean} status
 */

var sent_num = 0;
echoapp.EchoApp.prototype.send = function(e) {
  var msg = $("#msg").val();
  var name = $("#name").val();
  var age = $("#age").val();
  var is_admin = $("#is_admin").val();
  var weight = $("#weight").val();
  var test2 = $("#test2").val();
  var test3 = $("#test3").val();
  var test4 = $("#test4").val();
  var all_fields = {
    message: htmlEncode(msg),
    name: htmlEncode(name),
    age: htmlEncode(age),
    is_admin: htmlEncode(is_admin),
    weight: htmlEncode(weight),
    test2: htmlEncode(test2),
    test3: htmlEncode(test3),
    test4: htmlEncode(test4)
  }

  sent_num += 1
  $("#result_text").text('Request Sent Count: ' + sent_num);

  this.echo(all_fields);

  return false;
};

/**
 * Load the app
 */
echoapp.EchoApp.prototype.load = function() {
  var self = this;
  $(document).ready(function() {
    // event handlers
    $("#send").click(self.send.bind(self));

    $("#msg").focus();
  });
};

module.exports = echoapp;
