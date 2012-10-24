/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package cz.mzk.alephscanner.tools;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.Node;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;

/**
 *
 * @author hanis
 */
public class XmlParser {

    public static Document getDocument(String path) throws DocumentException {
        SAXReader reader = new SAXReader();
        Document document = reader.read(new File(path));
        return document;
    }

    public static List<String> getExportNames() {
        List<String> nameList = new ArrayList<String>();
        Document document = null;
        try {
            document = getDocument(PropertiesReader.getInstance().getConfigPath());
        } catch (DocumentException ex) {
            System.out.println("???");
            Logger.getLogger(XmlParser.class.getName()).log(Level.SEVERE, null, ex);
        }                
        List<Node> nodeList = document.selectNodes("//export");
        for (Node node : nodeList) {
            String name = node.selectSingleNode("name").getText();
            nameList.add(name);
        }
        return nameList;
    }

    public static String getExportPath(String exportName) {
        Document document;
        try {
            document = getDocument(PropertiesReader.getInstance().getConfigPath());
            List<Node> nodeList = document.selectNodes("//export");
            for (Node node : nodeList) {
                String name = node.selectSingleNode("name").getText();
                if (exportName.equals(name)) {
                    return node.selectSingleNode("path").getText();
                }
            }
        } catch (DocumentException ex) {
            Logger.getLogger(XmlParser.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    public static void addNewExport(String name) throws DocumentException, IOException {
        String configPath = PropertiesReader.getInstance().getConfigPath();
        Document document = getDocument(configPath);
        Element element = (Element) document.selectSingleNode("//created");
        Element exportElement = element.addElement("export");
        exportElement.addElement("name").addText(name);        
        String path = PropertiesReader.getInstance().getTemporaryExportDirectory() + name + ".m21";
        exportElement.addElement("path").addText(path);
        writeDocument(document, configPath);
    }

    public static void writeDocument(Document document, String path) throws IOException {
        OutputFormat format = OutputFormat.createPrettyPrint();
        XMLWriter writer = new XMLWriter(new FileWriter(path), format);
        writer.write(document);
        writer.close();
    }
}
