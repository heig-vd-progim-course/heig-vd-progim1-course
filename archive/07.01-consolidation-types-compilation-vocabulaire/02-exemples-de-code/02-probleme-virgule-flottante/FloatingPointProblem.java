/**
 * Exemple illustrant les problèmes de précision avec les nombres à virgule
 * flottante.
 * 
 * Les types float et double utilisent le standard IEEE 754 qui représente
 * les nombres en base 2 (binaire). Certains nombres décimaux simples en base 10
 * deviennent des nombres infinis en base 2, causant des erreurs de précision.
 * 
 * Documentation : https://docs.oracle.com/en/java/javase/17/docs/api/
 */
public class FloatingPointProblem {

    /**
     * Affiche une ligne de séparation.
     */
    public static void displaySeparator() {
        System.out.println("─────────────────────────────────────────");
    }

    /**
     * Démontre le problème classique 0.1 + 0.2.
     */
    public static void demonstrateBasicProblem() {
        System.out.println("╔════════════════════════════════════════╗");
        System.out.println("║   PROBLÈME CLASSIQUE                   ║");
        System.out.println("╚════════════════════════════════════════╝\n");

        double a = 0.1;
        double b = 0.2;
        double result = a + b;

        System.out.println("double a = 0.1;");
        System.out.println("double b = 0.2;");
        System.out.println("double result = a + b;");
        System.out.println();
        System.out.println("Résultat attendu : 0.3");
        System.out.println("Résultat obtenu  : " + result);
        System.out.println();
        System.out.println("result == 0.3 ? " + (result == 0.3));
        System.out.println();
        System.out.println("⚠️  Surprise ! Le résultat n'est pas exactement 0.3 !");
    }

    /**
     * Explique pourquoi ce problème se produit.
     */
    public static void explainTheProblem() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║   POURQUOI CE PROBLÈME ?               ║");
        System.out.println("╚════════════════════════════════════════╝\n");

        System.out.println("Les nombres à virgule flottante sont stockés en BASE 2 (binaire).");
        System.out.println("Certains nombres simples en base 10 deviennent infinis en base 2.");
        System.out.println();
        System.out.println("Exemple : 1/3 en décimal = 0.333333... (infini)");
        System.out.println("De même  : 0.1 en binaire = 0.000110011... (infini)");
        System.out.println();
        System.out.println("La mémoire est limitée, donc Java arrondit !");
        System.out.println("Cela crée de petites erreurs d'arrondi.");
    }

    /**
     * Montre d'autres exemples problématiques.
     */
    public static void demonstrateMoreExamples() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║   AUTRES EXEMPLES                      ║");
        System.out.println("╚════════════════════════════════════════╝\n");

        double example1 = 0.1 * 3;
        double example2 = 1.0 - 0.9;
        double example3 = 0.7 + 0.1;

        System.out.println("0.1 * 3 = " + example1 + " (attendu : 0.3)");
        System.out.println("1.0 - 0.9 = " + example2 + " (attendu : 0.1)");
        System.out.println("0.7 + 0.1 = " + example3 + " (attendu : 0.8)");
        System.out.println();
        System.out.println("Toutes ces opérations simples produisent des erreurs !");
    }

    /**
     * Montre la MAUVAISE façon de comparer des doubles.
     */
    public static void demonstrateBadComparison() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║   ❌ MAUVAISE PRATIQUE                 ║");
        System.out.println("╚════════════════════════════════════════╝\n");

        double result = 0.1 + 0.2;

        System.out.println("if (result == 0.3) {");
        System.out.println("    System.out.println(\"Égal\");");
        System.out.println("} else {");
        System.out.println("    System.out.println(\"Pas égal\");");
        System.out.println("}");
        System.out.println();

        if (result == 0.3) {
            System.out.println("Résultat : Égal");
        } else {
            System.out.println("Résultat : Pas égal");
        }

        System.out.println();
        System.out.println("⚠️  Ne JAMAIS comparer des doubles avec == !");
    }

    /**
     * Montre la BONNE façon de comparer des doubles.
     */
    public static void demonstrateGoodComparison() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║   ✅ BONNE PRATIQUE                    ║");
        System.out.println("╚════════════════════════════════════════╝\n");

        double result = 0.1 + 0.2;
        double expected = 0.3;
        double epsilon = 0.0001; // Petite marge d'erreur acceptable

        System.out.println("double epsilon = 0.0001;");
        System.out.println();
        System.out.println("if (Math.abs(result - expected) < epsilon) {");
        System.out.println("    System.out.println(\"Égal (à epsilon près)\");");
        System.out.println("} else {");
        System.out.println("    System.out.println(\"Pas égal\");");
        System.out.println("}");
        System.out.println();

        if (Math.abs(result - expected) < epsilon) {
            System.out.println("Résultat : Égal (à epsilon près)");
        } else {
            System.out.println("Résultat : Pas égal");
        }

        System.out.println();
        System.out.println("✅ Cette méthode compare avec une marge d'erreur acceptable.");
    }

    /**
     * Introduit BigDecimal pour les calculs précis.
     */
    public static void introduceBigDecimal() {
        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║   SOLUTION : BigDecimal                ║");
        System.out.println("╚════════════════════════════════════════╝\n");

        System.out.println("Pour les calculs nécessitant une précision EXACTE");
        System.out.println("(comme les calculs financiers), utilisez BigDecimal :");
        System.out.println();
        System.out.println("import java.math.BigDecimal;");
        System.out.println();
        System.out.println("BigDecimal a = new BigDecimal(\"0.1\");");
        System.out.println("BigDecimal b = new BigDecimal(\"0.2\");");
        System.out.println("BigDecimal result = a.add(b);");
        System.out.println();
        System.out.println("Résultat : " + new java.math.BigDecimal("0.1").add(new java.math.BigDecimal("0.2")));
        System.out.println();
        System.out.println("✅ BigDecimal donne des résultats exacts !");
        System.out.println();
        System.out.println("Note : BigDecimal sera vu en détail dans un cours futur.");
    }

    public static void main(String[] args) {
        System.out.println("=== Exemple : Problème de virgule flottante ===\n");

        demonstrateBasicProblem();
        explainTheProblem();
        demonstrateMoreExamples();
        demonstrateBadComparison();
        demonstrateGoodComparison();
        introduceBigDecimal();

        System.out.println("\n╔════════════════════════════════════════╗");
        System.out.println("║   CONCLUSION                           ║");
        System.out.println("╚════════════════════════════════════════╝\n");

        System.out.println("Points clés à retenir :");
        System.out.println("  1. Les doubles ne sont pas précis à 100%");
        System.out.println("  2. Ne jamais comparer des doubles avec ==");
        System.out.println("  3. Utiliser une marge d'erreur (epsilon)");
        System.out.println("  4. Pour les calculs financiers : BigDecimal");

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
