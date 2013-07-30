/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package cz.mzk.alephscanner.tools;

import java.util.Comparator;
import java.util.Map;

/**
 *
 * @author hanis
 */
public class MapByValueComparator implements Comparator<String> {

    Map<String, Integer> base;
    public MapByValueComparator(Map<String, Integer> base) {
        this.base = base;
    }

    public int compare(String a, String b) {
        if (base.get(a) >= base.get(b)) {
            return -1;
        } else {
            return 1;
        } 
    }
}