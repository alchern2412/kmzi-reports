package by.belstu.kmzi.lab2.controller;

import by.belstu.kmzi.lab2.service.Lab2Util;

import java.util.ArrayList;
import java.util.List;

/**
 * Создать приложение для расчета и анализа параметров и ин-
 * формативных характеристик дискретных ИС, с помощью которого:
 * <p>
 * а) рассчитать энтропию указанных преподавателем алфавитов:
 * один – на латинице, другой – на кириллице (по формуле (2.1) перей-
 * ти от частоты появления каждого символа алфавита к соответствую-
 * щей вероятности); в качестве входного может быть принят произ-
 * вольный электронный текстовый документ на основе соответствую-
 * щего алфавита; частоты появления символов алфавитов оформить в
 * виде гистограмм (можно воспользоваться приложением MS Excel);
 * <p>
 * б) для входных документов, представленных в бинарных ко-
 * дах, определить энтропию бинарного алфавита;
 * <p>
 * в) используя значения энтропии алфавитов, полученных в
 * пунктах (а) и (б), подсчитать количество информации в сообще-
 * нии, состоящем из собственных фамилии, имени и отчества (на
 * основе исходного алфавита – (а) и в кодах ASCII – (б)); объяснить
 * полученный результат;
 * <p>
 * г) выполнить задание пункта (в) при условии, что вероятность
 * ошибочной передачи единичного бита сообщения составляет: 0,1;
 * 0,5; 1,0.
 */
public class Main {
    public static void main(String[] args) {
        // task а

        String englishAlphabet = "abcdefghijklmnopqrstuvwxyz";
        String cyrillicAlphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";

        double latEntropy = Lab2Util.calcEntropy(englishAlphabet);
        double cyrEntropy = Lab2Util.calcEntropy(cyrillicAlphabet);

        System.out.println("Энтропия Латиницы: " + latEntropy);
        System.out.println("-----");
        System.out.println("Энтропия Киррилицы: " + cyrEntropy);
        System.out.println("-----");


        // task б

        // "Hello, world"
        String binaryAlphabet = "01001000011001010110110001101100011011110010110000100000010101110110111101110010011011000110010000100001";

        double binEntropy = Lab2Util.calcEntropy(binaryAlphabet);

        System.out.println("Энтропия Binary: " + binEntropy);

        // task в

        final String FIO = "Charniauski Aliaksei Leanidavich";
        double countA = Lab2Util.informationAmount(FIO, latEntropy);

        String asciiState = "";
        for (Character c : FIO.toCharArray()) {
            asciiState += Integer.toBinaryString((int)c);
        }
        System.out.println("ASCII: " + asciiState);

        double countB = Lab2Util.informationAmount(asciiState, binEntropy);


        System.out.println("A:" + countA);
        System.out.println("B:" + countB);
        // task г

        double mistake1 = 0.1;
        double mistake2 = 0.5;
        double mistake3 = 1.0;

        double res1 = Lab2Util.informationAmountWithMistake(asciiState, binEntropy, mistake1);
        double res2 = Lab2Util.informationAmountWithMistake(asciiState, binEntropy, mistake2);
        double res3 = Lab2Util.informationAmountWithMistake(asciiState, binEntropy, mistake3);

        System.out.println(mistake1 + ": " + res1);
        System.out.println(mistake2 + ": " + res2);
        System.out.println(mistake3 + ": " + res3);
    }
}
