/**
 * Exemple de conversions entre types de données en Java.
 * 
 * Il existe deux types de conversions :
 * - Implicite (automatique) : d'un type plus petit vers un plus grand
 * - Explicite (casting) : d'un type plus grand vers un plus petit
 */
public class Main {

    public static void main(String[] args) {
        System.out.println("=== Exemple : Conversions de types ===\n");

        // Conversion implicite : int vers double (automatique)
        int numberOfApples = 5;
        double pricePerApple = numberOfApples; // int devient double automatiquement
        System.out.println("Nombre de pommes (int) : " + numberOfApples);
        System.out.println("Converti en double : " + pricePerApple);
        System.out.println();

        // Division entre entiers : attention au résultat !
        int a = 7;
        int b = 2;
        int resultInt = a / b; // Division entière : 7 / 2 = 3 (pas 3.5 !)
        System.out.println("Division entière : " + a + " / " + b + " = " + resultInt);
        System.out.println();

        // Pour obtenir un résultat décimal, il faut convertir au moins un nombre
        double resultDouble = (double) a / b; // On convertit a en double
        System.out.println("Avec conversion : " + a + " / " + b + " = " + resultDouble);
        System.out.println();

        // Conversion explicite : double vers int (on perd la partie décimale)
        double exactPrice = 19.99;
        int roundedPrice = (int) exactPrice; // Le casting tronque (ne arrondit pas)
        System.out.println("Prix exact : " + exactPrice + " CHF");
        System.out.println("Prix arrondi (casting) : " + roundedPrice + " CHF");
        System.out.println("⚠️ Attention : on perd la partie décimale (.99) !");
        System.out.println();

        // Exemple pratique : calcul de moyenne
        int test1 = 5;
        int test2 = 4;
        int test3 = 6;

        // Si on ne fait pas de conversion, le résultat sera tronqué
        int wrongAverage = (test1 + test2 + test3) / 3;
        System.out.println("Moyenne incorrecte (sans conversion) : " + wrongAverage);

        // Solution : convertir en double
        double correctAverage = (double) (test1 + test2 + test3) / 3;
        System.out.println("Moyenne correcte (avec conversion) : " + correctAverage);
        System.out.println();

        // Conversion avec char
        char letter = 'A';
        int asciiCode = letter; // char peut être converti en int (code ASCII)
        System.out.println("La lettre '" + letter + "' a le code ASCII : " + asciiCode);

        int code = 66;
        char characterFromCode = (char) code;
        System.out.println("Le code ASCII " + code + " correspond à : '" + characterFromCode + "'");

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
