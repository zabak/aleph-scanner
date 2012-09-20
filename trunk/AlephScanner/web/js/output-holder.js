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
    this.footerPanel_ = null; 
    this.loader_ = null;
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
    
    this.addOutputItem_();    
//this.createFooterPanel_();
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

alephscanner.OutputHolder.prototype.createHeaderPanel_ = function() {
    var headerDiv = goog.dom.createDom("div", {
        'class' : 'output-header-panel'
    });  
    //goog.dom.appendChild(headerDiv, goog.dom.createDom("label", null, goog.dom.createTextNode("Distinct")));
    //goog.dom.appendChild(headerDiv, goog.dom.createDom("input", {'type' : 'checkbox', 'id' : 'output-distinct'}));
    goog.dom.appendChild(this.container_, headerDiv);
};


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
    var output = new alephscanner.OutputItem();
    output.insert(this.outputItemsPanel_);
    goog.array.insert(this.outputItems_, output);
};
  
  
alephscanner.OutputHolder.prototype.insert = function(container) {
    goog.dom.appendChild(container, this.container_);
};


alephscanner.OutputHolder.prototype.showResult = function(response) {
    this.outputTextArea_.innerHTML=response.list[0].join('\n');
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
    this.loader_.style.visibility = 'hidden';
};


alephscanner.OutputHolder.prototype.showLoader = function() {
    this.loader_.style.visibility = 'visible';
};