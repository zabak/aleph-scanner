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
                <a href="https://dl.dropbox.com/u/9409661/aleph_assistant/AlephAssistant.crx">AlephAssistant</a>
            </div>
            <div id="header">
                <div id="logo">
                    <h1>Aleph Scanner</h1>                                        
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
            <div id="footer">
                Hanis' Playground<br/>
                Pre-alpha version
            </div>
        </div>
    </body>
</html>
