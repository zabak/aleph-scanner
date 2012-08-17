/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package cz.mzk.alephscanner.model;

/**
 *
 * @author hanis
 */
public class Output {
    
    private String field;
    private String subfield;
    private String leftSeparator;
    private String rightSeparator;

    
    public Output() {
        
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

    
}
