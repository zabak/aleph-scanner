/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package cz.mzk.alephscanner;

import cz.mzk.alephscanner.model.Condition;
import cz.mzk.alephscanner.model.ConditionCF;
import cz.mzk.alephscanner.model.ConditionDF;
import cz.mzk.alephscanner.model.Output;
import cz.mzk.alephscanner.model.Request;
import cz.mzk.alephscanner.model.Response;
import cz.mzk.alephscanner.tools.PropertiesReader;
import cz.mzk.alephscanner.tools.XmlParser;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.PatternSyntaxException;
import org.dom4j.DocumentException;
import org.marc4j.MarcException;
import org.marc4j.MarcPermissiveStreamReader;
import org.marc4j.MarcReader;
import org.marc4j.MarcWriter;
import org.marc4j.marc.ControlField;
import org.marc4j.marc.DataField;
import org.marc4j.marc.Record;
import org.marc4j.marc.Subfield;

/**
 * 8
 *
 * @author hanis
 */
public class RequestHandler {

    public static Response getResponse(Request request) {        
        Response response = new Response();
        response.setRequest(request);        
        InputStream in = null;
        OutputStream os = null;
        int allRecordscounter = 0;
        int exceptionCounter = 0;
        int matchedRecordsCounter = 0;        
        try {
            in = new FileInputStream(request.getExportPath());
            MarcReader reader = new MarcPermissiveStreamReader(in, true, true, "UTF-8");
            
            MarcWriter writer = null;
            if(request.createNewExport()) {
                String path = PropertiesReader.getInstance().getTemporaryExportDirectory() + request.getNewExportName() + ".m21";
                os = new FileOutputStream(path);            
                writer = new org.marc4j.MarcStreamWriter(os, "UTF-8");
            }
            while (reader.hasNext()) {
                allRecordscounter++;
                try {
                    Record record = reader.next();
                    boolean check = true;
                    for (ConditionDF condition : request.getDataFiledConditions()) {
                        if (!checkDataFieldCondition(record, condition)) {
                            check = false;
                            break;
                        }
                    }
                    if (!check) {
                        continue;
                    }
                    for (ConditionCF condition : request.getControlFieldConditions()) {
                        if (!checkControlFieldCondition(record, condition)) {
                            check = false;
                            break;
                        }
                    }
                    if (!check) {
                        continue;
                    }
                    for (Output output : request.getOutputs()) {
                        List<String> list = getMultipleOutputs(record, output);
                        output.addData(matchedRecordsCounter, list);
                    }
                    if(request.createNewExport()) {
                        writer.write(record);
                    }
                    
                    matchedRecordsCounter++;
                } catch (MarcException e) {
                    exceptionCounter++;
                } catch (Exception e) {
                    Logger.getLogger(RequestHandler.class.getName()).log(Level.SEVERE, null, e);
                }
            }
        } catch (FileNotFoundException ex) {
            Logger.getLogger(RequestHandler.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            try {
                if(request.createNewExport()) {
                    os.close();
                }            
                in.close();
            } catch (IOException ex) {
                Logger.getLogger(RequestHandler.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        try {
            if(request.createNewExport()) {
                XmlParser.addNewExport(request.getNewExportName());
            }
        } catch (DocumentException ex) {
            Logger.getLogger(RequestHandler.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(RequestHandler.class.getName()).log(Level.SEVERE, null, ex);
        }
        response.setMatchedRecordsCount(matchedRecordsCounter);
        response.setAllRecordsCount(allRecordscounter);
        response.setWrongRecordsCount(exceptionCounter);
        return response;
    }
    

    private static List<String> getMultipleOutputs(Record record, Output output) {
        List<String> list = new ArrayList<String>();
        if (output.getSubfield().isEmpty()) {
            if (!output.getField().isEmpty()) {
                ControlField cField = (ControlField) record.getVariableField(output.getField());
                if (cField != null) {
                    list.add(cField.getData());
                }
            }
        } else {
            List outDataFields = record.getVariableFields(output.getField());
            for (Object object : outDataFields) {
                DataField outDataField = (DataField) object;
                if (outDataField != null) {
                    Subfield outDataSubfield = outDataField.getSubfield(output.getSubfield().charAt(0));
                    if (outDataSubfield != null) {
                        list.add(outDataSubfield.getData());
                    }
                }
            }
        }
        return list;
    }

    private static boolean checkDataFieldCondition(Record record, ConditionDF condition) {
        List outDataFields = record.getVariableFields(condition.getField());
        int correct = 0;
        int all = 0;
        for (Object object : outDataFields) {
            DataField outDataField = (DataField) object;
            if (outDataField != null) {
                Subfield outDataSubfield = outDataField.getSubfield(condition.getSubfield().charAt(0));
                if (outDataSubfield != null) {
                    all++;
                    if ("exists".equals(condition.getRelation())){
                        if(!condition.isNegation()) {
                            correct++;                   
                        }
                    } else if (checkSingleDataSubfield(condition, outDataSubfield.getData())) {
                        correct++;                        
                    } 
                }
            }
        }        
        if(condition.getQuantifier().equals(Condition.AT_LEAST_ONE)) {
            return correct > 0 ;
        } else if(condition.getQuantifier().equals(Condition.ALL)) {
            return correct == all;
        } else if(condition.getQuantifier().equals(Condition.EXACTLY)) {
            return correct == condition.getQuantity();
        } else if(condition.getQuantifier().equals(Condition.LESS_THAN)) {
            return correct < condition.getQuantity();
        } else if(condition.getQuantifier().equals(Condition.MORE_THAN)) {
            return correct > condition.getQuantity();
        }
        return false;        
    }

    private static boolean checkControlFieldCondition(Record record, ConditionCF condition) {
        ControlField cField = (ControlField) record.getVariableField(condition.getField());
        if (cField != null) {
            String content = cField.getData();
            if (content.length() >= condition.getTo()) {
                return checkSingleDataSubfield(condition, content.substring(condition.getFrom(), condition.getTo() + 1));
            }
        }
        return false;
    }

    private static boolean checkSingleDataSubfield(Condition condition, String content) {
        StringTokenizer st = new StringTokenizer(condition.getExpression(), "@@");
        boolean match = false;
        while (st.hasMoreTokens()) {
            String singleExpression = st.nextToken();
            if ("starts".equals(condition.getRelation())) {
                match = content.startsWith(singleExpression);
            } else if ("ends".equals(condition.getRelation())) {
                match = content.endsWith(singleExpression);
            } else if ("contains".equals(condition.getRelation())) {
                match = content.contains(singleExpression);
            } else if ("equals".equals(condition.getRelation())) {
                match = content.equals(singleExpression);
            } else if ("regex".equals(condition.getRelation())) {
                try {
                    match = content.matches(singleExpression);
                } catch (PatternSyntaxException ex) {
                    //TODO: warn user 
                    return false;
                }
            }
            if (match) {
                return !condition.isNegation();
            }
        }        
        return condition.isNegation();
    }
}
