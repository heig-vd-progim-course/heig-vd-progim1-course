/**
 * Exemple illustrant tous les types primitifs en Java.
 * 
 * Java propose 8 types primitifs :
 * - 4 types entiers : byte, short, int, long
 * - 2 types à virgule flottante : float, double
 * - 1 type booléen : boolean
 * - 1 type caractère : char
 * 
 * Documentation : https://docs.oracle.com/en/java/javase/17/docs/api/
 */
public class AllPrimitiveTypes {

    /**
     * Affiche les informations d'un type entier.
     */
    public static void displayIntegerInfo(String typeName, long value, int sizeInBits) {
        System.out.println("Type: " + typeName);
        System.out.println("  Valeur: " + value);
        System.out.println("  Taille: " + sizeInBits + " bits");
        System.out.println();
    }

    /**
     * Affiche les informations d'un type à virgule flottante.
     */
    public static void displayFloatInfo(String typeName, double value, int sizeInBits) {
        System.out.println("Type: " + typeName);
        System.out.println("  Valeur: " + value);
        System.out.println("  Taille: " + sizeInBits + " bits");
        System.out.println();
    }

    public static void main(String[] args) {
        System.out.println("=== Exemple : Tous les types primitifs ===\n");

        System.out.println("╔════════════════════════════════════╗");
        System.out.println("║   TYPES ENTIERS                    ║");
        System.out.println("╚════════════════════════════════════╝\n");

        // byte : le plus petit type entier
        byte age = 25;
        displayIntegerInfo("byte", age, 8);

        // short : entier de taille moyenne
        short year = 2025;
        displayIntegerInfo("short", year, 16);

        // int : le type entier le plus couramment utilisé
        int population = 1_000_000;
        displayIntegerInfo("int", population, 32);

        // long : pour les très grandes valeurs
        // Note: le 'L' à la fin indique que c'est un long
        long distanceEarthSunInMeters = 149_600_000_000L;
        displayIntegerInfo("long", distanceEarthSunInMeters, 64);

        System.out.println("╔════════════════════════════════════╗");
        System.out.println("║   TYPES À VIRGULE FLOTTANTE        ║");
        System.out.println("╚════════════════════════════════════╝\n");

        // float : précision simple
        // Note: le 'f' à la fin indique que c'est un float
        float pi = 3.14f;
        displayFloatInfo("float", pi, 32);

        // double : précision double (le plus couramment utilisé)
        double preciseValue = 3.14159265358979;
        displayFloatInfo("double", preciseValue, 64);

        System.out.println("╔════════════════════════════════════╗");
        System.out.println("║   TYPE BOOLÉEN                     ║");
        System.out.println("╚════════════════════════════════════╝\n");

        // boolean : true ou false
        boolean isValid = true;
        boolean isComplete = false;
        System.out.println("Type: boolean");
        System.out.println("  Valeur 1: " + isValid);
        System.out.println("  Valeur 2: " + isComplete);
        System.out.println("  Taille: 1 bit (théoriquement)");
        System.out.println();

        System.out.println("╔════════════════════════════════════╗");
        System.out.println("║   TYPE CARACTÈRE                   ║");
        System.out.println("╚════════════════════════════════════╝\n");

        // char : un seul caractère Unicode
        char grade = 'A';
        char currency = '€';
        char smiley = '☺';
        System.out.println("Type: char");
        System.out.println("  Valeur 1: " + grade);
        System.out.println("  Valeur 2: " + currency);
        System.out.println("  Valeur 3: " + smiley);
        System.out.println("  Taille: 16 bits (Unicode)");
        System.out.println();

        System.out.println("╔════════════════════════════════════╗");
        System.out.println("║   CONSEIL PRATIQUE                 ║");
        System.out.println("╚════════════════════════════════════╝\n");

        System.out.println("Pour la majorité des cas d'usage :");
        System.out.println("  - Utilisez 'int' pour les nombres entiers");
        System.out.println("  - Utilisez 'double' pour les nombres décimaux");
        System.out.println("  - Utilisez 'boolean' pour les conditions");
        System.out.println("  - Utilisez 'char' pour un caractère unique");
        System.out.println("  - Utilisez 'String' pour du texte (pas un type primitif !)");

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
