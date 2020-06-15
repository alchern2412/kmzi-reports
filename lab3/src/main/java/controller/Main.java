package controller;

import service.Lab3util;

public class Main {
    public static void main(String[] args) {
        int m = 447;
        int n = 477;

        System.out.println("Кол-во простых чисел [2, " + n + "] = " + Lab3util.calcSimpleNumbersAmount(n));

        System.out.println("Кол-во простых чисел [" + m + ", " + n + "] = " + Lab3util.calcSimpleNumbersAmount(m, n));

        System.out.println("NOD(" + m + ", " + n + ") = " + Lab3util.calcNod(m, n));


        System.out.println(Lab3util.findSimpleNumbers(n));
        System.out.println(Lab3util.findSimpleNumbers(m));

        System.out.println(Lab3util.findSimpleNumbers(447477));
//
//        System.out.println(Lab3util.calcNod(200, 56));
//        System.out.println(Lab3util.calcNod(16, 64, 32));

    }
}
