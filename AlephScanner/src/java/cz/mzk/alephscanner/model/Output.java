/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package cz.mzk.alephscanner.model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author hanis
 */
public class Output {
    
    public static final String TYPE_FIRST_ONLY = "first";
    public static final String TYPE_SINGLE_CELL = "single";
    public static final String TYPE_MULTI_CELL = "multi";
    public static final String TYPE_MULTI_ROW = "multiRow";    
   
    private Map<Integer, List<String>> data;
    
    private String field;
    private String subfield;
    private String leftSeparator;
    private String rightSeparator;
    private String insideSeparator;
    //private boolean multiple;
    private String type;
    
    private int recordCounter;
    private int dataCounter;
    
    
    private int maxOccurencies;
    
    public Output() {
        maxOccurencies = 0;
        recordCounter++;
        dataCounter++;
        data = new HashMap<Integer, List<String>>();
    }
    
    public void addData(int index, List<String> list) {
        this.data.put(index, list);
        if(list.size() > maxOccurencies) {
            maxOccurencies = list.size();
        }
    }
    
    public Map<Integer, List<String>> getData() {
        return data;
    }
    
    public List<String> getData(int index) {
        return data.get(index);
    }    

    
    public String write(int index) {
        return leftSeparator + writeData(index) + rightSeparator;
    }
    
    public String writeMultiRowCell(int index, int i) {
        return leftSeparator + getData(index).get(i) + rightSeparator;
    }    
    
    private String writeData(int index) {
        List<String> list = getData(index);
            if(TYPE_FIRST_ONLY.equals(getType())) {
                if(!list.isEmpty()) {
                    return list.get(0);
                } else {
                    return "";
                }
            }
            if(TYPE_SINGLE_CELL.equals(getType())) {
                StringBuilder sb = new StringBuilder();
                for (String string : list) {
                    sb.append(string).append(getInsideSeparator());
                }
                return sb.length() == 0 ? "" : sb.substring(0, sb.length() - getInsideSeparator().length());
            } 
            if(TYPE_MULTI_CELL.equals(getType())) {
                StringBuilder sb = new StringBuilder();
                for (String string : list) {
                    sb.append(string).append(getInsideSeparator());
                }                     
                String s = sb.length() == 0 ? "" : sb.substring(0, sb.length() - insideSeparator.length());
                int dif = getMaxOccurencies() - list.size();
                if(list.isEmpty()) {
                    dif--;
                }
                //System.out.println("inside separator: " + getInsideSeparator());
                //System.out.println("s: " + s);
                //System.out.println("dif: " + dif);
                
                for (int i = 0; i < dif; i++) {                 
                    s+=getInsideSeparator();
                }
                return s;
            }                                 
        return "";
    }
    
    
    /**
     * @return the field
     */
    public String getField() {
        return field;
    }

    /**
     * @param field the field to set
     */
    public void setField(String field) {
        this.field = field;
    }

    /**
     * @return the subfield
     */
    public String getSubfield() {
        return subfield;
    }

    /**
     * @param subfield the subfield to set
     */
    public void setSubfield(String subfield) {
        this.subfield = subfield;
    }

    /**
     * @return the separator
     */
    public String getLeftSeparator() {
        return leftSeparator;
    }

    /**
     * @param separator the separator to set
     */
    public void setLeftSeparator(String leftSeparator) {
        this.leftSeparator = leftSeparator;
    }

    /**
     * @return the rightSeparator
     */
    public String getRightSeparator() {
        return rightSeparator;
    }

    /**
     * @param rightSeparator the rightSeparator to set
     */
    public void setRightSeparator(String rightSeparator) {
        this.rightSeparator = rightSeparator;
    }

    /**
     * @return the multiple
     */
//    public boolean isMultiple() {
//        return multiple;
//    }
//
//    /**
//     * @param multiple the multiple to set
//     */
//    public void setMultiple(boolean multiple) {
//        this.multiple = multiple;
//    }

    /**
     * @return the type
     */
    public String getType() {
        return type;
    }

    /**
     * @param type the type to set
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * @return the maxOccurencies
     */
    public int getMaxOccurencies() {
        return maxOccurencies;
    }

    /**
     * @param maxOccurencies the maxOccurencies to set
     */
    public void setMaxOccurencies(int maxOccurencies) {
        this.maxOccurencies = maxOccurencies;
    }

    /**
     * @return the insideSeparator
     */
    public String getInsideSeparator() {
        return insideSeparator;
    }

    /**
     * @param insideSeparator the insideSeparator to set
     */
    public void setInsideSeparator(String insideSeparator) {
        this.insideSeparator = insideSeparator;
    }
    
    public String getHeader() {        
        String header = field;
        if(!subfield.isEmpty()) {
            header += "$" + subfield;
        }
        return header;
    }

    public boolean isMultirowOutput() {
        return TYPE_MULTI_ROW.equals(type);
    }
    
}
