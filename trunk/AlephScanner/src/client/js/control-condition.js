goog.provide('alephscanner.ControlCondition');

goog.require('goog.dom');
goog.require('goog.dom.xml');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.ui.ComboBox');
goog.require('goog.dom.classes');
goog.require('goog.ui.ComboBox');


alephscanner.ControlCondition = function() {
    this.active_ = true;
    this.container_ = null;
    this.field_ = null;  
    this.letterFrom_ = null;  
    this.letterTo_ = null;    
    this.relationSelect_ = null;
    this.expression_ = null;
    this.createContainer_();    
};

alephscanner.ControlCondition.prototype.removeContainer_ = function() {
    this.active_ = false;
    goog.dom.removeNode(this.container_);    
};

alephscanner.ControlCondition.prototype.createContainer_ = function() {
    this.container_ = goog.dom.createDom("div", {
        'class' : 'input-condition-container'
    });           
    
    var noExpressionContainer = goog.dom.createDom("div", {'class' : 'no-expression-container'});    
    goog.dom.appendChild(this.container_, noExpressionContainer);
    
    goog.dom.appendChild(noExpressionContainer, this.createRemoveButton_());
    goog.dom.appendChild(noExpressionContainer, this.createFieldInput_());
    goog.dom.appendChild(noExpressionContainer, this.createLetterRange_());
    goog.dom.appendChild(noExpressionContainer, this.createRelationComboBox_());
    goog.dom.appendChild(this.container_, this.createExpressionInput_());
};


alephscanner.ControlCondition.prototype.createRemoveButton_ = function() {
    var removeButton = goog.dom.createDom('div',{
        "class" : 'remove-button image-button16'
    });
    goog.events.listen(removeButton, goog.events.EventType.CLICK, this.removeContainer_, false, this);
    return removeButton;
};

alephscanner.ControlCondition.prototype.createFieldInput_ = function() {
    var fieldInput = goog.dom.createDom("span")
    var fieldLabel = goog.dom.createDom("label", {'class' : "label"}, "Kontrolní pole");    
    this.field_ = goog.dom.createDom("input", { 'class' : "field-input"});
    goog.dom.appendChild(fieldInput, fieldLabel);    
    goog.dom.appendChild(fieldInput, this.field_);  
    return fieldInput;
};


alephscanner.ControlCondition.prototype.createLetterRange_ = function() {
    var letterRange = goog.dom.createDom("span");    
    var fromLabel = goog.dom.createDom("label", {'class' : "label"}, " znaky od");    
    var toLabel = goog.dom.createDom("label", {'class' : "label"}, "do");            
    this.letterFrom_ = goog.dom.createDom("input", {'class' : "range-input"});
    this.letterTo_ = goog.dom.createDom("input", {'class' : "range-input"});
    goog.dom.appendChild(letterRange, fromLabel);   
    goog.dom.appendChild(letterRange, this.letterFrom_);    
    goog.dom.appendChild(letterRange, toLabel);   
    goog.dom.appendChild(letterRange, this.letterTo_);
    return letterRange;    
};


alephscanner.ControlCondition.prototype.createRelationComboBox_ = function() {
    this.relationSelect_ = goog.dom.createDom('select');
    var equalsOption = goog.dom.createDom('option', {
        'selected':'selected',
        'value':'equals'
    },"Jsou rovny");
    var notEqualsOption = goog.dom.createDom('option', {
        'value':'notequals'
    },"Nejsou rovny");
    var regexOption = goog.dom.createDom('option', {
        'value':'regex'
    },"RegEx");
    var negRegexOption = goog.dom.createDom('option', {
        'value':'notregex'
    },"NegRegEx");                                   
    this.relationSelect_.appendChild(equalsOption);    
    this.relationSelect_.appendChild(notEqualsOption);     
    this.relationSelect_.appendChild(regexOption);   
    this.relationSelect_.appendChild(negRegexOption);        
    return this.relationSelect_;
};


alephscanner.ControlCondition.prototype.createExpressionInput_ = function() {    
    this.expression_ = goog.dom.createDom("input", {"class" : "expression-cf-input"});
    var expressionContainer = goog.dom.createDom("span", {'class' : "expression-container"}, this.expression_);
    return expressionContainer;
};


alephscanner.ControlCondition.prototype.insert = function(container) {
    goog.dom.appendChild(container, this.container_);
};

alephscanner.ControlCondition.prototype.setFieldValue = function(value) {
    this.field_.value = value;
};

alephscanner.ControlCondition.prototype.getFieldValue = function() {
    return this.field_.value
};

alephscanner.ControlCondition.prototype.setLetterFromValue = function(value) {
    this.letterFrom_.value = value;
};

alephscanner.ControlCondition.prototype.getLetterFromValue = function() {
    return this.letterFrom_.value
};

alephscanner.ControlCondition.prototype.setLetterToValue = function(value) {
    this.letterTo_.value = value;
};

alephscanner.ControlCondition.prototype.getLetterToValue = function() {
    return this.letterTo_.value
};


alephscanner.ControlCondition.prototype.getRelationValue = function() {
    return this.relationSelect_.options[this.relationSelect_.selectedIndex].value;
};

alephscanner.ControlCondition.prototype.setRelationValue = function(value) {
    this.relationSelect_.value = value;
};



alephscanner.ControlCondition.prototype.isActive = function() {
    return this.active_;
};

alephscanner.ControlCondition.prototype.getExpressionValue = function() {
        expression = this.expression_.value;    
    return expression.split('\n').join('@@');    
};

alephscanner.ControlCondition.prototype.setExpressionValue = function(value) {
    this.expression_.value = value.split('@@').join('\n');    
};


alephscanner.ControlCondition.prototype.getJsonObject = function() {
    var condition = {
        "field":  this.getFieldValue(),
        "from":  this.getLetterFromValue(),
        "to":  this.getLetterToValue(),
        "relation": this.getRelationValue(),
        "expression" : this.getExpressionValue()
    };
    return condition;
};


alephscanner.ControlCondition.prototype.setAllValues = function(data) {
    this.setFieldValue(data.field);
    this.setLetterFromValue(data.from);
    this.setLetterToValue(data.to);
    this.setRelationValue(data.relation);    
    this.setExpressionValue(data.expression);  
};