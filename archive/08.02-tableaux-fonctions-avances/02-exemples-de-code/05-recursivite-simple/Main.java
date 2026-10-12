/**
 * Démonstration des principes de base de la récursivité.
 * 
 * Ce programme illustre comment une fonction peut s'appeler elle-même
 * pour résoudre des problèmes, avec des exemples simples et une comparaison
 * avec les approches itératives.
 */
public class Main {

    

    /**
     * Démontre le calcul de factorielle (récursif et itératif).
     */
    public static void demonstrateFactorial() {
        int n = 5;

        System.out.println("Calcul de " + n + "! (factorielle de " + n + ")");
        System.out.println("\n--- Version récursive ---");

        long resultRecursive = factorialRecursive(n);
        System.out.println(n + "! = " + resultRecursive);

        System.out.println("\nDéroulement des appels récursifs :");
        System.out.println("factorial(5) = 5 × factorial(4)");
        System.out.println("factorial(4) = 4 × factorial(3)");
        System.out.println("factorial(3) = 3 × factorial(2)");
        System.out.println("factorial(2) = 2 × factorial(1)");
        System.out.println("factorial(1) = 1 (cas de base)");
        System.out.println("Retour : 2 × 1 = 2");
        System.out.println("Retour : 3 × 2 = 6");
        System.out.println("Retour : 4 × 6 = 24");
        System.out.println("Retour : 5 × 24 = 120");

        System.out.println("\n--- Version itérative ---");
        long resultIterative = factorialIterative(n);
        System.out.println(n + "! = " + resultIterative);
    }

    /**
     * Calcule la factorielle de manière récursive.
     * 
     * @param n le nombre dont on veut calculer la factorielle
     * @return la factorielle de n
     */
    public static long factorialRecursive(int n) {
        // Cas de base : arrêt de la récursion
        if (n <= 1) {
            return 1;
        }

        // Cas récursif : n! = n × (n-1)!
        return n * factorialRecursive(n - 1);
    }

    /**
     * Calcule la factorielle de manière itérative.
     * 
     * @param n le nombre dont on veut calculer la factorielle
     * @return la factorielle de n
     */
    public static long factorialIterative(int n) {
        long result = 1;

        for (int i = 2; i <= n; i++) {
            result *= i;
        }

        return result;
    }

    /**
     * Démontre la suite de Fibonacci.
     */
    public static void demonstrateFibonacci() {
        System.out.println("Suite de Fibonacci : 0, 1, 1, 2, 3, 5, 8, 13, ...");
        System.out.println("Chaque nombre est la somme des deux précédents.\n");

        System.out.println("Calcul des 10 premiers termes :");
        for (int i = 0; i < 10; i++) {
            int result = fibonacciRecursive(i);
            System.out.println(String.format("F(%d) = %d", i, result));
        }

        System.out.println("\nRemarque : La version récursive de Fibonacci est inefficace");
        System.out.println("pour de grandes valeurs car elle recalcule plusieurs fois");
        System.out.println("les mêmes termes. Une version itérative serait préférable.");
    }

    /**
     * Calcule le n-ième terme de la suite de Fibonacci de manière récursive.
     * 
     * @param n la position dans la suite (0-indexée)
     * @return le n-ième nombre de Fibonacci
     */
    public static int fibonacciRecursive(int n) {
        // Cas de base
        if (n <= 1) {
            return n;
        }

        // Cas récursif : F(n) = F(n-1) + F(n-2)
        return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
    }

    /**
     * Calcule Fibonacci de manière itérative (plus efficace).
     */
    public static int fibonacciIterative(int n) {
        if (n <= 1) {
            return n;
        }

        int previous = 0;
        int current = 1;

        for (int i = 2; i <= n; i++) {
            int next = previous + current;
            previous = current;
            current = next;
        }

        return current;
    }

    /**
     * Démontre une chaîne de souhaits (propagation exponentielle).
     */
    public static void demonstrateWishChain() {
        System.out.println("Une personne souhaite une bonne journée à deux autres,");
        System.out.println("qui font de même, et ainsi de suite...\n");

        System.out.println("Propagation sur 3 niveaux :");
        wishGoodDay(3, "Noor");

        System.out.println("\nNombre total de souhaits : 2^3 - 1 = 7");
        System.out.println("(Propagation exponentielle : chaque personne en salue 2 autres)");
    }

