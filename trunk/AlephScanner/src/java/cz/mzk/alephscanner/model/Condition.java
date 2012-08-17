/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package cz.mzk.alephscanner.model;

/**
 *
 * @author hanis
 */
public class Condition {
    
    private String field;
    private String subfield;
    private boolean negation;
    private String relation;
    private String expression;
            
            
    public Condition() {
        
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
     * @return the negation
     */
    public boolean isNegation() {
        return negation;
    }

    
    public void setNegationFromString(String negationString) {
        if("true".equals(negationString)) {
            this.negation = true;
        } else {
            this.negation = false;
        }
    }    
    
    /**
     * @param negation the negation to set
     */
    public void setNegation(boolean negation) {
        this.negation = negation;
    }

    /**
     * @return the relation
     */
    public String getRelation() {
        return relation;
    }

    /**
     * @param relation the relation to set
     */
    public void setRelation(String relation) {
        this.relation = relation;
    }

    /**
     * @return the expression
     */
    public String getExpression() {
        return expression;
    }

    /**
     * @param expression the expression to set
     */
    public void setExpression(String expression) {
        this.expression = expression;
    }
    
}
