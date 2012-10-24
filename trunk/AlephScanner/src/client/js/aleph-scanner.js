goog.provide('alephscanner.handler');
goog.provide('alephscanner.handler.main');


goog.require('alephscanner.ConditionsHolder');
goog.require('alephscanner.OutputHolder');
goog.require('alephscanner.RequestHandler');

alephscanner.handler.main = function() {
  var url = "Handle";
  var requestHandler = new alephscanner.RequestHandler(url);
  
};

//goog.exportSymbol('main', alephscanner.handler.main);