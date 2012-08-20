/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package cz.mzk.alephscanner;

import cz.mzk.alephscanner.model.Request;
import cz.mzk.alephscanner.tools.JsonParser;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.*;

/**
 *
 * @author hanis
 */
public class Handle extends HttpServlet {

    /**
     * Processes requests for both HTTP
     * <code>GET</code> and
     * <code>POST</code> methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
        StringBuilder sb = new StringBuilder();
        String line = null;
        try {
            BufferedReader reader = request.getReader();
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
        } catch (Exception e) {
        }
        Request requestObject = null;
        try {
            requestObject = JsonParser.getRequestObject(sb.toString());
        } catch (JSONException ex) {
            Logger.getLogger(Handle.class.getName()).log(Level.SEVERE, null, ex);
        }

        response.setHeader("Content-Disposition", "attachment;filename=response.json");
        response.setHeader("Content-Type", "application/json; charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        System.out.println("ENC:" + response.getCharacterEncoding());

        PrintWriter out = response.getWriter();
        List<String> sysnoList = RequestHandler.getResult(requestObject);

        //File file = new File("/home/hanis/prace/alephScanner/mzk03.m21");
        //File file = new File("/home/tomcat/" + requestObject.getBase() + ".m21");
        File file = new File("/home/hanis/projects/marc4j/" + requestObject.getBase() + ".m21");
        Long lastModified = file.lastModified();
        Date date = new Date(lastModified);
        SimpleDateFormat formatedDate = new SimpleDateFormat("dd.MM.yyyy HH:mm");


        JSONObject jsonObject = new JSONObject();
        JSONArray jsonArray = new JSONArray(sysnoList);

        try {
            jsonObject.append("list", jsonArray);
            jsonObject.append("count", sysnoList.size());
            jsonObject.append("export_date", formatedDate.format(date));
        } catch (JSONException ex) {
            Logger.getLogger(Handle.class.getName()).log(Level.SEVERE, null, ex);
        }
        try {
            jsonObject.write(out);
        } catch (JSONException ex) {
            Logger.getLogger(Handle.class.getName()).log(Level.SEVERE, null, ex);
        }



        /*         
         out.print("{\"list\": [");
         boolean first = false;            
         for (String sysno : sysnoList) {                
         if(!first) {
         first=true;                    
         } else {
         out.print(",\n");
         }
         out.print("\"" + sysno + "\"");
         }
         out.print("], \"count\":\"" + sysnoList.size() + "\"");                    
         out.print(", \"export_date\":\"" + formatedDate.format(date) + "\"}");        
         */


        out.close();





    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP
     * <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP
     * <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
