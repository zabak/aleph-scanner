/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package cz.mzk.alephscanner.model;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author hanis
 */
public class Request {

    private String base;
    private List<Condition> conditions;
    private List<Output> outputs;
    private boolean multipleFiledOutput;
    private boolean distinct;
    private boolean header;

    public Request() {
        this.conditions = new ArrayList<Condition>();
        this.outputs = new ArrayList<Output>();
    }

    /**
     * @return the base
     */
    public String getBase() {
        return base;
    }

    /**
     * @param base the base to set
     */
    public void setBase(String base) {
        this.base = base;
    }

    /**
     * @return the conditions
     */
    public List<Condition> getConditions() {
        return conditions;
    }

    /**
     * @param conditions the conditions to set
     */
    public void setConditions(List<Condition> conditions) {
        this.conditions = conditions;
    }

    public void addCondition(Condition condition) {
        this.conditions.add(condition);
    }

    /**
     * @return the outputs
     */
    public List<Output> getOutputs() {
        return outputs;
    }

    /**
     * @param outputs the outputs to set
     */
    public void setOutputs(List<Output> outputs) {
        this.outputs = outputs;
    }

    public void addOutput(Output output) {
        this.outputs.add(output);
    }

    /**
     * @return the multipleFiledOutput
     */
    public boolean isMultipleFiledOutput() {
        return multipleFiledOutput;
    }

    /**
     * @param multipleFiledOutput the multipleFiledOutput to set
     */
    public void setMultipleFiledOutput(boolean multipleFiledOutput) {
        this.multipleFiledOutput = multipleFiledOutput;
    }

    /**
     * @return the distinct
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * @param distinct the distinct to set
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public Output getMultipleOutput() {
        for (Output output : outputs) {
            if (output.isMultiple()) {
                return output;
            }
        }
        return null;
    }

    public String writeOutputHeader() {
        StringBuilder sb = new StringBuilder();
        for (Output output : outputs) {
            sb.append(output.getLeftSeparator());
            if (!output.isMultiple() && Output.TYPE_MULTI_CELL.equals(output.getType())) {
                for (int i = 0; i < output.getMaxOccurencies(); i++) {
                    sb.append(output.getHeader()).append("[").append(i+1).append("]");
                    if(output.getMaxOccurencies()- i > 1) { 
                        sb.append(output.getInsideSeparator());
                    }
                }                
            } else {
                sb.append(output.getHeader());
            }
            sb.append(output.getRightSeparator());
        }
        return sb.toString();
    }

    /**
     * @return the header
     */
    public boolean isHeader() {
        return header;
    }

    /**
     * @param header the header to set
     */
    public void setHeader(boolean header) {
        this.header = header;
    }
}
