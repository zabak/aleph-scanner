goog.provide('alephscanner.RequestHandler');

goog.require('alephscanner.OutputHolder');
goog.require('alephscanner.ConditionsHolder');

goog.require('goog.json');
goog.require('goog.net.XmlHttp');
goog.require('goog.net.XhrIo');




alephscanner.RequestHandler = function(conditionsHolder, outputHolder, url) {    
    this.outputHolder_ = outputHolder;
    this.conditionsHolder_ = conditionsHolder;  
    this.url_ = url;
    goog.events.listen(this.conditionsHolder_.getSearchButton(), goog.events.EventType.CLICK, this.handleRequest_, false, this);
    this.setInitialData_("GetInfo");

};




alephscanner.RequestHandler.prototype.createJsonObject_ = function() {
    var resultJson = {
        "base" : this.conditionsHolder_.getBaseValue(),
        "df_conditions" : this.conditionsHolder_.getConditionSpecArray(),
        "cf_conditions" : [],
        "outputs" : this.outputHolder_.getOutputSpecArray(),
        //"multiple" :this.outputHolder_.repeatField(),
        "result_mode" : this.outputHolder_.getResultModeValue(),
        "distinct" : false,
        "header" : false
    };
    return resultJson;
}


alephscanner.RequestHandler.prototype.handleRequest_ = function() {    
    this.outputHolder_.showLoader();
    var context = this;
    var request = new goog.net.XhrIo();
    var data = goog.json.serialize(this.createJsonObject_());               
    goog.events.listen(request, "complete",function(){                    
        if (request.isSuccess()) {                                    
            // print confirm to the console
            console.log("Satus code: ", request.getStatus(), " - ", request.getStatusText());                                                
            context.outputHolder_.showResult(request.getResponseJson());               
            context.outputHolder_.hideLoader();
        } else {                        
            context.outputHolder_.hideLoader();
            console.log(
                "Something went wrong in the ajax call. Error code: ", request.getLastErrorCode(),
                " - message: ", request.getLastError()
            );               
        }                    
    });                
    // start the request by setting POST method and passing
    // the data object converted to a queryString
    request.send(this.url_, "POST", data);                
};


alephscanner.RequestHandler.prototype.setInitialData_ = function(url) {    
  var context = this;
  goog.net.XhrIo.send(url, function(e) {
      var xhr = e.target;
      response = xhr.getResponseJson();      
      console.log(response.basis);
      context.conditionsHolder_.setBasis_(response.basis);
  });     
};
