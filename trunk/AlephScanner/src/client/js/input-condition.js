goog.provide('alephscanner.InputCondition');

goog.require('goog.dom');
goog.require('goog.dom.xml');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.ui.ComboBox');
goog.require('goog.dom.classes');
goog.require('goog.ui.ComboBox');


alephscanner.InputCondition = function() {
    this.active_ = true;
    this.container_ = null;
    this.quantifierSelect_ = null;
    this.quantitySelect_ = null;
    this.field_ = null;  
    this.fieldLabel_ = null;
    this.subfield_ = null;    
    this.indicator1_ = null;
    this.indicator2_ = null;
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


    
    var noExpressionContainer = goog.dom.createDom("div", {'class' : 'no-expression-container'});    
    goog.dom.appendChild(this.container_, noExpressionContainer);
    
    goog.dom.appendChild(noExpressionContainer, this.createRemoveButton_());
    goog.dom.appendChild(noExpressionContainer, this.createQuantifierComboBox_());
    goog.dom.appendChild(noExpressionContainer, this.createQuantityComboBox_());
    goog.dom.appendChild(noExpressionContainer, this.createFieldBox_());
    goog.dom.appendChild(noExpressionContainer, this.createRelationComboBox_());
    goog.dom.appendChild(noExpressionContainer, this.createSwitchInputTypeButton_());  
    
    goog.dom.appendChild(this.container_, this.createExpressionInput_());    
        
    goog.dom.appendChild(this.container_, this.createListInputTextArea_());  
  //  this.createListInputTextArea_()  
};

alephscanner.InputCondition.prototype.createSwitchInputTypeButton_ = function() {
    this.inputTypeButton_ = goog.dom.createDom('div',{
        "class" : 'value-type-button image-button16'
    });
    goog.events.listen(this.inputTypeButton_, goog.events.EventType.CLICK, this.switchInputType_, false, this);
    return this.inputTypeButton_;
};

alephscanner.InputCondition.prototype.createRemoveButton_ = function() {
    var removeButton = goog.dom.createDom('div',{
        "class" : 'remove-button image-button16'
    });
    goog.events.listen(removeButton, goog.events.EventType.CLICK, this.removeContainer_, false, this);
    return removeButton;
};


alephscanner.InputCondition.prototype.createFieldBox_ = function() {
    var fieldBox = goog.dom.createDom("span");
    this.fieldLabel_ = goog.dom.createDom("label", {'class' : "label"}, "Pole");   
    this.field_ = goog.dom.createDom("input", {'class' : "field-input"});
    var dollar = goog.dom.createDom('div',{
        "class" : 'dollar-icon image-button16'
    });
    this.subfield_ = goog.dom.createDom("input", {'class' : "subfield-input"});
    
    
    this.indicator1_ = this.createIndicatorComboBox_();
    this.indicator2_ = this.createIndicatorComboBox_();
    goog.dom.appendChild(fieldBox, this.fieldLabel_);
    goog.dom.appendChild(fieldBox, this.field_);
    goog.dom.appendChild(fieldBox, dollar);
    goog.dom.appendChild(fieldBox, this.subfield_);
    goog.dom.appendChild(fieldBox, this.indicator1_);
    goog.dom.appendChild(fieldBox, this.indicator2_);
    return fieldBox;
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
    var notEqualsOption = goog.dom.createDom('option', {
        'value':'notequals'
    },"Není rovno");
    var notContainsOption = goog.dom.createDom('option', {
        'value':'notcontains'
    },"Neobsahuje");
    var notStartsOption = goog.dom.createDom('option', {
        'value':'notstarts'
    },"Nezačíná na");
    var notEndsOption = goog.dom.createDom('option', {
        'value':'notends'
    },"Nekončí na");    
    var notExistsOption = goog.dom.createDom('option', {
        'value':'notexists'
    },"Neexistuje"); 
    var regexOption = goog.dom.createDom('option', {
        'value':'regex'
    },"RegEx");
    var negRegexOption = goog.dom.createDom('option', {
        'value':'notregex'
    },"NegRegEx");
                    
                
    this.relationSelect_.appendChild(equalsOption);
    this.relationSelect_.appendChild(containsOption);
    this.relationSelect_.appendChild(startsOption);
    this.relationSelect_.appendChild(endsOption);
    this.relationSelect_.appendChild(existsOption);
    
    this.relationSelect_.appendChild(notEqualsOption);
    this.relationSelect_.appendChild(notContainsOption);
    this.relationSelect_.appendChild(notStartsOption);
    this.relationSelect_.appendChild(notEndsOption);
    this.relationSelect_.appendChild(notExistsOption);    
    
    this.relationSelect_.appendChild(regexOption);   
        this.relationSelect_.appendChild(negRegexOption);        

    return this.relationSelect_;
};


