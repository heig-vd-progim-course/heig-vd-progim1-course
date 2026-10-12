/**
 * Exemple de fonctions avec valeur de retour en Java.
 * 
 * Une fonction peut retourner un résultat en utilisant le mot-clé 'return'.
 * Le type de retour doit être spécifié dans la signature de la fonction.
 */
public class Main {

    /**
     * Calcule la somme de deux nombres.
     * 
     * @param a le premier nombre
     * @param b le deuxième nombre
     * @return la somme de a et b
     */
    public static int add(int a, int b) {
        return a + b;
    }

    /**
     * Calcule l'aire d'un rectangle.
     * 
     * @param width  la largeur du rectangle
     * @param height la hauteur du rectangle
     * @return l'aire du rectangle (largeur × hauteur)
     */
    public static double calculateRectangleArea(double width, double height) {
        double area = width * height;
        return area;
    }

    /**
     * Vérifie si un nombre est pair.
     * 
     * @param number le nombre à vérifier
     * @return true si le nombre est pair, false sinon
     */
    public static boolean isEven(int number) {
        return number % 2 == 0;
    }

    /**
     * Retourne le plus grand de deux nombres.
     * 
     * @param a le premier nombre
     * @param b le deuxième nombre
     * @return le plus grand des deux nombres
     */
    public static int max(int a, int b) {
        if (a > b) {
            return a;
        } else {
            return b;
        }
    }

    /**
     * Génère un message de salutation personnalisé.
     * 
     * @param name      le nom de la personne
     * @param timeOfDay l'heure de la journée ("matin", "après-midi", "soir")
     * @return le message de salutation
     */
    public static String generateGreeting(String name, String timeOfDay) {
        return "Bon" + timeOfDay + " " + name + " !";
    }

    public static void main(String[] args) {
        System.out.println("=== Exemple : Fonction avec valeur de retour ===\n");

        // Utilisation d'une fonction qui retourne un int
        int sum = add(15, 27);
        System.out.println("15 + 27 = " + sum);
        System.out.println();

        // On peut aussi utiliser le résultat directement
        System.out.println("100 + 50 = " + add(100, 50));
        System.out.println();

        // Fonction qui retourne un double
        double area = calculateRectangleArea(5.5, 3.2);
        System.out.println("Aire d'un rectangle 5.5 × 3.2 = " + area + " m²");
        System.out.println();

        // Fonction qui retourne un boolean
        int number = 42;
        if (isEven(number)) {
            System.out.println(number + " est un nombre pair");
        } else {
            System.out.println(number + " est un nombre impair");
        }
        System.out.println();

        // Fonction avec plusieurs returns (selon une condition)
        int a = 30;
        int b = 45;
        int maximum = max(a, b);
        System.out.println("Le maximum entre " + a + " et " + b + " est " + maximum);
        System.out.println();

        // Fonction qui retourne un String
        String greeting = generateGreeting("Khaya", " après-midi");
        System.out.println(greeting);

        // Exemple d'utilisation dans un calcul
        double totalArea = calculateRectangleArea(10, 5) + calculateRectangleArea(8, 3);
        System.out.println("\nAire totale : " + totalArea + " m²");

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