    /**
     * Simule une chaîne de souhaits où chaque personne en salue deux autres.
     * 
     * @param depth      le nombre de niveaux de propagation
     * @param personName le nom de la personne qui souhaite
     */
    public static void wishGoodDay(int depth, String personName) {
        // Cas de base : arrêt de la chaîne
        if (depth <= 0) {
            return;
        }

        System.out.println(personName + " souhaite une bonne journée !");

        // Cas récursif : propagation à deux personnes
        wishGoodDay(depth - 1, personName + "-A");
        wishGoodDay(depth - 1, personName + "-B");
    }

    /**
     * Démontre la somme récursive d'un tableau.
     */
    public static void demonstrateArraySum() {
        int[] values = { 5, 12, 8, 15, 3, 9 };

        System.out.println("Tableau : [5, 12, 8, 15, 3, 9]");

        System.out.println("\n--- Somme récursive ---");
        int sumRecursive = sumRecursive(values, 0);
        System.out.println("Somme = " + sumRecursive);

        System.out.println("\n--- Somme itérative ---");
        int sumIterative = sumIterative(values);
        System.out.println("Somme = " + sumIterative);

        System.out.println("\nLes deux méthodes donnent le même résultat,");
        System.out.println("mais la version itérative est plus efficace.");
    }

    /**
     * Calcule la somme d'un tableau de manière récursive.
     * 
     * @param array le tableau à sommer
     * @param index l'indice courant (commence à 0)
     * @return la somme des éléments
     */
    public static int sumRecursive(int[] array, int index) {
        // Cas de base : fin du tableau
        if (index >= array.length) {
            return 0;
        }

        // Cas récursif : élément courant + somme du reste
        return array[index] + sumRecursive(array, index + 1);
    }

    /**
     * Calcule la somme d'un tableau de manière itérative.
     */
    public static int sumIterative(int[] array) {
        int sum = 0;

        for (int value : array) {
            sum += value;
        }

        return sum;
    }

    /**
     * Compare les performances récursivité vs itération.
     */
    public static void compareRecursionVsIteration() {
        int n = 10;

        System.out.println("Comparaison des approches pour calculer " + n + "!");

        // Mesure du temps pour la version récursive
        long startRecursive = System.nanoTime();
        long resultRecursive = factorialRecursive(n);
        long endRecursive = System.nanoTime();
        long timeRecursive = endRecursive - startRecursive;

        // Mesure du temps pour la version itérative
        long startIterative = System.nanoTime();
        long resultIterative = factorialIterative(n);
        long endIterative = System.nanoTime();
        long timeIterative = endIterative - startIterative;

        System.out.println("\nRésultats :");
        System.out.println("- Récursif : " + resultRecursive +
                " (temps : " + timeRecursive + " ns)");
        System.out.println("- Itératif : " + resultIterative +
                " (temps : " + timeIterative + " ns)");

        System.out.println("\n📊 Résumé :");
        System.out.println("┌─────────────────┬────────────┬────────────┐");
        System.out.println("│ Aspect          │ Récursivité│ Itération  │");
        System.out.println("├─────────────────┼────────────┼────────────┤");
        System.out.println("│ Lisibilité      │ +++        │ ++         │");
        System.out.println("│ Performance     │ +          │ +++        │");
        System.out.println("│ Mémoire         │ +          │ +++        │");
        System.out.println("│ Débogage        │ ++         │ +++        │");
        System.out.println("└─────────────────┴────────────┴────────────┘");

        System.out.println("\n💡 Conseil : Utilisez la récursivité quand elle rend");
        System.out.println("le code plus clair, mais préférez l'itération pour");
        System.out.println("des performances optimales.");
    }

    public static void main(String[] args) {
        System.out.println("=== Exemple : Récursivité simple ===\n");

        System.out.println("=== 1. Factorielle ===\n");
        demonstrateFactorial();

        System.out.println("\n=== 2. Suite de Fibonacci ===\n");
        demonstrateFibonacci();

        System.out.println("\n=== 3. Chaîne de souhaits ===\n");
        demonstrateWishChain();

        System.out.println("\n=== 4. Somme récursive d'un tableau ===\n");
        demonstrateArraySum();

        System.out.println("\n=== 5. Comparaison récursivité vs itération ===\n");
        compareRecursionVsIteration();

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
