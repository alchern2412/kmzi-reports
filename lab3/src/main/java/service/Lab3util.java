package service;

import java.util.ArrayList;
import java.util.List;

public class Lab3util {

    public static int calcNod(int a, int b) {
        int ai = 0;
        int bi = 0;
        if (a > b) {
            ai = a;
            bi = b;
        } else {
            ai = b;
            bi = a;
        }

        int r = -1;
        int qi = 1;
        while (r != 0) {
            qi = ai / bi;
            if (qi != 0) {
                r = ai - bi * qi;
            } else {
                r = 0;
            }
//            System.out.println(ai + " = " + bi + " * " + qi + " + " + r);
            ai = bi;
            bi = r;
        }

        return ai;
    }

    public static int calcNod(int a, int b, int c) {
        return calcNod(calcNod(a, b), c);
    }

    public static List<Integer> findSimpleNumbers(int a) {
        List<Integer> simpleNumbers = new ArrayList<Integer>();
        int tmp = a;

        int i = 2;
        while (i <= a) {
            if (tmp % i == 0) {
                tmp = tmp / i;
                simpleNumbers.add(i);
            } else {
                i++;
            }
        }

        return simpleNumbers;
    }

    public static int calcSimpleNumbersAmount(int x2) {
        int result = 0;
        boolean dividingFlag = false;

        for (int i = 2; i <= x2; i++) {
            for (int j = 2; j < i; j++) {
                if (i % j == 0) {
                    dividingFlag = true;
                    break;
                }
            }
            if (!dividingFlag) {
//                System.out.println(i + " ");
                result++;
            } else {
                dividingFlag = false;
            }
        }
        return result;
    }

    public static int calcSimpleNumbersAmount(int x1, int x2) {
        return calcSimpleNumbersAmount(x2) - calcSimpleNumbersAmount(x1);
    }

//    public static boolean

}
