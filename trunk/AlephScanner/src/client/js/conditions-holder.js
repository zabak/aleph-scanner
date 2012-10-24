goog.provide('alephscanner.ConditionsHolder');

goog.require('alephscanner.InputCondition');


alephscanner.ConditionsHolder = function() {
    this.conditions_ = []; 
    this.container_ = null;
    this.baseChooser_ = null; 
    this.conditionsList_ = null;
    this.searchButton_ = null;
    this.createContainer_();              
};

alephscanner.ConditionsHolder.prototype.createContainer_ = function() {    
    this.container_ = goog.dom.createDom("div", {
        'class' : 'input'
    });          
    this.createBaseChooser_();    
    this.createConditionList_();
    this.createControllPanel_();
    
    this.addConditionDF_();

};


alephscanner.ConditionsHolder.prototype.createConditionList_ = function() {
    this.conditionsList_ = goog.dom.createDom("div", {
        'class' : 'conditions'
    });              
    goog.dom.appendChild(this.container_, this.conditionsList_);
};


alephscanner.ConditionsHolder.prototype.createControllPanel_ = function() {
    var controllPanelDiv = goog.dom.createDom("div", {
        'class' : 'input-controll-panel'
    });  
   
    var addDataFieldButton = goog.dom.createDom('div',{
        "class" : 'image-button16 add-df-button'
    });
    goog.events.listen(addDataFieldButton, goog.events.EventType.CLICK, this.addConditionDF_, false, this);
    goog.dom.appendChild(controllPanelDiv, addDataFieldButton);
    
    var addControlFieldButton = goog.dom.createDom('div',{
        "class" : 'image-button16 add-cf-button'
    });
    //goog.events.listen(addDataFieldButton, goog.events.EventType.CLICK, this.removeContainer_, false, this);
    goog.dom.appendChild(controllPanelDiv, addControlFieldButton);

    this.searchButton_ = goog.dom.createDom('div',{
        "class" : 'search-button'
    });
    //goog.events.listen(addDataFieldButton, goog.events.EventType.CLICK, this.removeContainer_, false, this);
    goog.dom.appendChild(controllPanelDiv, this.searchButton_);      
                   
    goog.dom.appendChild(this.container_, controllPanelDiv);
};


alephscanner.ConditionsHolder.prototype.setBasis_ = function(basis) {    
    goog.array.forEach(basis,
        function(base) {
            var baseOption = goog.dom.createDom('option', {
                'value' : base
            },base);
            this.baseChooser_.appendChild(baseOption);                       
        }, this);
};



alephscanner.ConditionsHolder.prototype.createBaseChooser_ = function() {
    var baseDiv = goog.dom.createDom("div", {
        'class' : 'base-chooser'
    });  

    var label = goog.dom.createDom("label", {
        'class' : 'label'
    });       
    label.appendChild(document.createTextNode("Báze: "));
    goog.dom.appendChild(baseDiv, label);    
    

    this.baseChooser_ = goog.dom.createDom('select');    
    goog.dom.appendChild(baseDiv, this.baseChooser_);
    goog.dom.appendChild(this.container_, baseDiv);
};

alephscanner.ConditionsHolder.prototype.addConditionDF_ = function() {  
    var inputCondition = new alephscanner.InputCondition();    
    inputCondition.insert(this.conditionsList_);    
    goog.array.insert(this.conditions_, inputCondition);
};
  
  
alephscanner.ConditionsHolder.prototype.insert = function(container) {
    goog.dom.appendChild(container, this.container_);
};  


alephscanner.ConditionsHolder.prototype.getConditionSpecArray = function() {
    var conditions = [];
    goog.array.forEach(this.conditions_,
        function(condition) {
            if(condition.isActive()) {
                goog.array.insert(conditions, condition.getJsonObject());
            }
        });
    return conditions;   
};  

alephscanner.ConditionsHolder.prototype.getBaseValue = function() {
    return this.baseChooser_.options[this.baseChooser_.selectedIndex].value;
};  

alephscanner.ConditionsHolder.prototype.getSearchButton = function() {
    return this.searchButton_;
};  


