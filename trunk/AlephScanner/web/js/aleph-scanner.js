goog.provide('alephscanner.handler');
goog.provide('alephscanner.handler.main');


goog.require('alephscanner.ConditionsHolder');
goog.require('alephscanner.OutputHolder');
goog.require('alephscanner.RequestHandler');

alephscanner.handler.main = function() {
  var input = goog.dom.getElement('input-panel');
  var output = goog.dom.getElement('output-panel');
  var conditionsHolder = new alephscanner.ConditionsHolder();
  conditionsHolder.insert(input);
  
  var outputHolder = new alephscanner.OutputHolder();
  outputHolder.insert(output);  
  
  var url = "http://localhost:8080/AlephScanner/Handle"
  var requestHandler = new alephscanner.RequestHandler(conditionsHolder, outputHolder, url);
  
};

//goog.exportSymbol('main', alephscanner.handler.main);