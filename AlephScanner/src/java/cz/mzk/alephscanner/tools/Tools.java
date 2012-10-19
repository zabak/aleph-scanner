/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package cz.mzk.alephscanner.tools;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 *
 * @author hanis
 */
public class Tools {
    
    
    
    
    
    
    
    public static String getFileLastModifiedDate(String path) {
        File file = new File(path);
        Long lastModified = file.lastModified();
        Date date = new Date(lastModified);
        SimpleDateFormat formatedDate = new SimpleDateFormat("dd.MM.yyyy HH:mm");
        return formatedDate.format(date);        
    }
    
}
