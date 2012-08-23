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
        <title>Aleph Scanner</title>
        <link rel="stylesheet" type="text/css" href="style.css" media="screen" />
        <script src="aleph-scanner.js"></script>
    </head>
    <body onload="addCondition(true);">
        <div id="wrapper">

            <div id="menu">
                <span>Posledni aktualizace dat: </span><span id="export_date"></span>
                <span><a href="http://code.google.com/p/aleph-scanner/">Vývoj</a></span>
                <a href="https://chrome.google.com/webstore/detail/iokpaflegjgfiohcpdaggbfnlpmndmel">AlephAssistant</a>
            </div>
            <div id="header">
                <div id="logo">
                    <h1>Aleph Scanner</h1>Pre-alpha version
                </div>
                <!--<div id="logo-img"><img src="http://www.mzk.cz/sites/mzk.cz/themes/mzk/logo.png"/></div>-->
                <div id="logo-img"><img src="mzk-logo.png"/></div>
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
                    <img alt="" src="add-icon.png"  onclick="addCondition(true)"/>
                    <img alt="" src="control-icon.png"  onclick="addConditionCF(true)"/>
                    <img style="float: right" src="find-icon.png" onclick="makeRequest();" id="request_button"/>


                </div>
                <div id="output">

                    <div class="output_header">
                        <label>Distinct </label>
                        <input id="distinct" type="checkbox" />
                        <label> OP </label>
                        <input id="multiple-output" type="checkbox" />
                        <label> Header </label>
                        <input id="output_header" type="checkbox" />
                    </div>

                    <div id="outputs"></div>
                    <img alt="" src="add-icon.png"  onclick="addOutput(true)"/>

                    <div>
                    <div id="loader"><img src="loader.gif"></div>

                    <textarea id="output-box" readonly wrap="off" name="output" cols="60" rows="30">
                    </textarea>  
                </div>
                    <div id="status"></div>
                    <img src="export-icon.png"  onclick ="downloadOutput();"/>
                </div>
                <div style="clear: both"></div>
            </div>
            <div id="footer">
                ©2012. Developed by <a href="http://www.mzk.cz">MZK</a>
            </div>
        </div>
    </body>
</html>
