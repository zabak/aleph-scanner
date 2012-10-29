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
    private String quantifier;
    private int quantity;
    private String indicator1;
    private String indicator2;
            
            
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

    /**
     * @return the quantifier
     */
    public String getQuantifier() {
        return quantifier;
    }

    /**
     * @param quantifier the quantifier to set
     */
    public void setQuantifier(String quantifier) {
        this.quantifier = quantifier;
    }

    /**
     * @return the quantity
     */
    public int getQuantity() {
        return quantity;
    }

    /**
     * @param quantity the quantity to set
     */
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    /**
     * @return the indicator1
     */
    public String getIndicator1() {
        return indicator1;
    }

    /**
     * @param indicator1 the indicator1 to set
     */
    public void setIndicator1(String indicator1) {
        this.indicator1 = indicator1;
    }

    /**
     * @return the indicator2
     */
    public String getIndicator2() {
        return indicator2;
    }

    /**
     * @param indicator2 the indicator2 to set
     */
    public void setIndicator2(String indicator2) {
        this.indicator2 = indicator2;
    }

}
