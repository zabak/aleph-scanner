/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package cz.mzk.alephscanner.tools;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author hanis
 */
public class PropertiesReader {
    public PropertiesReader() {

    }

    private Properties getProperties() throws IOException {
        InputStream inputStream = this.getClass().getClassLoader().getResourceAsStream("config/scanner.properties");         
        Properties properties = new Properties();
        if(inputStream != null) {
            properties.load(inputStream);
        } else {
             Logger.getLogger(PropertiesReader.class.getName()).log(Level.SEVERE, null, "Cannot read the properties file.");
        }
        return properties;
    }
    
    public List<String> getBasis() throws IOException {                      
        return new ArrayList<String>(getProperties().stringPropertyNames());    
    }
    
    public String getPathOfBase(String base) {
        String path = null;
        try {
            path = getProperties().getProperty(base);
        } catch (IOException ex) {
            Logger.getLogger(PropertiesReader.class.getName()).log(Level.SEVERE, null, ex);
        }
        return path;
    }

}


