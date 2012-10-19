goog.provide('alephscanner.OutputItem');

goog.require('goog.dom');
goog.require('goog.dom.xml');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.dom.classes');


alephscanner.OutputItem = function() {
    this.active_ = true;
    this.container_ = null;    
    this.leftSeparator_ = null;
    this.rightSeparator_ = null;
    //this.insideSeparator_ = null;
    this.field_ = null;    
    this.subfield_ = null;    

    this.createContainer_();    

};

alephscanner.OutputItem.prototype.removeContainer_ = function() {
    this.active_ = false;
    goog.dom.removeNode(this.container_);    
};



alephscanner.OutputItem.prototype.createContainer_ = function() {
    this.container_ = goog.dom.createDom("div", {
        'class' : 'output-item-container'
    });          
    this.createRemoveButton_();    
    this.createLeftSeparatorInput_();
    this.createLabel_("Pole:");
    this.createFieldInput_();
    this.createSubfieldInput_();
    this.createRightSeparatorInput_();        
};

alephscanner.OutputItem.prototype.createRemoveButton_ = function() {
    var removeButton = goog.dom.createDom('div',{
        "class" : 'remove-button image-button16'
    });
    goog.events.listen(removeButton, goog.events.EventType.CLICK, this.removeContainer_, false, this);
    goog.dom.appendChild(this.container_, removeButton);
};

alephscanner.OutputItem.prototype.createFieldInput_ = function() {
    var fieldAttributes = {
        //'type' : "text",
        'class' : "field-input"
    };  
    this.field_ = goog.dom.createDom("input", fieldAttributes);
    goog.dom.appendChild(this.container_, this.field_);
};


alephscanner.OutputItem.prototype.createLabel_ = function(caption) {
    var fieldAttributes = {
        'class' : "label"
    };  
    var label = goog.dom.createDom("label", fieldAttributes);   
    label.appendChild(document.createTextNode(caption));
    goog.dom.appendChild(this.container_, label);
};


alephscanner.OutputItem.prototype.createSubfieldInput_ = function() {
    var attributes = {
       // 'type' : "text",
        'class' : "subfield-input"
    };  
    this.subfield_ = goog.dom.createDom("input", attributes);
    goog.dom.appendChild(this.container_, this.subfield_);
};


alephscanner.OutputItem.prototype.createLeftSeparatorInput_ = function() {
    var attributes = {
     //   'type' : "text",
        'class' : "output-separator"
    };  
    this.leftSeparator_ = goog.dom.createDom("input", attributes);
    goog.dom.appendChild(this.container_, this.leftSeparator_);
};

alephscanner.OutputItem.prototype.createRightSeparatorInput_ = function() {
    var attributes = {
     //   'type' : "text",
        'class' : "output-separator"
    };  
    this.rightSeparator_ = goog.dom.createDom("input", attributes);
    goog.dom.appendChild(this.container_, this.rightSeparator_);
};




alephscanner.OutputItem.prototype.insert = function(container) {
    goog.dom.appendChild(container, this.container_);
};

alephscanner.OutputItem.prototype.setFieldValue = function(value) {
    this.field_.value = value;
}

alephscanner.OutputItem.prototype.getFieldValue = function() {
    return this.field_.value
}

alephscanner.OutputItem.prototype.setSubfieldValue = function(value) {
    this.subfield_.value = value;
}

alephscanner.OutputItem.prototype.getSubfieldValue = function() {
    return this.subfield_.value
}


alephscanner.OutputItem.prototype.setLeftSeparatorValue = function(value) {
    this.leftSeparator_.value = value;
}

alephscanner.OutputItem.prototype.getLeftSeparatorValue = function() {
    return this.leftSeparator_.value
}

alephscanner.OutputItem.prototype.setRightSeparatorValue = function(value) {
    this.rightSeparator_.value = value;
}

alephscanner.OutputItem.prototype.getRightSeparatorValue = function() {
    return this.rightSeparator_.value
}

alephscanner.OutputItem.prototype.isActive = function() {
    return this.active_;
};

alephscanner.OutputItem.prototype.getJsonObject = function() {
    var output = {
        "field":  this.getFieldValue(),
        "subfield": this.getSubfieldValue(),
        "left_separator" : this.getLeftSeparatorValue(),
        "right_separator" : this.getRightSeparatorValue(),
        "multiple": false,
        "type": 'first',
        "inside_separator": ''
    };
    return output;
};

