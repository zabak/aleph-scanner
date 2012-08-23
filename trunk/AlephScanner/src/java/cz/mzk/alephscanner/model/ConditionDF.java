/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package cz.mzk.alephscanner.model;

/**
 *
 * @author hanis
 */
public class ConditionDF extends Condition {
    
    private String field;
    private String subfield;
            
            
    public ConditionDF() {
        
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

}
