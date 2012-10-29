/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package cz.mzk.alephscanner.tools;

import cz.mzk.alephscanner.model.ConditionCF;
import cz.mzk.alephscanner.model.ConditionDF;
import cz.mzk.alephscanner.model.Output;
import cz.mzk.alephscanner.model.Request;
import cz.mzk.alephscanner.model.Response;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.dom4j.DocumentException;
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
        JSONArray conditionsArray = requestObject.getJSONArray("df_conditions");
        for (int i = 0; i < conditionsArray.length(); i++) {
            JSONObject conditionObject = (JSONObject) conditionsArray.get(i);
            ConditionDF condition = new ConditionDF();
            condition.setField(conditionObject.getString("field"));
            condition.setSubfield(conditionObject.getString("subfield"));
            String relation = conditionObject.getString("relation");
            if (relation.startsWith("not")) {
                condition.setRelation(relation.replaceFirst("not", ""));
                condition.setNegation(true);
            } else {
                condition.setRelation(relation);
                condition.setNegation(false);
            }
            condition.setIndicator1(conditionObject.getString("indicator1"));
            condition.setIndicator2(conditionObject.getString("indicator2"));
            condition.setExpression(conditionObject.getString("expression"));
            condition.setQuantifier(conditionObject.getString("quantifier"));
            condition.setQuantity(conditionObject.getInt("quantity"));
            request.addDataFieldCondition(condition);
        }
        JSONArray conditionsCFArray = requestObject.getJSONArray("cf_conditions");
        for (int i = 0; i < conditionsCFArray.length(); i++) {
            JSONObject conditionObject = (JSONObject) conditionsCFArray.get(i);
            ConditionCF condition = new ConditionCF();
            condition.setField(conditionObject.getString("field"));            
            String relation = conditionObject.getString("relation");
            if (relation.startsWith("not")) {
                condition.setRelation(relation.replaceFirst("not", ""));
                condition.setNegation(true);
            } else {
                condition.setRelation(relation);
                condition.setNegation(false);
            }
            condition.setFrom(conditionObject.getInt("from"));        
            condition.setTo(conditionObject.getInt("to")); 
            condition.setExpression(conditionObject.getString("expression"));
            request.addControlFieldCondition(condition);
        }


        JSONArray outputsArray = requestObject.getJSONArray("outputs");
        for (int i = 0; i < outputsArray.length(); i++) {
            JSONObject outputObject = (JSONObject) outputsArray.get(i);
            Output output = new Output();
            output.setField(outputObject.getString("field"));
            output.setSubfield(outputObject.getString("subfield"));
            output.setLeftSeparator(outputObject.getString("left_separator"));
            output.setRightSeparator(outputObject.getString("right_separator"));
            output.setType(outputObject.getString("type"));
            output.setInsideSeparator(outputObject.getString("inside_separator"));
            request.addOutput(output);
        }        
        request.setDistinct(requestObject.getBoolean("distinct"));
        request.setMode(requestObject.getString("result_mode"));
        request.setHeader(requestObject.getBoolean("header"));
        request.setNewExportName(requestObject.getString("new_export_name"));
        return request;
    }

    public static JSONObject getResponseJson(Response response) {
        JSONObject jsonObject = new JSONObject();
        JSONArray resultListArray = new JSONArray(response.getResultList());
        try {
            jsonObject.append("results", resultListArray);
            jsonObject.append("header", response.getRequest().writeOutputHeader());
            jsonObject.append("record_count", response.getMatchedRecordsCount());
            jsonObject.append("result_count", resultListArray.length());
            jsonObject.append("export_count", response.getAllRecordsCount());
            jsonObject.append("exception_count", response.getWrongRecordsCount());
            jsonObject.append("export_date", response.getDate());
            jsonObject.put("new_export", response.getRequest().getNewExportName());
        } catch (JSONException ex) {
            Logger.getLogger(JsonParser.class.getName()).log(Level.SEVERE, null, ex);
        }
        return jsonObject;
    }

    public static JSONObject getInitialData() {
        JSONObject jsonObject = new JSONObject();         
            try {
                jsonObject.put("basis", XmlParser.getExportNames());
            } catch (JSONException ex) {
                Logger.getLogger(JsonParser.class.getName()).log(Level.SEVERE, null, ex);  
            }
        return jsonObject;
    }
}
