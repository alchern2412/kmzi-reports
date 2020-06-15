package by.belstu.kmzi.lab2.service;

import java.util.HashMap;
import java.util.Map;

public class Lab2Util {
    public static double calcEntropy(String text) {
        Map<Character, Integer> countsMap = new HashMap<Character, Integer>();

        for (char symbol : text.toCharArray()) {
            if (!countsMap.containsKey(symbol)) {
                countsMap.put(symbol, 1);
            } else {
                int oldCount = countsMap.get(symbol);
                countsMap.put(symbol, ++oldCount);
            }
        }

        int length = text.length();

        double result = 0.0;
        for (Map.Entry<Character, Integer> entry : countsMap.entrySet()) {

            double p = (double) entry.getValue() / length;
            result -= p * log2(p);
        }


        return result;
    }

    public static double informationAmount(String message, double entropy) {
        return message.length() * entropy;
    }

    public static double informationAmountWithMistake(String message, double entropy, double p) {
        return message.length() * (entropy - ( -p * log2(p) - (1.0 - p) * log2(1.0 - p)));
        // Н(е) = H(X) – H(X|Y)
    }

    private static double log2(double x) {
        return Math.log(x) / Math.log(2);
    }
}
