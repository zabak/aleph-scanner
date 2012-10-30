goog.provide('alephscanner.RequestHandler');

goog.require('alephscanner.OutputHolder');
goog.require('alephscanner.ConditionsHolder');

goog.require('goog.json');
goog.require('goog.net.XmlHttp');
goog.require('goog.net.XhrIo');




alephscanner.RequestHandler = function(url) {    
    var input = goog.dom.getElement('input-panel');
    var output = goog.dom.getElement('output-panel');
    this.conditionsHolder_ = new alephscanner.ConditionsHolder(this);
    this.conditionsHolder_.insert(input);
  
    this.outputHolder_ = new alephscanner.OutputHolder();
    this.outputHolder_.insert(output); 
    this.url_ = url;    
    this.setInitialData_("GetInfo");

};




alephscanner.RequestHandler.prototype.createJsonObject_ = function(exportName) {
    var resultJson = {
        "base" : this.conditionsHolder_.getBaseValue(),
        "df_conditions" : this.conditionsHolder_.getConditionSpecArray(),
        "cf_conditions" : this.conditionsHolder_.getConditionCFSpecArray(),
        "outputs" : this.outputHolder_.getOutputSpecArray(),
        "result_mode" : this.outputHolder_.getResultModeValue(),
        "distinct" : false,
        "header" : false,
        "new_export_name": exportName
    };
    return resultJson;
}


alephscanner.RequestHandler.prototype.handleRequest= function() {  
    console.log(this);
    var data = goog.json.serialize(this.createJsonObject_(""));
    this.request_(data);
}

alephscanner.RequestHandler.prototype.handleRequestWithNewExport= function(name) {    
    var data = goog.json.serialize(this.createJsonObject_(name));
    this.request_(data);
}



alephscanner.RequestHandler.prototype.request_ = function(data) {    
    this.outputHolder_.showLoader();
    var context = this;
    var request = new goog.net.XhrIo();              
    goog.events.listen(request, "complete",function(){                    
        if (request.isSuccess()) {                                    
            console.log("Satus code: ", request.getStatus(), " - ", request.getStatusText());                                                
            context.outputHolder_.showResult(request.getResponseJson());               
            context.outputHolder_.hideLoader();
            var new_export_name = request.getResponseJson().new_export;
            console.log(new_export_name);
            if(new_export_name != '') {
                context.conditionsHolder_.addNewBase(new_export_name);
            }
        } else {                        
            context.outputHolder_.hideLoader();
            console.log(
                "Something went wrong in the ajax call. Error code: ", request.getLastErrorCode(),
                " - message: ", request.getLastError()
            );               
        }                    
    });                
    request.send(this.url_, "POST", data);                
};


alephscanner.RequestHandler.prototype.setInitialData_ = function(url) {    
  var context = this;
  goog.net.XhrIo.send(url, function(e) {
      var xhr = e.target;
      response = xhr.getResponseJson();      
      context.conditionsHolder_.setBasis_(response.basis);
  });     
};


alephscanner.RequestHandler.prototype.setAllFromImport = function(data) {    
    this.conditionsHolder_.setBaseValue(data.base);
    this.conditionsHolder_.removeAllConditions();
    this.outputHolder_.removeAllOutputs();
    this.outputHolder_.setResultModeValue(data.result_mode);
    for(var i = 0; i < data.df_conditions.length; i++) {
        this.conditionsHolder_.importConditionsDF(data.df_conditions[i]);      
    }
    for(var i = 0; i < data.cf_conditions.length; i++) {
        this.conditionsHolder_.importConditionsCF(data.cf_conditions[i]);      
    }  
    for(var i = 0; i < data.outputs.length; i++) {
        this.outputHolder_.importOutputItem_(data.outputs[i]);      
    }    
};





