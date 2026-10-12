/**
 * Exemple de récursion : compte à rebours.
 *
 * Cet exemple compare trois approches pour réaliser un compte à rebours :
 * - Répétition manuelle du code (non maintenable)
 * - Boucle itérative (approche classique)
 * - Récursion (approche fonctionnelle)
 */
public class Main {

    /**
     * Effectue un compte à rebours de façon récursive.
     *
     * Cette fonction illustre deux éléments essentiels de la récursion :
     * - Le cas de base : condition d'arrêt (n <= 0)
     * - Le cas récursif : appel à soi-même avec un problème plus simple (n - 1)
     *
     * @param n le nombre de départ du compte à rebours
     */
    public static void countdown(int n) {
        // Cas de base : condition d'arrêt de la récursion
        if (n <= 0) {
            System.out.println("Décollage !");
            return;
        }

        // Traitement avant l'appel récursif
        System.out.println(n);

        // Cas récursif : appel à soi-même avec un problème plus simple
        countdown(n - 1);
    }

    /**
     * Effectue un compte à rebours de façon itérative.
     *
     * Cette version utilise une boucle for classique.
     *
     * @param n le nombre de départ du compte à rebours
     */
    public static void countdownIterative(int n) {
        for (int i = n; i > 0; i--) {
            System.out.println(i);
        }
        System.out.println("Décollage !");
    }

    public static void main(String[] args) {
        System.out.println("=== Exemple : Compte à rebours avec récursion ===\n");

        // Version 1 : Répétition manuelle (code dupliqué, non maintenable)
        System.out.println("--- Version manuelle (répétition de code) ---");
        System.out.println(10);
        System.out.println(9);
        System.out.println(8);
        System.out.println(7);
        System.out.println(6);
        System.out.println(5);
        System.out.println(4);
        System.out.println(3);
        System.out.println(2);
        System.out.println(1);
        System.out.println("Décollage !");

        System.out.println();

        // Version 2 : Boucle itérative (approche classique)
        System.out.println("--- Version itérative (boucle for) ---");
        countdownIterative(10);

        System.out.println();

        // Version 3 : Récursion (approche fonctionnelle)
        System.out.println("--- Version récursive (appel de fonction) ---");
        countdown(10);

        System.out.println();

        // Démonstration avec un nombre plus petit pour visualiser
        System.out.println("--- Démonstration avec n = 3 ---");
        System.out.println("Chaque appel de countdown(n) affiche n, puis appelle countdown(n-1)");
        System.out.println();
        countdown(3);

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
