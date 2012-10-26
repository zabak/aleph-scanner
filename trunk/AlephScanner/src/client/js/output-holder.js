goog.provide('alephscanner.OutputHolder');

goog.require('alephscanner.OutputItem');

alephscanner.OutputHolder = function() {
    this.outputItems_ = [];
    this.container_ = null;
    this.headerPanel_ = null; 
    this.outputItemsPanel_ = null;
    this.outputPanel_ = null;
    this.outputTextArea_ = null;
    this.centrolPanel_ = null; 
   // this.footerPanel_ = null; 
    this.resultMode_ = null;
    this.loader_ = null;
    //this.repeatableCheckBox_ = null;
    this.createContainer_();   
      
};

alephscanner.OutputHolder.prototype.createContainer_ = function() {    
    this.container_ = goog.dom.createDom("div", {
        'class' : 'output'
    });          
    this.createHeaderPanel_();    
    this.createOutputItemsPanel_();
    this.createControlPanel_();
    this.createOutputPanel_();    
    this.createFooterPanel_();
    this.addOutputItem_();    
    
};


alephscanner.OutputHolder.prototype.createOutputItemsPanel_ = function() {
    this.outputItemsPanel_ = goog.dom.createDom("div", {
        'class' : 'output-items-container'
    });            

    
    goog.dom.appendChild(this.container_, this.outputItemsPanel_);
};

alephscanner.OutputHolder.prototype.createControlPanel_ = function() {
    var controllPanelDiv = goog.dom.createDom("div", {
        'class' : 'output-controll-panel'
    });  
   
    var addOutputButton = goog.dom.createDom('div',{
        "class" : 'image-button16 add-output-button'
    });
    goog.events.listen(addOutputButton, goog.events.EventType.CLICK, this.addOutputItem_, false, this);
    goog.dom.appendChild(controllPanelDiv, addOutputButton);
                   
    goog.dom.appendChild(this.container_, controllPanelDiv);
};

alephscanner.OutputHolder.prototype.createFooterPanel_ = function() {
    var footerPanel = goog.dom.createDom("div", {
        'class' : 'output-footer-panel'
    });       
    goog.dom.appendChild(footerPanel, goog.dom.createDom("span", null, document.createTextNode("Výsledky: ")));
    goog.dom.appendChild(footerPanel, goog.dom.createDom("span", {"id" : "result_count", "class" : "result-counter"}));
    goog.dom.appendChild(footerPanel, goog.dom.createDom("br"));
    goog.dom.appendChild(footerPanel, goog.dom.createDom("span", null, document.createTextNode("Vyhovující záznamy: ")));
    goog.dom.appendChild(footerPanel, goog.dom.createDom("span", {"id" : "record_count", "class" : "result-counter"}));
    goog.dom.appendChild(footerPanel, goog.dom.createDom("br"));
    goog.dom.appendChild(footerPanel, goog.dom.createDom("span", null, document.createTextNode("Všechny záznamy: ")));
    goog.dom.appendChild(footerPanel, goog.dom.createDom("span", {"id" : "all_count", "class" : "result-counter"}));
    goog.dom.appendChild(this.container_, footerPanel);
};

alephscanner.OutputHolder.prototype.createHeaderPanel_ = function() {
    var headerDiv = goog.dom.createDom("div", {
        'class' : 'output-header-panel'
    });  
   
   
   
//    this.repeatableCheckBox_ = goog.dom.createDom('input');  
//    this.repeatableCheckBox_.type="checkbox";
//    goog.events.listen(this.repeatableCheckBox_, goog.events.EventType.CLICK, this.onRepeatFieldChange_, false, this);      
//      
    var downloadButton = goog.dom.createDom('div',{
        "class" : 'download-button image-button22'
    });
    goog.events.listen(downloadButton, goog.events.EventType.CLICK, this.downloadOutput_, false, this);    


    var csvButton = goog.dom.createDom('div',{
        "class" : 'csv-button image-button22'
    });
    goog.events.listen(csvButton, goog.events.EventType.CLICK, this.setCsvOutput_, false, this);    

    
    this.resultMode_ = goog.dom.createDom('select');
    var allOption = goog.dom.createDom('option', {
        'selected':'selected',
        'value':'all'
    },"Všechny");    
    var distinctOption = goog.dom.createDom('option', {
        'value':'distinct'
    },"Jen různé");
    var frequencyOption = goog.dom.createDom('option', {
        'value':'frequency'
    },"Četnosti");    

    this.resultMode_.appendChild(allOption);
    this.resultMode_.appendChild(distinctOption);
    this.resultMode_.appendChild(frequencyOption);
    goog.events.listen(this.resultMode_, goog.events.EventType.CHANGE, this.onResultModeChange_, false, this);
    

   // goog.dom.appendChild(headerDiv, goog.dom.createDom("label", null, goog.dom.createTextNode("Opakovat pole")));
   // goog.dom.appendChild(headerDiv, this.repeatableCheckBox_);
    goog.dom.appendChild(headerDiv, goog.dom.createDom("label", null, goog.dom.createTextNode("Výsledky: ")));
    goog.dom.appendChild(headerDiv, this.resultMode_);
    goog.dom.appendChild(headerDiv, csvButton);
    goog.dom.appendChild(headerDiv, downloadButton);
    
    
    
    //goog.dom.appendChild(headerDiv, goog.dom.createDom("label", null, goog.dom.createTextNode("Distinct")));
    //goog.dom.appendChild(headerDiv, goog.dom.createDom("input", {'type' : 'checkbox', 'id' : 'output-distinct'}));
    goog.dom.appendChild(this.container_, headerDiv);
};


