/**
 * Exemple d'utilisation des constantes en Java.
 * 
 * Une constante est une valeur qui ne change jamais pendant l'exécution du
 * programme.
 * On utilise le mot-clé 'final' pour déclarer une constante.
 */
public class Main {

    public static void main(String[] args) {
        System.out.println("=== Exemple : Constantes ===\n");

        // Déclaration de constantes avec 'final'
        // Convention : nom en MAJUSCULES_AVEC_UNDERSCORE
        final double PI = 3.14159;
        final int DAYS_IN_WEEK = 7;
        final double VAT_RATE = 0.077; // TVA suisse à 7.7%

        // Une fois déclarée, une constante ne peut plus être modifiée
        // PI = 3.14; // ❌ Ceci causerait une erreur de compilation

        // Utilisation des constantes dans des calculs
        System.out.println("=== Calcul de la circonférence d'un cercle ===");
        double radius = 5.0;
        double circumference = 2 * PI * radius;
        System.out.println("Rayon : " + radius + " cm");
        System.out.println("Circonférence : " + circumference + " cm");
        System.out.println();

        // Exemple pratique : calcul du prix avec TVA
        System.out.println("=== Calcul du prix avec TVA ===");
        double priceWithoutVat = 100.0;
        double vat = priceWithoutVat * VAT_RATE;
        double totalPrice = priceWithoutVat + vat;

        System.out.println("Prix hors TVA : " + priceWithoutVat + " CHF");
        System.out.println("TVA (" + (VAT_RATE * 100) + "%) : " + vat + " CHF");
        System.out.println("Prix total : " + totalPrice + " CHF");
        System.out.println();

        // Exemple avec des jours
        System.out.println("=== Conversion de semaines en jours ===");
        int numberOfWeeks = 3;
        int totalDays = numberOfWeeks * DAYS_IN_WEEK;
        System.out.println(numberOfWeeks + " semaines = " + totalDays + " jours");
        System.out.println();

        // Les constantes rendent le code plus lisible et maintenable
        System.out.println("=== Avantages des constantes ===");
        System.out.println("✓ Code plus lisible : on comprend ce que représente " + VAT_RATE);
        System.out.println("✓ Plus facile à maintenir : si la TVA change, on modifie une seule ligne");
        System.out.println("✓ Évite les erreurs : impossible de modifier accidentellement la valeur");

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
