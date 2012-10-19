/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package cz.mzk.alephscanner.model;

import cz.mzk.alephscanner.tools.Tools;
import java.util.ArrayList;
import java.util.List;
import java.util.SortedSet;
import java.util.TreeSet;

/**
 *
 * @author hanis
 */
public class Response {
       
    private Request request;
    private int allRecordsCount;
    private int wrongRecordsCount;
    private int matchedRecordsCount;
    
    
    public Response() {
        
    }
    
    
    
    public List<String> getResultList() {    
        List<String> resultList = new ArrayList<String>();    
        for (int i = 0; i < matchedRecordsCount; i++) {
            if (request.isMultipleFiledOutput()) {
                int count = request.getMultipleOutput().getData(i).size();
                for (int k = 0; k < count; k++) {
                    String line = "";
                    for (Output output : request.getOutputs()) {
                        if (output.isMultiple()) {
                            line += output.getData(i).get(k);
                        } else {
                            line += output.write(i);
                        }
                    }
                    resultList.add(line);
                }
            } else {
                String line = "";
                for (Output output : request.getOutputs()) {
                    line += output.write(i);
                }
                resultList.add(line);
            }
        }
        if (request.isHeader()) {
            resultList.add(0, request.writeOutputHeader());
        }
        if (request.isDistinct()) {
            SortedSet hs = new TreeSet();
            hs.addAll(resultList);
            resultList.clear();
            resultList.addAll(hs);
        }    
    return resultList;
    }
    
    
    
    

    /**
     * @return the request
     */
    public Request getRequest() {
        return request;
    }

    /**
     * @param request the request to set
     */
    public void setRequest(Request request) {
        this.request = request;
    }

    /**
     * @return the date
     */
    public String getDate() {
        return Tools.getFileLastModifiedDate(request.getExportPath());
    }

    /**
     * @return the allRecordsCount
     */
    public int getAllRecordsCount() {
        return allRecordsCount;
    }

    /**
     * @param allRecordsCount the allRecordsCount to set
     */
    public void setAllRecordsCount(int allRecordsCount) {
        this.allRecordsCount = allRecordsCount;
    }

    /**
     * @return the wrongRecordsCount
     */
    public int getWrongRecordsCount() {
        return wrongRecordsCount;
    }

    /**
     * @param wrongRecordsCount the wrongRecordsCount to set
     */
    public void setWrongRecordsCount(int wrongRecordsCount) {
        this.wrongRecordsCount = wrongRecordsCount;
    }

    /**
     * @return the matchedRecordsCount
     */
    public int getMatchedRecordsCount() {
        return matchedRecordsCount;
    }

    /**
     * @param matchedRecordsCount the matchedRecordsCount to set
     */
    public void setMatchedRecordsCount(int matchedRecordsCount) {
        this.matchedRecordsCount = matchedRecordsCount;
    }


    
}
