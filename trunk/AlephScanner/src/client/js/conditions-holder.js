goog.provide('alephscanner.ConditionsHolder');

goog.require('alephscanner.InputCondition');
goog.require('alephscanner.ControlCondition');
goog.require('goog.ui.Dialog');

alephscanner.ConditionsHolder = function(requestHandler) {
    this.requestHandler_ = requestHandler;
    this.conditions_ = []; 
    this.conditionsCF_ = []; 
    this.container_ = null;
    this.baseChooser_ = null; 
    this.conditionsList_ = null;  
    this.jsonDialog_ = null;  
    this.createContainer_();
    this.removeDialog_ = null;
    
};


alephscanner.ConditionsHolder.prototype.removeAllConditions = function() {
    goog.dom.removeChildren(this.conditionsList_);
    this.conditions_ = []; 
    this.conditionsCF_ = []; 
};



alephscanner.ConditionsHolder.prototype.createContainer_ = function() {    
    this.container_ = goog.dom.createDom("div", {
        'class' : 'input'
    });          
    this.createBaseChooser_();    
    this.createConditionList_();
    this.createControllPanel_();    
    this.addConditionDF();

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
    goog.events.listen(addDataFieldButton, goog.events.EventType.CLICK, this.addConditionDF, false, this);
    goog.dom.appendChild(controllPanelDiv, addDataFieldButton);
    
    var addControlFieldButton = goog.dom.createDom('div',{
        "class" : 'image-button16 add-cf-button'
    });
    goog.events.listen(addControlFieldButton, goog.events.EventType.CLICK, this.addConditionCF_, false, this);
    goog.dom.appendChild(controllPanelDiv, addControlFieldButton);

    var searchButton = goog.dom.createDom('div',{
        "class" : 'search-button'
    });
    goog.events.listen(searchButton, goog.events.EventType.CLICK, 
        this.requestHandler_.handleRequest, false, this.requestHandler_);
    goog.dom.appendChild(controllPanelDiv, searchButton);      
                   
    goog.dom.appendChild(this.container_, controllPanelDiv);
};


alephscanner.ConditionsHolder.prototype.setBasis_ = function(basis) {
    goog.dom.removeChildren(this.baseChooser_);
    goog.array.forEach(basis,
        function(base) {
            var baseOption = goog.dom.createDom('option', {
                'value' : base
            },base);
            this.baseChooser_.appendChild(baseOption);                       
        }, this);
};

alephscanner.ConditionsHolder.prototype.addNewBase = function(base) {       
    var baseOption = goog.dom.createDom('option', {
        'value' : base
    }, base);
    baseOption.selected="selected";
    this.baseChooser_.appendChild(baseOption);                              
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



    var createExportButton = goog.dom.createDom('div',{
        "class" : 'create-export-button'
    });

    var removeExportButton = goog.dom.createDom('div',{
        "class" : 'remove-export-button'
    });

    goog.events.listen(createExportButton, goog.events.EventType.CLICK, this.onCreateExport_, false, this);
    goog.events.listen(removeExportButton, goog.events.EventType.CLICK, this.onRemoveExport_, false, this);

    var InportButton = goog.dom.createDom('div',{
        "class" : 'import-button'
    });
    goog.events.listen(InportButton, goog.events.EventType.CLICK, this.showInputDialog_, false, this);
    
    var showJsonButton = goog.dom.createDom('div',{
        "class" : 'show-json-button'
    });
    goog.events.listen(showJsonButton, goog.events.EventType.CLICK, this.showJsonDialog_, false, this);    

    goog.dom.appendChild(baseDiv, label);
    goog.dom.appendChild(baseDiv, this.baseChooser_)
    goog.dom.appendChild(baseDiv, InportButton);
    goog.dom.appendChild(baseDiv, showJsonButton);

    goog.dom.appendChild(baseDiv, removeExportButton);
    goog.dom.appendChild(baseDiv, createExportButton);
    goog.dom.appendChild(this.container_, baseDiv);
};

alephscanner.ConditionsHolder.prototype.addConditionDF = function() {  
    var inputCondition = new alephscanner.InputCondition();    
    inputCondition.insert(this.conditionsList_);    
    goog.array.insert(this.conditions_, inputCondition); 
};

