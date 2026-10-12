/**
 * Exemple illustrant la structure d'un programme Java.
 * 
 * En Java, tout le code doit être à l'intérieur d'une CLASSE.
 * Une classe est un conteneur qui regroupe des variables et des méthodes.
 * 
 * Le nom du fichier DOIT correspondre au nom de la classe publique.
 * Exemple : cette classe s'appelle JavaStructure, donc le fichier
 * s'appelle JavaStructure.java
 * 
 * Documentation : https://docs.oracle.com/en/java/javase/17/docs/api/
 */
public class JavaStructure {

    // ═══════════════════════════════════════════════════════════
    // MÉTHODES DE LA CLASSE
    // ═══════════════════════════════════════════════════════════

    

    /**
     * Explique ce qu'est une classe.
     */
    public static void explainClass() {
        System.out.println("╔════════════════════════════════════════╗");
        System.out.println("║   QU'EST-CE QU'UNE CLASSE ?            ║");
        System.out.println("╚════════════════════════════════════════╝\n");

        System.out.println("Une CLASSE est un CONTENEUR qui regroupe :");
        System.out.println("  1. Des VARIABLES (données)");
        System.out.println("  2. Des MÉTHODES (fonctions)");
        System.out.println();
        System.out.println("En Java, TOUT le code doit être dans une classe.");
        System.out.println("On ne peut pas écrire de code en dehors d'une classe.");
        System.out.println();
        System.out.println("Exemple de déclaration de classe :");
        System.out.println("  public class MaClasse {");
        System.out.println("      // Code ici");
        System.out.println("  }");
    }

    /**
     * Explique la correspondance entre fichier et classe.
     */
    public static void explainFileName() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║   NOM DU FICHIER = NOM DE LA CLASSE    ║");
        System.out.println("╚════════════════════════════════════════╝\n");

        System.out.println("RÈGLE IMPORTANTE :");
        System.out.println("  Le nom du fichier DOIT correspondre au nom de la classe publique.");
        System.out.println();
        System.out.println("Exemples :");
        System.out.println("  - Classe 'Main' → Fichier 'Main.java'");
        System.out.println("  - Classe 'Calculator' → Fichier 'Calculator.java'");
        System.out.println("  - Classe 'JavaStructure' → Fichier 'JavaStructure.java'");
        System.out.println();
        System.out.println("⚠️  Si le nom ne correspond pas, la compilation échouera !");
    }

    /**
     * Explique le rôle de la méthode main.
     */
    public static void explainMainMethod() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║   LA MÉTHODE main                      ║");
        System.out.println("╚════════════════════════════════════════╝\n");

        System.out.println("La méthode main est le POINT D'ENTRÉE du programme.");
        System.out.println();
        System.out.println("Quand vous exécutez : java JavaStructure");
        System.out.println("La JVM cherche la méthode main et l'exécute.");
        System.out.println();
        System.out.println("Signature obligatoire :");
        System.out.println("  public static void main(String[] args) {");
        System.out.println("      // Votre code ici");
        System.out.println("  }");
        System.out.println();
        System.out.println("Chaque mot a son importance :");
        System.out.println("  - public : accessible depuis l'extérieur");
        System.out.println("  - static : pas besoin de créer un objet");
        System.out.println("  - void : ne retourne rien");
        System.out.println("  - main : nom spécial reconnu par la JVM");
        System.out.println("  - String[] args : arguments du programme");
    }

    /**
     * Explique pourquoi 'public static'.
     */
    public static void explainPublicStatic() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║   POURQUOI 'public static' ?           ║");
        System.out.println("╚════════════════════════════════════════╝\n");

        System.out.println("PUBLIC :");
        System.out.println("  La classe et la méthode main doivent être accessibles");
        System.out.println("  depuis l'extérieur pour que la JVM puisse les trouver.");
        System.out.println();
        System.out.println("STATIC :");
        System.out.println("  'static' signifie que la méthode appartient à la CLASSE,");
        System.out.println("  pas à une INSTANCE (objet) de la classe.");
        System.out.println();
        System.out.println("  La JVM peut appeler main() sans créer d'objet :");
        System.out.println("    JavaStructure.main(args);  // Pas besoin de 'new'");
        System.out.println();
        System.out.println("  C'est pourquoi toutes nos méthodes jusqu'à maintenant");
        System.out.println("  sont 'static' : elles peuvent être appelées sans objet.");
        System.out.println();
        System.out.println("  Note : La programmation orientée objet sera vue plus tard !");
    }

    /**
     * Montre un exemple avec plusieurs méthodes.
     */
    public static void showExampleWithMultipleMethods() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║   EXEMPLE AVEC PLUSIEURS MÉTHODES      ║");
        System.out.println("╚════════════════════════════════════════╝\n");

        System.out.println("Une classe peut contenir plusieurs méthodes :");
        System.out.println();
        System.out.println("public class Calculator {");
        System.out.println("    // Point d'entrée");
        System.out.println("    public static void main(String[] args) {");
        System.out.println("        int result = add(5, 3);");
        System.out.println("        System.out.println(result);");
        System.out.println("    }");
        System.out.println();
        System.out.println("    // Autre méthode");
        System.out.println("    public static int add(int a, int b) {");
        System.out.println("        return a + b;");
        System.out.println("    }");
        System.out.println("}");
        System.out.println();
        System.out.println("Démonstration :");
        int result = add(5, 3);
        System.out.println("  add(5, 3) = " + result);
    }

    /**
     * Méthode utilitaire pour la démonstration.
     */
    public static int add(int a, int b) {
        return a + b;
    }

    /**
     * La méthode main est le POINT D'ENTRÉE du programme.
     * C'est la première méthode que la JVM exécute.
     * 
     * Signature obligatoire :
     * - public : accessible depuis l'extérieur
     * - static : peut être appelée sans créer d'objet
     * - void : ne retourne aucune valeur
     * - main : nom spécial reconnu par la JVM
     * - String[] args : arguments de ligne de commande
     */
    public static void main(String[] args) {
        System.out.println("=== Exemple : Structure d'un programme Java ===\n");

        explainClass();
        explainFileName();
        explainMainMethod();
        explainPublicStatic();
        showExampleWithMultipleMethods();

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
