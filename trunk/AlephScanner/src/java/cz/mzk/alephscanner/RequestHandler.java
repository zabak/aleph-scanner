/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package cz.mzk.alephscanner;

import cz.mzk.alephscanner.model.Condition;
import cz.mzk.alephscanner.model.Output;
import cz.mzk.alephscanner.model.Request;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.StringTokenizer;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.marc4j.MarcException;
import org.marc4j.MarcPermissiveStreamReader;
import org.marc4j.MarcReader;
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

    public static List<String> getResult(Request request) {

        List<String> resultList = new ArrayList<String>();
        InputStream in = null;
        int i = 0;
        int j = 0;
        int k = 0;
        try {
            //in = new FileInputStream("/home/hanis/projects/marc4j/" + request.getBase() + ".m21");
            in = new FileInputStream("/home/hanis/prace/alephScanner/" + request.getBase() + ".m21");
            //in = new FileInputStream("/home/tomcat/" + base + ".m21");
            MarcReader reader = new MarcPermissiveStreamReader(in, true, true, "UTF-8");
            while (reader.hasNext()) {
                i++;
                try {
                    Record record = reader.next();
                    boolean check = true;
                    for (Condition condition : request.getConditions()) {
                        if (!checkCondition(record, condition)) {
                            check = false;
                            break;
                        }
                    }
                    if(!check) {
                        continue;
                    }

                    /*
                     ControlField cField = (ControlField) record.getVariableField("001");
                     if (cField == null) {
                     continue;
                     }
                     */
                    k++;
                    /*
                     if (request.isMultipleFiledOutput()) {
                     List<String> outputs = getMultipleOutputs(record, outField, outSubfield);
                     for (String string : outputs) {
                     String line = cField.getData() + separator
                     + string;
                     sysnoList.add(line);
                     }
                     } else {
                     String line = cField.getData() + separator
                     + getOutput(record, outField, outSubfield)
                     + separator2
                     + getOutput(record, outField2, outSubfield2);
                     sysnoList.add(line);
                     }
                     */
                    String line = "";
                    for (Output output : request.getOutputs()) {
                        line += getOutput(record, output);
                    }
                    resultList.add(line);




                } catch (MarcException e) {
                    j++;
                } catch (Exception e) {
                   Logger.getLogger(RequestHandler.class.getName()).log(Level.SEVERE, null, e);
                }
            }
        } catch (FileNotFoundException ex) {
            Logger.getLogger(RequestHandler.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            try {
                in.close();
            } catch (IOException ex) {
                Logger.getLogger(RequestHandler.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        System.out.println(i + ", " + j + ", " + k);
        
        if(request.isDistinct()) {
            Set hs = new HashSet();
            hs.addAll(resultList);
            resultList.clear();
            resultList.addAll(hs);
        }
        return resultList;
    }

    
    
    
    
    public static String getOutput(Record record, Output output) {
        String outputString = output.getLeftSeparator();
        if (!output.getField().isEmpty()) {
            if (output.getSubfield().isEmpty()) {
                ControlField cField = (ControlField) record.getVariableField(output.getField());
                if (cField != null) {
                    outputString += cField.getData();
                }
            } else {
                DataField outDataField = (DataField) record.getVariableField(output.getField());
                if (outDataField != null) {
                    Subfield outDataSubfield = outDataField.getSubfield(output.getSubfield().charAt(0));
                    if (outDataSubfield != null) {
                        outputString += outDataSubfield.getData();
                    }
                }
            }
        }
        return outputString + output.getRightSeparator();
    }

    public static List<String> getMultipleOutputs(Record record, String outField, String outSubfield) {
        List<String> list = new ArrayList<String>();
        List outDataFields = record.getVariableFields(outField);
        for (Object object : outDataFields) {
            DataField outDataField = (DataField) object;
            if (outDataField != null) {
                Subfield outDataSubfield = outDataField.getSubfield(outSubfield.charAt(0));
                if (outDataSubfield != null) {
                    list.add(outDataSubfield.getData());
                }
            }
        }
        return list;
    }

    public static boolean checkCondition(Record record, Condition condition) {
        String content = null;
        if (condition.getSubfield() == null || condition.getSubfield().isEmpty()) {
            ControlField cField = (ControlField) record.getVariableField(condition.getField());
            if (cField != null) {
                content = cField.getData();
            }
        } else {
            DataField dataField = (DataField) record.getVariableField(condition.getField());
            if (dataField != null) {
                Subfield dataSubfield = dataField.getSubfield(condition.getSubfield().charAt(0));
                if (dataSubfield != null) {
                    content = dataSubfield.getData();
                }
            }
        }
        if (content != null) {
            if ("exists".equals(condition.getRelation())) {
                return !condition.isNegation();
            }
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
                }
                if (match) {
                    return !condition.isNegation();
                }
            }
        }
        return condition.isNegation();
    }

    public static void main(String[] args) {
    }
}