alephscanner.InputCondition.prototype.createQuantifierComboBox_ = function() {
    this.quantifierSelect_ = goog.dom.createDom('select');
    var exOption = goog.dom.createDom('option', {
        'selected':'selected',
        'value':'ex'
    },"Alespoň jedno");
    var allOption = goog.dom.createDom('option', {
        'value':'all'
    },"Všechna");
    var gtOption = goog.dom.createDom('option', {
        'value':'gt'
    },"Více než");
    var ltOption = goog.dom.createDom('option', {
        'value':'lt'
    },"Méně než");
    var eqOption = goog.dom.createDom('option', {
        'value':'eq'
    },"Právě");    

    this.quantifierSelect_.appendChild(exOption);
    this.quantifierSelect_.appendChild(allOption);
    this.quantifierSelect_.appendChild(gtOption);
    this.quantifierSelect_.appendChild(ltOption);
    this.quantifierSelect_.appendChild(eqOption);
    goog.events.listen(this.quantifierSelect_, goog.events.EventType.CHANGE, this.onQuantifierChange_, false, this);
    return this.quantifierSelect_;
};


alephscanner.InputCondition.prototype.createQuantityComboBox_ = function() {
    this.quantitySelect_ = goog.dom.createDom('select', {'class' : 'quantity-selector-hidden'});
    this.quantitySelect_.appendChild(new goog.dom.createDom('option', {
        'value':'0'
    },"0"));
    this.quantitySelect_.appendChild(new goog.dom.createDom('option', {
        'value':'1',
        'selected':'selected'
    },"1"));
    this.quantitySelect_.appendChild(new goog.dom.createDom('option', {
        'value':'2'
    },"2"));
    this.quantitySelect_.appendChild(new goog.dom.createDom('option', {
        'value':'3'
    },"3"));
    this.quantitySelect_.appendChild(new goog.dom.createDom('option', {
        'value':'4'
    },"4"));
    this.quantitySelect_.appendChild(new goog.dom.createDom('option', {
        'value':'5'
    },"5"));
    this.quantitySelect_.appendChild(new goog.dom.createDom('option', {
        'value':'6'
    },"6"));
    this.quantitySelect_.appendChild(new goog.dom.createDom('option', {
        'value':'7'
    },"7"));
    this.quantitySelect_.appendChild(new goog.dom.createDom('option', {
        'value':'8'
    },"8"));
    this.quantitySelect_.appendChild(new goog.dom.createDom('option', {
        'value':'9'
    },"9"));

    goog.events.listen(this.quantitySelect_, goog.events.EventType.CHANGE, this.onQuantityChange_, false, this);
    return this.quantitySelect_;
};


alephscanner.InputCondition.prototype.createIndicatorComboBox_ = function() {
    var indicatorSelect = goog.dom.createDom('select');

    indicatorSelect.appendChild(new goog.dom.createDom('option', {
        'value':'any',
        'selected':'selected'
    },"-"));
    indicatorSelect.appendChild(new goog.dom.createDom('option', {
        'value':' '
    },"#"));    
    for (var i = 0; i < 10; i++) {
        indicatorSelect.appendChild(new goog.dom.createDom('option', {
            'value':''+i
        },""+i));        
    }    
    return indicatorSelect;
};









alephscanner.InputCondition.prototype.createExpressionInput_ = function() { 
    this.expression_ = goog.dom.createDom("input", {"class" : "expression-input"});
    var expressionContainer = goog.dom.createDom("span", {'class' : "expression-container"}, this.expression_);
    return expressionContainer;
};


alephscanner.InputCondition.prototype.createListInputTextArea_ = function() {
    var attributes = {
        'wrap' : "off",
        'class' : "input-text-area input-text-area-hidden"        
    };  
    this.expressionList_ = goog.dom.createDom("textarea", attributes);
    return this.expressionList_;
};


alephscanner.InputCondition.prototype.insert = function(container) {
    goog.dom.appendChild(container, this.container_);
};

