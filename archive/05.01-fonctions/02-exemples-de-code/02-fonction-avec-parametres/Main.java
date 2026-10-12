/**
 * Exemple de fonctions avec paramètres en Java.
 * 
 * Les paramètres permettent de passer des informations à une fonction.
 * Chaque paramètre a un type et un nom.
 */
public class Main {

    /**
     * Affiche un message personnalisé avec le nom de l'utilisateur.
     * 
     * @param userName le nom de l'utilisateur à afficher
     */
    public static void greetUser(String userName) {
        System.out.println("Bonjour " + userName + " !");
        System.out.println("Nous sommes ravis de te voir aujourd'hui.");
    }

    /**
     * Affiche le carré d'un nombre.
     * 
     * @param number le nombre dont on veut calculer le carré
     */
    public static void displaySquare(int number) {
        int square = number * number;
        System.out.println("Le carré de " + number + " est " + square);
    }

    /**
     * Affiche les informations d'un produit.
     * 
     * @param productName le nom du produit
     * @param price       le prix du produit en CHF
     * @param quantity    la quantité disponible
     */
    public static void displayProductInfo(String productName, double price, int quantity) {
        System.out.println("═══ Produit ═══");
        System.out.println("Nom      : " + productName);
        System.out.println("Prix     : " + price + " CHF");
        System.out.println("Quantité : " + quantity + " unités");
        System.out.println("═══════════════");
    }

    /**
     * Affiche un message répété plusieurs fois.
     * 
     * @param message le message à afficher
     * @param times   le nombre de répétitions
     */
    public static void repeatMessage(String message, int times) {
        for (int i = 1; i <= times; i++) {
            System.out.println(i + ". " + message);
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Exemple : Fonction avec paramètres ===\n");

        // Appel avec un paramètre String
        greetUser("Ariel");
        System.out.println();

        // Appel avec un paramètre int
        displaySquare(7);
        displaySquare(12);
        System.out.println();

        // Appel avec plusieurs paramètres de types différents
        displayProductInfo("Clavier mécanique", 89.90, 15);
        System.out.println();
        displayProductInfo("Souris sans fil", 29.90, 42);
        System.out.println();

        // Répétition d'un message
        repeatMessage("Java est amusant !", 3);

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
