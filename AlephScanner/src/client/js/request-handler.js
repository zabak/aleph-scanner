goog.provide('alephscanner.RequestHandler');

goog.require('alephscanner.OutputHolder');
goog.require('alephscanner.ConditionsHolder');

goog.require('goog.json');
goog.require('goog.net.XmlHttp');
goog.require('goog.net.XhrIo');
goog.require('goog.ui.Prompt');


alephscanner.RequestHandler = function(url) {    
    var input = goog.dom.getElement('input-panel');
    var output = goog.dom.getElement('output-panel');
    this.conditionsHolder_ = new alephscanner.ConditionsHolder(this);
    this.conditionsHolder_.insert(input);
  
    this.outputHolder_ = new alephscanner.OutputHolder();
    this.outputHolder_.insert(output); 
    this.url_ = url;    
    this.setInitialData_();
    this.warningDialog_ = null;  
};


alephscanner.RequestHandler.prototype.createJsonObject_ = function() {
    var resultJson = {
        "base" : this.conditionsHolder_.getBaseValue(),
        "df_conditions" : this.conditionsHolder_.getConditionSpecArray(),
        "cf_conditions" : this.conditionsHolder_.getConditionCFSpecArray(),
        "outputs" : this.outputHolder_.getOutputSpecArray(),
        "result_mode" : this.outputHolder_.getResultModeValue(),
        "distinct" : false,
        "header" : false,
        "new_export_name": ''
    };
    return resultJson;
};

alephscanner.RequestHandler.prototype.showWarningDialog= function(type, header, message) {
    if(!this.warningDialog_) {
        this.warningDialog_= new goog.ui.Dialog();
        this.warningDialog_.setContent('<h3>' + header + '</h3>' +
            '<br/><div id="message-div" style="height: 100%;width: 100%;margin: 0px;"></div>');
        this.warningDialog_.setTitle(type);
        this.warningDialog_.setButtonSet(goog.ui.Dialog.ButtonSet.OK); 
    }  
    this.warningDialog_.setVisible(true);
    goog.dom.getElement("message-div").innerHTML=message;                          
};


alephscanner.RequestHandler.prototype.validateJson_= function(jsonObejct) {       
    for(var i = 0; i < jsonObejct.df_conditions.length; i++) {
        if(jsonObejct.df_conditions[i].field == '') {
            this.showWarningDialog("Chyba", "Špatně zadaná vstupní data.", "U některého vstupního datového pole chybí název.");
            return false;
        }
    }
    for(var i = 0; i < jsonObejct.cf_conditions.length; i++) {
        if(jsonObejct.cf_conditions[i].field == '') {
            this.showWarningDialog("Chyba", "Špatně zadaná vstupní data.", "U některého vstupního kontrolního pole chybí název.");
            return false;
        }
    }    
    for(var i = 0; i < jsonObejct.outputs.length; i++) {
        if(jsonObejct.outputs[i].field == '') {
            this.showWarningDialog("Chyba", "Špatně zadaná vstupní data.", "U některého výstupního pole chybí název.");
            return false;
        }
    }       
  
    return true;
}

alephscanner.RequestHandler.prototype.handleRequest= function() {  
    console.log(this);    
    var jsonObject = this.createJsonObject_();
    if(this.validateJson_(jsonObject)) {
        var data = goog.json.serialize(jsonObject);
        this.request_(data);
    }    
}

alephscanner.RequestHandler.prototype.handleRequestWithNewExport= function() {        
    var context = this;
    var jsonObject = this.createJsonObject_();
    if(this.validateJson_(jsonObject)) {
        var prompt = new goog.ui.Prompt(
            'Název',
            'Zadejte název pro nový export.', function(response) {
                if (response != null && response != '') {
                    jsonObject.new_export_name=response;
                    var data = goog.json.serialize(jsonObject);
                    context.request_(data);               
                }
            });
        prompt.setVisible(true);
    }
};
        



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


alephscanner.RequestHandler.prototype.setInitialData_ = function() {    
    var context = this;
    goog.net.XhrIo.send("GetInfo", function(e) {
        var xhr = e.target;
        var response = xhr.getResponseJson();
        context.conditionsHolder_.setBasis_(response.basis);
    });     
};


alephscanner.RequestHandler.prototype.removeExport = function(base) {
    var context = this;
    goog.net.XhrIo.send("RemoveExport?base=" + base, function(e) {
        var xhr = e.target;
        var response = xhr.getResponseJson();
        if(response.result) {
            context.conditionsHolder_.setBasis_(response.basis);
            context.showWarningDialog("OK", "OK", "Export byl úspěšně smazaný.");
        } else {
            context.showWarningDialog("Chyba", "Chyba", "Vybraný export se nepodařilo smazat, smazat lze jen v aplikaci vytvořené exporty.");
        }
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





