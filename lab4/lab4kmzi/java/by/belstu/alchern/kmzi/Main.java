package by.belstu.alchern.kmzi;

//import com.google.common.base.Stopwatch;

import com.google.common.base.Stopwatch;

import java.util.concurrent.TimeUnit;

public class Main {
    private static final String ALPHABET = "AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻżQqVvXx" +
            "1234567890" +
            "'!@#$ %&?–+=\",.;:/";
    private static final String KEY_WORD = "bezpieczeństwo";
    private static final int K = 20;

    public static void main(String[] args) {

        //1. Виженера, ключевое слово – bezpieczeństwo

        String inText;
        inText = Lab4Util.readTextFileUsingScanner("C:\\Users\\Alexey Chernyavsky\\Downloads\\Univer\\6SEMESTR\\KMZI\\labs\\lab4\\lab4kmzi\\text.txt");
        System.out.println("Original Text: " + inText);
        System.out.println("\nInText Length: " + inText.length());

        Vigenere vigenere = new Vigenere(ALPHABET);

        Stopwatch stopwatch = Stopwatch.createStarted();
        String encryptedText = vigenere.encrypt(inText, KEY_WORD);
        stopwatch.stop();

        System.out.println("(Vigenere) Encrypted Text: " + encryptedText);
        System.out.println("TIME: " + stopwatch.elapsed(TimeUnit.MILLISECONDS) + "ms");

        stopwatch = Stopwatch.createStarted();
        String decryptedText = vigenere.decrypt(encryptedText, KEY_WORD);
        stopwatch.stop();

        System.out.println("(Vigenere) Decrypted Text: " + decryptedText);
        System.out.println("TIME: " + stopwatch.elapsed(TimeUnit.MILLISECONDS) + "ms");

        // 2. На основе соотношений (2.1) и (2.2); k=20

        stopwatch = Stopwatch.createStarted();
        String encryptedTextTask2 = vigenere.encryptTask2(inText, K);
        stopwatch.stop();

        System.out.println("(Task2) Encrypted Text: " + encryptedTextTask2);
        System.out.println("TIME: " + stopwatch.elapsed(TimeUnit.MILLISECONDS) + "ms");

        stopwatch = Stopwatch.createStarted();
        String decryptedTextTask2 = vigenere.decryptTask2(encryptedTextTask2, K);
        stopwatch.stop();

        System.out.println("(Task2) Decrypted Text: " + decryptedTextTask2);
        System.out.println("TIME: " + stopwatch.elapsed(TimeUnit.MILLISECONDS) + "ms");

        System.out.println();
        System.out.println("Histograms");


        Lab4Util.printHistogram(inText);
        Lab4Util.printHistogram(encryptedText);
        Lab4Util.printHistogram(encryptedTextTask2);


    }
}
