goog.provide('alephscanner.InputCondition');

goog.require('goog.dom');
goog.require('goog.dom.xml');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.ui.ComboBox');
goog.require('goog.dom.classes');


alephscanner.InputCondition = function() {
    this.active_ = true;
    this.container_ = null;
    this.field_ = null;    
    this.subfield_ = null;    
    this.asInputList_ = false;
    this.negation_ = false;
    this.negationButton_ = null;
    this.relationSelect_ = null;
    this.expression_ = null;
    this.expressionList_ = null;
    this.inputTypeButton_ = null;
    this.createContainer_();    

};

alephscanner.InputCondition.prototype.removeContainer_ = function() {
    this.active_ = false;
    goog.dom.removeNode(this.container_);    
};


alephscanner.InputCondition.prototype.switchInputType_ = function() {
    if(this.asInputList_) {
        this.asInputList_ = false;
        goog.dom.classes.add(this.expressionList_, 'input-text-area-hidden');
        goog.dom.classes.remove(this.inputTypeButton_, 'list-type-button');
        goog.dom.classes.add(this.inputTypeButton_, 'value-type-button');
    } else {
        this.asInputList_ = true;
        goog.dom.classes.remove(this.expressionList_, 'input-text-area-hidden');
        goog.dom.classes.add(this.inputTypeButton_, 'list-type-button');
        goog.dom.classes.remove(this.inputTypeButton_, 'value-type-button');
    }    
};


alephscanner.InputCondition.prototype.changeNegation_ = function() {
    if(this.negation_) {        
        this.negation_ = false;
        this.negationButton_.style.backgroundImage = "url(ok-icon.png)";
    } else {
        this.negation_ = true;
        this.negationButton_.style.backgroundImage = "url(minus-icon.png)";
    }   
};

alephscanner.InputCondition.prototype.createContainer_ = function() {
    this.container_ = goog.dom.createDom("div", {
        'class' : 'input-condition-container'
    });          
    this.createRemoveButton_();
    this.createLabel_("Pole:");
    this.createFieldInput_();
    this.createSubfieldInput_();
    this.createNegationButton_();
    this.createRelationComboBox_();
    this.createExpressionInput_();
    this.createSwitchInputTypeButton_();
    this.createListInputTextArea_()  
};

alephscanner.InputCondition.prototype.createSwitchInputTypeButton_ = function() {
    this.inputTypeButton_ = goog.dom.createDom('div',{
        "class" : 'value-type-button image-button16'
    });
    goog.events.listen(this.inputTypeButton_, goog.events.EventType.CLICK, this.switchInputType_, false, this);
    goog.dom.appendChild(this.container_, this.inputTypeButton_);
};

alephscanner.InputCondition.prototype.createRemoveButton_ = function() {
    var removeButton = goog.dom.createDom('div',{
        "class" : 'remove-button image-button16'
    });
    goog.events.listen(removeButton, goog.events.EventType.CLICK, this.removeContainer_, false, this);
    goog.dom.appendChild(this.container_, removeButton);
};

alephscanner.InputCondition.prototype.createFieldInput_ = function() {
    var fieldAttributes = {
        'type' : "text",
        'class' : "field-input"
    };  
    this.field_ = goog.dom.createDom("input", fieldAttributes);
    goog.dom.appendChild(this.container_, this.field_);
};


alephscanner.InputCondition.prototype.createLabel_ = function(caption) {
    var fieldAttributes = {
        'class' : "label"
    };  
    var label = goog.dom.createDom("label", fieldAttributes);   
    label.appendChild(document.createTextNode(caption));
    goog.dom.appendChild(this.container_, label);
};


alephscanner.InputCondition.prototype.createSubfieldInput_ = function() {
    var fieldAttributes = {
        'type' : "text",
        'class' : "subfield-input"
    };  
    this.subfield_ = goog.dom.createDom("input", fieldAttributes);
    goog.dom.appendChild(this.container_, this.subfield_);
};


alephscanner.InputCondition.prototype.createNegationButton_ = function() {
    this.negationButton_ = goog.dom.createDom('div',{
        "class" : 'image-button16'
    });
    this.negationButton_.style.backgroundImage = "url(ok-icon.png)";
    goog.events.listen(this.negationButton_, goog.events.EventType.CLICK, this.changeNegation_, false, this);
    goog.dom.appendChild(this.container_, this.negationButton_);
};

alephscanner.InputCondition.prototype.createRelationComboBox_ = function() {
    this.relationSelect_ = goog.dom.createDom('select');
    var equalsOption = goog.dom.createDom('option', {
        'selected':'selected',
        'value':'equals'
    },"Je rovno");
    var containsOption = goog.dom.createDom('option', {
        'value':'contains'
    },"Obsahuje");
    var startsOption = goog.dom.createDom('option', {
        'value':'starts'
    },"Začíná na");
    var endsOption = goog.dom.createDom('option', {
        'value':'ends'
    },"Končí na");
    var existsOption = goog.dom.createDom('option', {
        'value':'exists'
    },"Existuje");    
    var regexOption = goog.dom.createDom('option', {
        'value':'regex'
    },"RegEx");
                
    this.relationSelect_.appendChild(equalsOption);
    this.relationSelect_.appendChild(containsOption);
    this.relationSelect_.appendChild(startsOption);
    this.relationSelect_.appendChild(endsOption);
    this.relationSelect_.appendChild(existsOption);
    this.relationSelect_.appendChild(regexOption);        
    //goog.events.listen(this.negationButton_, goog.events.EventType.CHANGE, this.changeNegation_, false, this);
    goog.dom.appendChild(this.container_, this.relationSelect_);
};

alephscanner.InputCondition.prototype.createExpressionInput_ = function() {
    var attributes = {
        'type' : "text",
        'class' : "expression-input"
    };  
    this.expression_ = goog.dom.createDom("input", attributes);
    goog.dom.appendChild(this.container_, this.expression_);
};


alephscanner.InputCondition.prototype.createListInputTextArea_ = function() {
    var attributes = {
        'wrap' : "off",
        'class' : "input-text-area input-text-area-hidden"
        
    };  
    this.expressionList_ = goog.dom.createDom("textarea", attributes);
    goog.dom.appendChild(this.container_, this.expressionList_);
};



alephscanner.InputCondition.prototype.insert = function(container) {
    goog.dom.appendChild(container, this.container_);
};

alephscanner.InputCondition.prototype.setFieldValue = function(value) {
    this.field_.value = vaule;
};

alephscanner.InputCondition.prototype.getFieldValue = function() {
    return this.field_.value
};

alephscanner.InputCondition.prototype.setSubfieldValue = function(value) {
    this.subfield_.value = vaule;
};
                                      
alephscanner.InputCondition.prototype.getSubfieldValue = function() {
    return this.subfield_.value
};

alephscanner.InputCondition.prototype.getRelationValue = function() {
    return this.relationSelect_.options[this.relationSelect_.selectedIndex].value;
};

alephscanner.InputCondition.prototype.isActive = function() {
    return this.active_;
};

alephscanner.InputCondition.prototype.getExpressionValue = function() {
    if(this.asInputList_) {
        return this.expressionList_.value;
    } else {
        return this.expression_.value;
    }
};


alephscanner.InputCondition.prototype.getJsonObject = function() {
    var condition = {
        "field":  this.getFieldValue(),
        "subfield": this.getSubfieldValue(),
        "negation": this.negation_,
        "relation": this.getRelationValue(),
        "expression": this.getExpressionValue()
    };
    return condition;
};