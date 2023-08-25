const searcherapp = {};

searcherapp.SearcherApp = function (searcherService, ctors){
  this.searcherService = searcherService;
  this.ctors = ctors;
}

searcherapp.SearcherApp.INTERVAL = 500; // ms
searcherapp.SearcherApp.MAX_STREAM_MESSAGES = 50;

searcherapp.SearcherApp.addResult = function (result){
  // result is stringified of json result

    if (result.length > 0){
      json_result = JSON.parse(result)
      for (var i = 0; i < json_result.length; i++) {
        var item = json_result[i];

        $("#results-div").append(
            "<div>" + "<p>--------------------------</p>" + "<p>id:" + item.id + "</p>"  + "<p>Title:" + item.title + "</p>"  + "<p>Body:" + item.body + "</p>" + "</div>" + "<p>--------------------------</p>"
        )
      }
    }

}

searcherapp.SearcherApp.addError = function (msg){
  // add error in front-end
  alert("Error Occurred: " + msg)
}

searcherapp.SearcherApp.prototype.search = function (word){

  var unaryRequest = new this.ctors.SearchRequest();
  unaryRequest.setSearchWord(word);
  x = Object.getOwnPropertyNames(this)
  console.log(x)
  var call = this.searcherService.search(unaryRequest,{},function (err, response){
    if (err){
      searcherapp.SearcherApp.addError('Error Code: ' + err.code + ' --msg-> ' + err.message);
    } else {
      setTimeout(function (){
        searcherapp.SearcherApp.addResult(response.getResult())
      }, searcherapp.SearcherApp.INTERVAL);
    }
  });
  call.on('status', function(status) {
  if (status.metadata) {
    console.log("Received metadata");
    console.log(status.metadata);
  }
  });
}

searcherapp.SearcherApp.prototype.send = function (e){
  var word = $("#word").val().trim();
  $("#results-div").html(''); // clear the text box
  if (!word) return false;
  this.search(word)
  return false;
}

searcherapp.SearcherApp.prototype.load = function (){
  var self = this
  $(document).ready(function (){
    $("#search").click(self.send.bind(self));
  });
}

module.exports = searcherapp;
