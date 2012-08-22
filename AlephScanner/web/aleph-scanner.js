
function removeDiv(div) {
    if (div) {
        div.parentNode.removeChild(div);
    }
}

function createJson() {
    var resultJson = {
        "base" : document.getElementById("base").options[document.getElementById("base").selectedIndex].value,
        "conditions" : createConditionsArrayJson(),
        "outputs" : createOutputsArrayJson(),
        "multiple" : document.getElementById("multiple-output").checked,
        "distinct" : document.getElementById("distinct").checked,
        "header" : document.getElementById("output_header").checked
    };
    return resultJson;
}


function createConditionsArrayJson() {
    var conditions = new Array();
    var conditionsDiv = document.getElementById("conditions");
    for(var i = 0; i < conditionsDiv.childNodes.length; i++ ) {
        var conditionContainer = conditionsDiv.childNodes[i];
        conditions[i] = createConditionJson(conditionContainer);
    }
    return conditions;
}


function createConditionJson(conditionContainer) {
    var field = conditionContainer.childNodes[2].value;
    var subfield = conditionContainer.childNodes[4].value;
    var negation = conditionContainer.childNodes[5].alt == "yes";
    var relation = conditionContainer.childNodes[6].options[conditionContainer.childNodes[6].selectedIndex].value;

    var expression = conditionContainer.childNodes[7].value;
    if(conditionContainer.childNodes[7].disabled) {
        expression = conditionContainer.childNodes[9].value.split('\n').join('@@');
    }

    var condition = {
        "field": field,
        "subfield": subfield,
        "negation": negation,
        "relation": relation,
        "expression": expression
    };
    return condition;
}


function createOutputsArrayJson() {
    var outputs = new Array();
    var outputsDiv = document.getElementById("outputs");
    for(var i = 0; i < outputsDiv.childNodes.length; i++ ) {
        var outputContainer = outputsDiv.childNodes[i];
        outputs[i] = createOutputJson(outputContainer);
    }
    return outputs;
}


function createOutputJson(outputContainer) {
    var leftSeparator = outputContainer.childNodes[1].value;
    var field = outputContainer.childNodes[3].value;
    var subfield = outputContainer.childNodes[5].value;
    var rightSeparator = outputContainer.childNodes[6].value;
    var multipleField = outputContainer.childNodes[7].checked;
    var type = outputContainer.childNodes[8].options[outputContainer.childNodes[8].selectedIndex].value;
    var insideSeparator = outputContainer.childNodes[9].value;
    var output = {
        "left_separator" : leftSeparator,
        "field": field,
        "subfield": subfield,
        "right_separator": rightSeparator,
        "multiple": multipleField,
        "type": type,
        "inside_separator": insideSeparator
    };
    return output;
}


function switchInputType(conditionContainer) {
    if(conditionContainer.childNodes[7].disabled) {
        conditionContainer.childNodes[7].disabled=false;
        conditionContainer.childNodes[8].src="right_arrow-icon.png";
        conditionContainer.removeChild(conditionContainer.childNodes[9]);
    } else {
        conditionContainer.childNodes[7].disabled=true;
        conditionContainer.childNodes[8].src="left_arrow-icon.png";
        var expressionTextArea = document.createElement('textarea');
        expressionTextArea.wrap="off";
        expressionTextArea.cols="58";
        expressionTextArea.rows="5";
        conditionContainer.appendChild(expressionTextArea);
    }
}


function switchNegation(conditionContainer) {
    if(conditionContainer.childNodes[5].alt == "no") {
        conditionContainer.childNodes[5].alt = "yes"
        conditionContainer.childNodes[5].src="minus-icon.png";
    } else {
        conditionContainer.childNodes[5].alt = "no"
        conditionContainer.childNodes[5].src="ok-icon.png";
    }
}





