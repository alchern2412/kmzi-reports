package by.belstu.alchern.kmzi;

public class Vigenere {
    private String alphabet;

    public Vigenere(String alphabet) {
        this.alphabet = alphabet;
    }

    /**
     * This method used to encrypt text
     * Formula: C[i] = (P[i] + K[i]) mod ALPHABET.length()
     *
     * @param input Original text
     * @param key   Key word
     * @return Encrypted text
     */
    public String encrypt(String input, String key) {
        int key_index = 0;
        StringBuilder result = new StringBuilder();

        for (char symbol :
                input.toCharArray()) {
            int c = (this.alphabet.indexOf(symbol)
                    + this.alphabet.indexOf(key.toCharArray()[key_index]))
                    % this.alphabet.length();

            result.append(this.alphabet.toCharArray()[c]);

            key_index++;

            if ((key_index + 1) == key.length()) {
                key_index = 0;
            }
        }

        return result.toString();
    }

    /**
     * This method used to decrypt encrypted text
     * Formula: P[i] = (C[i] - K[i] + ALPHABET.length()) mod ALPHABET.length()
     *
     * @param input Encrypted Text
     * @param key   Key word
     * @return Decrypted Text (Original)
     */
    public String decrypt(String input, String key) {
        int key_index = 0;
        StringBuilder result = new StringBuilder();

        for (char symbol :
                input.toCharArray()) {
            int c = (this.alphabet.indexOf(symbol)
                    - this.alphabet.indexOf(key.toCharArray()[key_index])
                    + this.alphabet.length())
                    % this.alphabet.length();

            result.append(this.alphabet.toCharArray()[c]);

            key_index++;

            if ((key_index + 1) == key.length()) {
                key_index = 0;
            }
        }

        return result.toString();
    }

    /**
     * y = x + k mod N
     * @param input
     * @param k
     * @return
     */
    public String encryptTask2(String input, int k) {
        StringBuilder result = new StringBuilder();

        for (char symbol :
                input.toCharArray()) {
            int y = (this.alphabet.indexOf(symbol) + k)
                    % this.alphabet.length();
            result.append(this.alphabet.toCharArray()[y]);
        }

        return result.toString();
    }

    /**
     * x = y - k mod N
     * @param input
     * @param k
     * @return
     */
    public String decryptTask2(String input, int k) {
        StringBuilder result = new StringBuilder();

        for (char symbol :
                input.toCharArray()) {
            int x = (this.alphabet.indexOf(symbol) - k)
                    % this.alphabet.length();
            x = x >= 0 ? x : x + this.alphabet.length();
            result.append(this.alphabet.toCharArray()[x]);
        }

        return result.toString();
    }
}
