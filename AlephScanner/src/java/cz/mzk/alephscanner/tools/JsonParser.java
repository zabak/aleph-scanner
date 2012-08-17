/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package cz.mzk.alephscanner.tools;

import cz.mzk.alephscanner.model.Condition;
import cz.mzk.alephscanner.model.Output;
import cz.mzk.alephscanner.model.Request;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author hanis
 */
public class JsonParser {
    
    
    public static Request getRequestObject(String json) throws JSONException {
        Request request = new Request();
        
        JSONObject requestObject = new JSONObject(json);
        request.setBase(requestObject.getString("base"));
        JSONArray conditionsArray = requestObject.getJSONArray("conditions");
        for (int i = 0; i < conditionsArray.length(); i++) {
            JSONObject conditionObject = (JSONObject) conditionsArray.get(i);
            Condition condition = new Condition();
            condition.setField(conditionObject.getString("field"));
            condition.setSubfield(conditionObject.getString("subfield"));
            condition.setNegation(conditionObject.getBoolean("negation"));
            condition.setRelation(conditionObject.getString("relation"));
            condition.setExpression(conditionObject.getString("expression"));            
            request.addCondition(condition);
        }   
        JSONArray outputsArray = requestObject.getJSONArray("outputs");
        for (int i = 0; i < outputsArray.length(); i++) {
            JSONObject outputObject = (JSONObject) outputsArray.get(i);
            Output output = new Output();
            output.setField(outputObject.getString("field"));
            output.setSubfield(outputObject.getString("subfield"));
            output.setLeftSeparator(outputObject.getString("left_separator"));
            output.setRightSeparator(outputObject.getString("right_separator"));
            request.addOutput(output);
        }   
        
        request.setMultipleFiledOutput(requestObject.getBoolean("multiple"));
        request.setDistinct(requestObject.getBoolean("distinct"));
        return request;
    }

}