function addOutput(removable) {
    var outputsDiv = document.getElementById("outputs");
    var outputContainer = document.createElement('div');
    outputContainer.className = 'output-container'

    var removeButton = document.createElement('img');
    removeButton.addEventListener("click", function() {
        removeDiv(outputContainer);
    }, false);
    removeButton.src="delete-icon.png";
    //removeButton.appendChild(document.createTextNode("X"));
    if(!removable) {
        removeButton.disabled=true;
    }

    var LeftSeparatorInput = document.createElement('input');
    LeftSeparatorInput.type = "text";
    LeftSeparatorInput.size ="4";

    var fieldLabel = document.createElement('label');
    fieldLabel.appendChild(document.createTextNode(" Pole: "));
    var fieldInput = document.createElement('input');
    fieldInput.type = "text";
    fieldInput.size ="3";
    fieldInput.className = 'field';

    //var subfieldLabel= document.createElement('label');
    //subfieldLabel.appendChild(document.createTextNode(" $ "));
    
    var subfieldLabel= document.createElement('img');
    subfieldLabel.src="dollar-icon2.png";
    var subfieldInput = document.createElement('input');
    subfieldInput.type = "text";
    subfieldInput.size ="1";
    subfieldInput.className = 'field';

    var RightSeparatorInput = document.createElement('input');
    RightSeparatorInput.type = "text";
    RightSeparatorInput.size ="4";


    var typeSelect= document.createElement('select');
    var firstOption= document.createElement('option');
    firstOption.selected="selected";
    firstOption.value="first";
    firstOption.appendChild(document.createTextNode("První výskyt"));
    typeSelect.appendChild(firstOption);
    var singleOption= document.createElement('option');
    singleOption.value="single";
    singleOption.appendChild(document.createTextNode("V jednom sloupci"));
    typeSelect.appendChild(singleOption);
    var multiOption= document.createElement('option');
    multiOption.value="multi";
    multiOption.appendChild(document.createTextNode("Více sloupců"));
    typeSelect.appendChild(multiOption);


    var multipleFieldRadio = document.createElement('input');
    multipleFieldRadio.type = "radio";
    multipleFieldRadio.name = "group";

    var InsideSeparatorInput = document.createElement('input');
    InsideSeparatorInput.type = "text";
    InsideSeparatorInput.size ="4";

    outputContainer.appendChild(removeButton);
    outputContainer.appendChild(LeftSeparatorInput);
    outputContainer.appendChild(fieldLabel);
    outputContainer.appendChild(fieldInput);
    outputContainer.appendChild(subfieldLabel);
    outputContainer.appendChild(subfieldInput);
    outputContainer.appendChild(RightSeparatorInput);
    outputContainer.appendChild(multipleFieldRadio);
    outputContainer.appendChild(typeSelect);
    outputContainer.appendChild(InsideSeparatorInput);
    outputsDiv.appendChild(outputContainer);
}

