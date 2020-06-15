package by.belstu.alchern.kmzi;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Lab4Util {
    public static String readTextFileUsingScanner(String fileName) {
        StringBuilder sb = new StringBuilder("");
        try {
            Scanner sc = new Scanner(new File(fileName));
            while (sc.hasNext()) {
                String str = sc.nextLine();
//                System.out.println(str);  // Print string
                sb.append(str);
            }
            sc.close();
        } catch (IOException e) {
            System.out.println("Error" + e);
        }

        return sb.toString();
    }

    public static String getAlphabet(String text) {
        StringBuilder alphabet = new StringBuilder();


        for (char i :
                text.toCharArray()) {
            if (hasNotChar(alphabet.toString(), i)) {
                alphabet.append(i);
            }
        }

        return alphabet.toString();
    }

    private static boolean hasNotChar(String text, Character symbol) {
        for (Character i :
                text.toCharArray()) {
            if (i.equals(symbol)) {
                return false;
            }
        }
        return true;
    }

    public static void printHistogram(String text) {
        int length = text.length();
        Map<Character, Integer> symbolCountMap = new HashMap<>();
        for (char symbol :
                text.toCharArray()) {
            if (symbolCountMap.containsKey(symbol)) {
                int oldValue = symbolCountMap.get(symbol);
                symbolCountMap.replace(symbol, ++oldValue);
            } else {
                symbolCountMap.put(symbol, 1);
            }
        }

        System.out.println(symbolCountMap);
        for (Map.Entry<Character, Integer> symbolCountEntry :
                symbolCountMap.entrySet()) {
            int sharpAmount = (int)((double)symbolCountEntry.getValue() / length * 400);
            if (sharpAmount > 0) {
                System.out.print(symbolCountEntry.getKey() + ": ");
                for (int i = 0; i < sharpAmount; i++) {
                    System.out.print('#');
                }
                System.out.println();
            }
        }

    }


}
