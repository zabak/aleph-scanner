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
    
    
    public static final String AT_LEAST_ONE = "ex";
    public static final String ALL = "all";
    public static final String LESS_THAN = "lt";
    public static final String MORE_THAN = "gt";
    public static final String EXACTLY = "eq";
    
    
    
    private boolean negation;
    private String relation;
    private String expression;  
    
    public Condition() {
        
    }

    /**
     * @return the negation
     */
    public boolean isNegation() {
        return negation;
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