function addCondition(removable) {
    var conditionsDiv = document.getElementById("conditions");
    var conditionContainer = document.createElement('div');
    conditionContainer.className = 'condition-container'

    var removeButton = document.createElement('img');
    removeButton.addEventListener("click", function() {
        removeDiv(conditionContainer);
    }, false);
    removeButton.src="delete-icon.png";
    //removeButton.appendChild(document.createTextNode("X"));
    if(!removable) {
        removeButton.disabled=true;
    }

    var fieldLabel = document.createElement('label');
    fieldLabel.appendChild(document.createTextNode("Pole:"));
    var fieldInput = document.createElement('input');
    fieldInput.type = "text";
    fieldInput.size ="3";
    fieldInput.className = 'field';

    //var subfieldLabel= document.createElement('label');
    //subfieldLabel.appendChild(document.createTextNode("$"));
    var subfieldLabel= document.createElement('img');
    subfieldLabel.src="dollar-icon2.png";    
    var subfieldInput = document.createElement('input');
    subfieldInput.type = "text";
    subfieldInput.size ="1";
    subfieldInput.className = 'field';


    //var negationLabel = document.createElement('label');
    //negationLabel.appendChild(document.createTextNode("!"));
    
    var negationLabel= document.createElement('img');
    negationLabel.src="ok-icon.png";    
    negationLabel.alt="no";
    negationLabel.addEventListener("click", function() {
        switchNegation(conditionContainer);
    }, false);

    var relationSelect= document.createElement('select');
    var equalsOption= document.createElement('option');
    equalsOption.selected="selected";
    equalsOption.value="equals";
    equalsOption.appendChild(document.createTextNode("Je rovno"));
    relationSelect.appendChild(equalsOption);
    var containsOption= document.createElement('option');
    containsOption.value="contains";
    containsOption.appendChild(document.createTextNode("Obsahuje"));
    relationSelect.appendChild(containsOption);
    var startsOption= document.createElement('option');
    startsOption.value="starts";
    startsOption.appendChild(document.createTextNode("Začíná na"));
    relationSelect.appendChild(startsOption);
    var endsOption= document.createElement('option');
    endsOption.value="ends";
    endsOption.appendChild(document.createTextNode("Končí na"));
    relationSelect.appendChild(endsOption);
    var existsOption= document.createElement('option');
    existsOption.value="exists";
    existsOption.appendChild(document.createTextNode("Existuje"));
    relationSelect.appendChild(existsOption);

    var regexOption= document.createElement('option');
    regexOption.value="regex";
    regexOption.appendChild(document.createTextNode("RegEx"));
    relationSelect.appendChild(regexOption);

    var expressionInput = document.createElement('input');
    expressionInput.type = "text";
    expressionInput.size="27";

    //var inputTypeButton = document.createElement('button');
    inputTypeButton = document.createElement('img');
    inputTypeButton.addEventListener("click", function() {
        switchInputType(conditionContainer);
    }, false);
    inputTypeButton.src="right_arrow-icon.png";
    //inputTypeButton.appendChild(document.createTextNode("->"));

    conditionContainer.appendChild(removeButton);
    conditionContainer.appendChild(fieldLabel);
    conditionContainer.appendChild(fieldInput);
    conditionContainer.appendChild(subfieldLabel);
    conditionContainer.appendChild(subfieldInput);
    conditionContainer.appendChild(negationLabel);
    conditionContainer.appendChild(relationSelect);
    conditionContainer.appendChild(expressionInput);
    conditionContainer.appendChild(inputTypeButton);
    conditionsDiv.appendChild(conditionContainer);
}

function getHttpRequest() {
    if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        return new XMLHttpRequest();
    }
}

function makeRequest() {
    document.getElementById("request_button").disabled=true;
    var server = "http://localhost:8080/";
    var url = server + "AlephScanner/Handle";
    //var server = "http://iris.mzk.cz:8080/";
    //var url = server + "AlephScanner2/Handle";

    var httpRequest = getHttpRequest();
    httpRequest.open("POST", url, true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //httpRequest.setRequestHeader("Content-length", params.length);
    httpRequest.setRequestHeader("Connection", "close");
    httpRequest.onreadystatechange= function () {
        showResults(httpRequest);
    } ;
    httpRequest.send(JSON.stringify(createJson()));
    document.getElementById('loader').style.visibility = 'visible';
}


function showResults(httpRequest) {
    document.getElementById('loader').style.visibility = 'hidden';
    if (httpRequest.readyState == 4) {
        if(httpRequest.status == 200) {
            //console.log(httpRequest.getAllResponseHeaders());
            //console.log(httpRequest.responseText);
            var newData = eval("(" + httpRequest.responseText + ")");
            //document.getElementById("output-box").innerHTML=newData.list.join("\n");
            console.log(newData.list);
            document.getElementById("output-box").innerHTML=newData.list[0].join('\n');
            document.getElementById("status").innerHTML= "Celkem: " + newData.count;
            document.getElementById("export_date").innerHTML= newData.export_date;
        }
        else {
    //alert("error");
    }
    }
    document.getElementById("request_button").disabled=false;
}




function downloadOutput() {
    var data = document.getElementById("output-box").value;
    location.href='data:application/download,' + encodeURIComponent(data);
}