alephscanner.ConditionsHolder.prototype.importConditionsDF = function(data) {  
    var inputCondition = new alephscanner.InputCondition();    
    inputCondition.insert(this.conditionsList_);    
    goog.array.insert(this.conditions_, inputCondition);
    inputCondition.setAllValues(data);
};

alephscanner.ConditionsHolder.prototype.importConditionsCF = function(data) {  
    var controlCondition = new alephscanner.ControlCondition();    
    controlCondition.insert(this.conditionsList_);    
    goog.array.insert(this.conditionsCF_, controlCondition);
    controlCondition.setAllValues(data);
};



alephscanner.ConditionsHolder.prototype.addConditionCF_ = function() {  
    var controlCondition = new alephscanner.ControlCondition();    
    controlCondition.insert(this.conditionsList_);    
    goog.array.insert(this.conditionsCF_, controlCondition);
};


alephscanner.ConditionsHolder.prototype.onCreateExport_ = function() {  
    this.requestHandler_.handleRequestWithNewExport();                
};

alephscanner.ConditionsHolder.prototype.onRemoveExport_ = function() {  
    //this.requestHandler_.handleRequestWithNewExport();
    var context = this;
    var base = this.getBaseValue();
    if(this.removeDialog_ == null) {
        this.removeDialog_ = new goog.ui.Dialog();
    }
    this.removeDialog_.setContent('<h3>Smazání exportu ' + base + '</h3>' +
        '</br>Zadejte kód: <input type="password" name="remove-export-pass" id="remove-export-pass"></input>');
    this.removeDialog_.setTitle('Smazat export');
    this.removeDialog_.setButtonSet(goog.ui.Dialog.ButtonSet.OK_CANCEL);
    goog.events.listenOnce(this.removeDialog_, goog.ui.Dialog.EventType.SELECT, function(e) {
        if(e.key == 'ok') {
            var pass = goog.dom.getElement('remove-export-pass').value;
            //context.requestHandler_.setAllFromImport(data);
            console.log(pass + " , " + base);
            if(pass == 'mzkmzk') {
                context.requestHandler_.removeExport(base);
            } else {
                context.requestHandler_.showWarningDialog("Chyba", "Nesprávný kód", "Byl zadán nesprávný kód.");
            }

        }
    });
    
    this.removeDialog_.setVisible(true);
    
    
};

alephscanner.ConditionsHolder.prototype.setBaseValue = function(value) {    
    this.baseChooser_.value = value;
};


alephscanner.ConditionsHolder.prototype.showInputDialog_ = function() {  
    var context = this;
    this.myDialog_ = new goog.ui.Dialog();
    dialog.setContent('<h2>Zadejte importní JSON</h2>' +
        '<textarea id="import-area" style="height: 500px;width: 600px;margin: 0px;"></textarea>');
    dialog.setTitle('Import');
    dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK_CANCEL);
    goog.events.listen(dialog, goog.ui.Dialog.EventType.SELECT, function(e) {
        if(e.key == 'ok') {
            var data = goog.json.parse(goog.dom.getElement('import-area').value);
            context.requestHandler_.setAllFromImport(data);
            console.log(data);
        }
    });
    dialog.setVisible(true);
};


alephscanner.ConditionsHolder.prototype.showJsonDialog_ = function() {  
    if(!this.jsonDialog_) {
        this.jsonDialog_= new goog.ui.Dialog();
        this.jsonDialog_.setContent('<h2>JSON export</h2>' +
            '<textarea id="export-text-area" readonly style="height: 500px;width: 600px;margin: 0px;"></textarea>');
        this.jsonDialog_.setTitle('Export');
        this.jsonDialog_.setButtonSet(goog.ui.Dialog.ButtonSet.OK); 
    }          
    this.jsonDialog_.setVisible(true);
    //console.log(goog.json.serialize(this.requestHandler_.createJsonObject_()));
    goog.dom.getElement("export-text-area").innerHTML=goog.json.serialize(this.requestHandler_.createJsonObject_());    
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

alephscanner.ConditionsHolder.prototype.getConditionCFSpecArray = function() {
    var conditions = [];
    goog.array.forEach(this.conditionsCF_,
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