alephscanner.OutputHolder.prototype.onResultModeChange_ = function() {
//    var q = this.getMultipleFieldModeValue_();
//    if(q == 'first') {
//        this.insideSeparator_.style.visibility = 'hidden';       
//    } else {
//        this.insideSeparator_.style.visibility = 'visible'; 
//    }
}


alephscanner.OutputHolder.prototype.createOutputPanel_ = function() {
    this.outputPanel_ = goog.dom.createDom("div", {
        'class' : 'output-panel'
    });  
    
    var attributes = {
        'wrap' : "off",
        'class' : "output-text-area",
        'readonly' : "readonly"
    };
    this.outputTextArea_ = goog.dom.createDom("textarea", attributes);

    var loaderAttributes = {
        'id' : "loader",
        'src' : "loader.gif"
    };
    this.loader_ = goog.dom.createDom("img", loaderAttributes);
    
    goog.dom.appendChild(this.outputPanel_, this.outputTextArea_);
    goog.dom.appendChild(this.outputPanel_, this.loader_);
    goog.dom.appendChild(this.container_, this.outputPanel_);
};




alephscanner.OutputHolder.prototype.addOutputItem_ = function() {  
    var output = new alephscanner.OutputItem();//this.repeatField());
    output.insert(this.outputItemsPanel_);
    goog.array.insert(this.outputItems_, output);
};
  
  
alephscanner.OutputHolder.prototype.insert = function(container) {
    goog.dom.appendChild(container, this.container_);
};


alephscanner.OutputHolder.prototype.showResult = function(response) {   
    this.outputTextArea_.innerHTML=response.results[0].join('\n');
    goog.dom.getElement("export_date").innerHTML= response.export_date;
    goog.dom.getElement("result_count").innerHTML= response.result_count;
    goog.dom.getElement("record_count").innerHTML= response.record_count;
    goog.dom.getElement("all_count").innerHTML= response.export_count;    
};
    
    
    
alephscanner.OutputHolder.prototype.getResultModeValue = function() {
    return this.resultMode_.options[this.resultMode_.selectedIndex].value;
};    
 

alephscanner.OutputHolder.prototype.getOutputSpecArray = function() {
    var outputs = [];
    goog.array.forEach(this.outputItems_,
        function(output) {
            if(output.isActive()) {
                goog.array.insert(outputs, output.getJsonObject());
            }
        });
    return outputs;   
};  


alephscanner.OutputHolder.prototype.hideLoader = function() {
    console.log("hide loader");
    this.loader_.style.visibility = 'hidden';
};


alephscanner.OutputHolder.prototype.showLoader = function() {
    this.loader_.style.visibility = 'visible';
};


alephscanner.OutputHolder.prototype.downloadOutput_ = function() {
    var data = this.outputTextArea_.value;
    //location.href='data:application/download,' + encodeURIComponent(data);
    location.href='data:text/csv;charset=UTF-8,' + encodeURIComponent(data);
}


alephscanner.OutputHolder.prototype.setCsvOutput_ = function() {
    var lastOutput;
    goog.array.forEach(this.outputItems_,
        function(output) {
            if(output.isActive()) {
                lastOutput = output;
                output.setRightSeparatorValue('",');
                output.setLeftSeparatorValue('"');
                var mode = output.getMultipleFieldModeValue();
                if(mode == 'single') {
                    output.setInsideSeparatorValue(', ');                                        
                } else if(mode == 'multi') {
                    output.setInsideSeparatorValue('","');        
                }    
            }
        });
    if(lastOutput) {
         lastOutput.setRightSeparatorValue('"');        
    }      
}





//alephscanner.OutputHolder.prototype.setRepeatableRadioVisibility_ = function(visible) {
//    goog.array.forEach(this.outputItems_,
//        function(output) {
//            if(visible) {
//                output.showRepeatableRadio();
//            } else {
//                output.hideRepeatableRadio();
//            }
//        });   
//};  


//alephscanner.OutputHolder.prototype.repeatField = function() {
//    return this.repeatableCheckBox_.checked;
//};

/*
alephscanner.OutputHolder.prototype.onRepeatFieldChange_ = function() {
    this.setRepeatableRadioVisibility_(this.repeatField());
};
*/