alephscanner.InputCondition.prototype.setFieldValue = function(value) {
    this.field_.value = value;
};

alephscanner.InputCondition.prototype.getFieldValue = function() {
    return this.field_.value
};

alephscanner.InputCondition.prototype.setSubfieldValue = function(value) {
    this.subfield_.value = value;
};
                                      
alephscanner.InputCondition.prototype.getSubfieldValue = function() {
    return this.subfield_.value
};

alephscanner.InputCondition.prototype.getRelationValue = function() {
    return this.relationSelect_.options[this.relationSelect_.selectedIndex].value;
};

alephscanner.InputCondition.prototype.setRelationValue = function(value) {
    this.relationSelect_.value = value;
};

alephscanner.InputCondition.prototype.getQuantifierValue = function() {
    return this.quantifierSelect_.options[this.quantifierSelect_.selectedIndex].value;
};

alephscanner.InputCondition.prototype.setQuantifierValue = function(value) {
    this.quantifierSelect_.value = value;
};

alephscanner.InputCondition.prototype.getQuantityValue = function() {
    return parseInt(this.quantitySelect_.options[this.quantitySelect_.selectedIndex].value);
};

alephscanner.InputCondition.prototype.setQuantityValue = function(value) {
    this.quantitySelect_.value = value;
};

alephscanner.InputCondition.prototype.getIndicator1Value = function() {
    return this.indicator1_.options[this.indicator1_.selectedIndex].value;
};

alephscanner.InputCondition.prototype.setIndicator1Value = function(value) {
    this.indicator1_.value = value;
};

alephscanner.InputCondition.prototype.getIndicator2Value = function() {
    return this.indicator2_.options[this.indicator2_.selectedIndex].value;
};

alephscanner.InputCondition.prototype.setIndicator2Value = function(value) {
    this.indicator2_.value = value;
};




alephscanner.InputCondition.prototype.isActive = function() {
    return this.active_;
};

alephscanner.InputCondition.prototype.getExpressionValue = function() {
    var expression;
    if(this.asInputList_) {
        expression = this.expressionList_.value;
    } else {
        expression = this.expression_.value;
    }
    return expression.split('\n').join('@@');    
};


alephscanner.InputCondition.prototype.setExpressionValue = function(value) {
    if(this.asInputList_) {
        this.expressionList_.value = value.split('@@').join('\n');
    } else {
        this.expression_.value = value;
    }
};





alephscanner.InputCondition.prototype.getJsonObject = function() {
    var condition = {
        "field":  this.getFieldValue(),
        "subfield": this.getSubfieldValue(),      
        "indicator1": this.getIndicator1Value(),
        "indicator2": this.getIndicator2Value(),
        "negation": this.negation_,
        "relation": this.getRelationValue(),
        "expression" : this.getExpressionValue(),
        "quantifier" : this.getQuantifierValue(),   
        "quantity" : this.getQuantityValue()
    };
    return condition;
};





alephscanner.InputCondition.prototype.onQuantifierChange_ = function() {
    var q = this.getQuantifierValue();
    if(q == 'all' || q == 'ex') {
        goog.dom.classes.add(this.quantitySelect_, 'quantity-selector-hidden');
        this.setFiledLabelValue_("pole");    
    } else {
        goog.dom.classes.remove(this.quantitySelect_, 'quantity-selector-hidden');
        this.onQuantityChange_();
    }
}

alephscanner.InputCondition.prototype.onQuantityChange_ = function() {
    var q = this.getQuantityValue();
    if(q > 4) {
        this.setFiledLabelValue_("polí");    
    } else {
        this.setFiledLabelValue_("pole");    
    }
};

alephscanner.InputCondition.prototype.setFiledLabelValue_ = function(value) {
    goog.dom.removeChildren(this.fieldLabel_);
    this.fieldLabel_.appendChild(document.createTextNode(value));
};

alephscanner.InputCondition.prototype.setAllValues = function(data) {
    this.setFieldValue(data.field);
    this.setSubfieldValue(data.subfield);
    this.setRelationValue(data.relation);
    this.setQuantifierValue(data.quantifier);    
    this.setQuantityValue(data.quantity);
    this.setIndicator1Value(data.indicator1);
    this.setIndicator2Value(data.indicator2);
    if (data.expression.indexOf("@@") != -1 && !this.asInputList_) {
        this.switchInputType_();            
    }
    this.setExpressionValue(data.expression);    
};