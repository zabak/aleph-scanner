<%-- 
    Document   : index
    Created on : Aug 14, 2012, 1:15:48 PM
    Author     : hanis
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>ALEPH SCANNER</title>
        <style type="text/css">

            * {
                margin: 0;
                padding: 0;
            }

            body {
                background: #eaeaea;
                font-size: 11.5pt;
                color: #5A6466;
            }

            body,input {
                font-family: Kreon, serif;
            }

            #footer {
                padding: 50px 0 80px 0;
                text-align: center;
                text-shadow: 1px 1px 0px rgba(255,255,255,0.7);
                color: #587477;
            }


            #header {
                height: 60px;
                padding: 40px;
                position: relative;
            }

  

            #logo {
                position: absolute;
                top: 50px;
                left: 40px;
                height: 60px;

            }

            #loader {
                position: absolute;
                top: 230px;
                left: 215px;
                height: 100px;
                visibility: hidden;
            }            

            #logo-img {
                position: absolute;
                top: 30px;
                right: 10px;
                height: 60px;
            }            

            #logo h1 {
                font-family: "Open Sans", sans-serif;
                font-size: 3em;
            }



            #page {
                paddin-bottom: 20px;
                padding-top: 20px;

                width: 1000px;
                color: #587477;
            }

            #input {
                position: relative;
                float: left;
                width: 490px;                
                padding-left: 5px;
                padding-right: 5px;
                background: #EEF5F6;
                margin: 0 0 0 0;
            }

            #output {
                position: relative;
                float: left;
                width: 490px;
                padding-left: 5px;
                padding-right: 5px;  
                background: #EEF5F6;
                margin: 0 0 0 0;
            }


            #wrapper {
                width: 1020px;
                position: relative;
                background: #FFF;
                margin: 0 auto 0 auto;
                box-shadow: 0px 0px 150px 0px rgba(0,0,0,0.15);
                border: solid 1px #82A7AD;
                border-top: 0;
            }    

            .input_header {
                height: 30px;
            }
            .output_header {
                height: 26px;
            }


       #menu {
    width: 1000px;
    padding-top: 3px; padding-right: 10px; padding-bottom: 0px; padding-left: 10px;
    text-align: left;
    font-size: 16px;
    background-color: #444;
    color: #c1d5d4;
}

#export_date {
    color: #eee;
}

 

