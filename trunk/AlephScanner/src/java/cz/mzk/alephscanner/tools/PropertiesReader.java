/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package cz.mzk.alephscanner.tools;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author hanis
 */
public class PropertiesReader {
    
    private static PropertiesReader INSTANCE = null;
    
    private PropertiesReader() {
        
    }

    
    public static PropertiesReader getInstance() {
        if(INSTANCE == null) {
            INSTANCE = new PropertiesReader();
        }
        return INSTANCE;
    }
    
    private Properties getProperties() throws IOException {
        InputStream inputStream = INSTANCE.getClass().getClassLoader().getResourceAsStream("config/scanner.properties");         
        Properties properties = new Properties();
        if(inputStream != null) {
            properties.load(inputStream);
        } else {
             Logger.getLogger(PropertiesReader.class.getName()).log(Level.SEVERE, null, "Cannot read the properties file.");
        }
        return properties;
    }
    

    public String getConfigPath() {
        String path = null;
        try {
            path = getProperties().getProperty("export_config_path");
        } catch (IOException ex) {
            Logger.getLogger(PropertiesReader.class.getName()).log(Level.SEVERE, null, ex);
        }
        return path;
    }
    
    public String getTemporaryExportDirectory() {
        String path = null;
        try {
            path = getProperties().getProperty("temp_export_directory");
        } catch (IOException ex) {
            Logger.getLogger(PropertiesReader.class.getName()).log(Level.SEVERE, null, ex);
        }
        return path;
    }    
    
    

}