#menu a {
    float: right;
    text-decoration: none;
    color: #c1d5d4;
    padding-right: 10px;
}


        </style>

        <script type="text/javascript">           
            
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
                    "distinct" : document.getElementById("distinct").checked
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
                var negation = conditionContainer.childNodes[6].checked; 
                var relation = conditionContainer.childNodes[7].options[conditionContainer.childNodes[7].selectedIndex].value;            

                var expression = conditionContainer.childNodes[8].value;
                if(conditionContainer.childNodes[8].disabled) {
                    expression = conditionContainer.childNodes[10].value.split('\n').join('@@');
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
                if(conditionContainer.childNodes[8].disabled) {
                    conditionContainer.childNodes[8].disabled=false;
                    conditionContainer.childNodes[9].innerHTML="->";
                    conditionContainer.removeChild(conditionContainer.childNodes[10]);
                } else {        
                    conditionContainer.childNodes[8].disabled=true;
                    conditionContainer.childNodes[9].innerHTML="<-";
                    var expressionTextArea = document.createElement('textarea');  
                    expressionTextArea.wrap="off";
                    expressionTextArea.cols="50";
                    expressionTextArea.rows="5";       
                    conditionContainer.appendChild(expressionTextArea);
                }    
            }               
            
            
            
            function addOutput(removable) {
                var outputsDiv = document.getElementById("outputs");
                var outputContainer = document.createElement('div');
                outputContainer.className = 'output-container'
                
                var removeButton = document.createElement('button');    
                removeButton.addEventListener("click", function() {removeDiv(outputContainer);}, false); 
                removeButton.appendChild(document.createTextNode("X"));
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
                
                var subfieldLabel= document.createElement('label');
                subfieldLabel.appendChild(document.createTextNode(" $ "));  
                var subfieldInput = document.createElement('input');                
                subfieldInput.type = "text"; 
                subfieldInput.size ="1";
                
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
                
                var removeButton = document.createElement('button');    
                removeButton.addEventListener("click", function() {removeDiv(conditionContainer);}, false); 
                removeButton.appendChild(document.createTextNode("X"));
                if(!removable) {
                    removeButton.disabled=true;
                }
                  
                var fieldLabel = document.createElement('label');
                fieldLabel.appendChild(document.createTextNode(" Pole: "));   
                var fieldInput = document.createElement('input');
                fieldInput.type = "text";
                fieldInput.size ="3";
                
                var subfieldLabel= document.createElement('label');
                subfieldLabel.appendChild(document.createTextNode(" $ "));  
                var subfieldInput = document.createElement('input');                
                subfieldInput.type = "text"; 
                subfieldInput.size ="1";
                
                
                var negationLabel = document.createElement('label');                        
                negationLabel.appendChild(document.createTextNode(" !")); 
                
                var negationCheck = document.createElement('input');
                negationCheck.type = "checkbox";
 
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
                
                var expressionInput = document.createElement('input');
                input.type = "text";
                input.size = "20";
                               
                var inputTypeButton = document.createElement('button');
                inputTypeButton.addEventListener("click", function() {
                    switchInputType(conditionContainer);
                    
                }, false); 
                inputTypeButton.appendChild(document.createTextNode("->"));                                 
                                               
                conditionContainer.appendChild(removeButton);
                conditionContainer.appendChild(fieldLabel);
                conditionContainer.appendChild(fieldInput);
                conditionContainer.appendChild(subfieldLabel);
                conditionContainer.appendChild(subfieldInput);  
                conditionContainer.appendChild(negationLabel);  
                conditionContainer.appendChild(negationCheck);  
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
                httpRequest.onreadystatechange= function () {showResults(httpRequest); } ;
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
                            
                            
                
            
        </script>


    </head>
    <body onload="addCondition(true);">
        <div id="wrapper">


            <div id="menu">
<span>Posledni aktualizace dat: </span><span id="export_date"></span>
<span><a href="http://code.google.com/p/aleph-scanner/">Vývoj</a></span>
                <a href="https://dl.dropbox.com/u/9409661/aleph_assistant/AlephAssistant.crx">AlephAssistant</a>
            </div>
            <div id="header">
                <div id="logo">
                    <h1>Aleph Scanner</h1>                                        
                </div>
                <div id="logo-img"><img src="http://www.mzk.cz/sites/mzk.cz/themes/mzk/logo.png"/></div>
            </div>
            <div id="page">
                <div id="input">
                    <div class="input_header">
                        <label>Báze: </label>
                        <select id="base" name="base">
                            <option value="mzk01">MZK01</option>
                            <option value="mzk03" selected="selected">MZK03</option>
                        </select>
                    </div>
                    <div id="conditions"></div>
                    <button  onclick="addCondition(true)" >+</button>      
                    <button style="float: right" onclick="makeRequest();" id="request_button"> <b>VYHLEDAT</b> </button>


                </div>
                <div id="output">
                                        
                    
                   <label>Distinct </label>
                   <input id="distinct" type="checkbox" /> 
                   <label> OP </label>
                   <input id="multiple-output" type="checkbox" /> 
                        
                    <div id="outputs"></div>
                    <button  onclick="addOutput(true)">+</button>    

                    <div id="loader"><img src="loader.gif"></div>

                    <textarea id="output-box" readonly wrap="off" name="output" cols="60" rows="35">
                    </textarea>            
                    <div id="status"></div>
                </div>
                <div style="clear: both"></div>
            </div>

            <div id="footer">Hanis' Playground</div>

        </div>
    </body>
</html>
